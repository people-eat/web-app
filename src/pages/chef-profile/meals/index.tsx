import { useLazyQuery } from '@apollo/client';
import { Alert, Snackbar } from '@mui/material';
import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import PEMealCardDesktop from '../../../components/cards/mealCard/PEMealCardDesktop';
import PEFooter from '../../../components/footer/PEFooter';
import PEHeader from '../../../components/header/PEHeader';
import { LoadingDialog } from '../../../components/loadingDialog/LoadingDialog';
import { CookProfileNavigationTabs } from '../../../components/navigation/CookProfileNavigationTabs';
import styles from '../../../components/pages/cookProfile/cook-bookings.module.css';
import ChefProfilePageCreateMeal from '../../../components/pages/cookProfile/mealsTab/ChefProfilePageCreateMeal';
import ChefProfilePageEditMeal from '../../../components/pages/cookProfile/mealsTab/ChefProfilePageEditMeal';
import { Icon } from '../../../components/standard/icon/Icon';
import PEIconButton from '../../../components/standard/iconButton/PEIconButton';
import PETabItem from '../../../components/standard/tabItem/PETabItem';
import HStack from '../../../components/utility/hStack/HStack';
import Spacer from '../../../components/utility/spacer/Spacer';
import VStack from '../../../components/utility/vStack/VStack';
import { createApolloClient } from '../../../data-source/createApolloClient';
import {
    FindCookMealsDocument,
    GetCookProfileMealsPageDataDocument,
    GetSignedInUserDocument,
    type GetCookProfileMealsPageDataQuery,
    type GetSignedInUserQuery,
    type MealType,
} from '../../../data-source/generated/graphql';
import { mealTypeTranslations } from '../../../shared-domain/mealTypeTranslations';
import { mealTypes } from '../../../shared-domain/mealTypes';

interface ServerSideProps {
    signedInUser: NonNullable<GetSignedInUserQuery['users']['signedInUser']>;
    meals: NonNullable<GetCookProfileMealsPageDataQuery['cooks']['meals']['findMany']>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);

    const { data: signedInUserData } = await apolloClient.query({ query: GetSignedInUserDocument });

    const signedInUser = signedInUserData.users.signedInUser;

    if (!signedInUser) throw new Error();

    const { data } = await apolloClient.query({
        query: GetCookProfileMealsPageDataDocument,
        variables: { cookId: signedInUser.userId },
    });

    return {
        props: {
            signedInUser,
            meals: data.cooks.meals.findMany ?? [],
        },
    };
};

const Index: NextPage<ServerSideProps> = ({ signedInUser, meals: initialMeals }) => {
    const { userId: cookId } = signedInUser;

    const { t } = useTranslation('meal-types');
    const [selectedMealType, setSelectedMealType] = useState<MealType | undefined>();
    const [selectedTab, setSelectedTab] = useState<'MEALS' | 'CREATE' | string>('MEALS');

    const [showMealCreatedBanner, setShowMealCreatedBanner] = useState(false);
    const [showMealDeletedBanner, setShowMealDeletedBanner] = useState(false);

    const [fetchMeals, { data, loading }] = useLazyQuery(FindCookMealsDocument, {
        variables: { cookId },
    });

    const [meals, setMeals] = useState(initialMeals);

    useEffect(() => {
        const newMeals = data?.cooks.meals.findMany;
        if (newMeals) setMeals(newMeals);
    }, [data]);

    return (
        <>
            <Head>
                <title>PeopleEat - Gerichte</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack className="w-full" gap={32}>
                <PEHeader signedInUser={signedInUser} />

                <div className={styles.bodyContainer}>
                    <CookProfileNavigationTabs selection="MEALS" />

                    <main>
                        <VStack className="w-full max-w-screen-xl mb-[80px] lg_min:my-10 box-border gap-6">
                            {selectedTab === 'MEALS' && (
                                <HStack
                                    gap={8}
                                    className="w-full bg-white shadow-primary md:shadow-none box-border p-8 md:p-0 rounded-4"
                                    style={{ alignItems: 'center' }}
                                >
                                    <HStack className="overflow-x-auto w-[100%-80px] gap-2" style={{ justifyContent: 'flex-start' }}>
                                        <PETabItem
                                            title={t('meal-type-all')}
                                            onClick={(): void => setSelectedMealType(undefined)}
                                            active={selectedMealType === undefined}
                                        />

                                        {mealTypes.map((mealType, index) => (
                                            <PETabItem
                                                key={index}
                                                title={t(mealTypeTranslations[mealType])}
                                                onClick={(): void => setSelectedMealType(mealType)}
                                                active={selectedMealType === mealType}
                                            />
                                        ))}
                                    </HStack>

                                    <Spacer />

                                    {/* <PEIconButton icon={Icon.filtersOrange} border="1px solid rgba(255, 100, 51, 1)" bg="white" withoutShadow /> */}

                                    <PEIconButton
                                        onClick={(): void => setSelectedTab('CREATE')}
                                        icon={Icon.plusWhite}
                                        bg="rgba(255, 100, 51, 1)"
                                        withoutShadow
                                    />
                                </HStack>
                            )}

                            {selectedTab !== 'MEALS' && selectedTab !== 'CREATE' && (
                                <ChefProfilePageEditMeal
                                    cookId={cookId}
                                    mealId={selectedTab}
                                    onCancel={(): void => setSelectedTab('MEALS')}
                                    onSaveUpdates={(): void => {
                                        setSelectedTab('MEALS');
                                        void fetchMeals();
                                    }}
                                    onDelete={(): void => {
                                        setSelectedTab('MEALS');
                                        setShowMealDeletedBanner(true);
                                        setTimeout(() => setShowMealDeletedBanner(false), 3000);
                                        void fetchMeals();
                                    }}
                                />
                            )}

                            {selectedTab === 'CREATE' && (
                                <ChefProfilePageCreateMeal
                                    cookId={cookId}
                                    defaultMealType={selectedMealType}
                                    onCancel={(): void => setSelectedTab('MEALS')}
                                    onSuccess={(mealType: MealType): void => {
                                        setSelectedTab('MEALS');
                                        setSelectedMealType(mealType);
                                        setShowMealCreatedBanner(true);
                                        setTimeout(() => setShowMealCreatedBanner(false), 3000);
                                        void fetchMeals();
                                    }}
                                />
                            )}

                            {selectedTab === 'MEALS' && (
                                <HStack
                                    className="relative w-full gap-6 flex-wrap"
                                    style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    {selectedMealType !== undefined &&
                                        meals
                                            .filter(({ type }) => type === selectedMealType)
                                            .map(({ title, description, imageUrl, mealId }, index) => (
                                                <PEMealCardDesktop
                                                    key={index}
                                                    title={title}
                                                    description={description}
                                                    imageUrl={imageUrl ?? undefined}
                                                    onClick={(): void => setSelectedTab(mealId)}
                                                />
                                            ))}
                                    {selectedMealType === undefined &&
                                        meals.map(({ title, description, imageUrl, mealId }, index) => (
                                            <PEMealCardDesktop
                                                key={index}
                                                title={title}
                                                description={description}
                                                imageUrl={imageUrl ?? undefined}
                                                onClick={(): void => setSelectedTab(mealId)}
                                            />
                                        ))}
                                </HStack>
                            )}

                            <Snackbar open={showMealCreatedBanner} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                                <Alert severity="success">Gericht erfolgreich erstellt</Alert>
                            </Snackbar>

                            <Snackbar open={showMealDeletedBanner} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                                <Alert severity="success">Gericht erfolgreich gelöscht</Alert>
                            </Snackbar>
                        </VStack>
                    </main>
                </div>

                <PEFooter className={styles.hiddenOnMobile} />
            </VStack>

            <LoadingDialog isLoading={loading} />
        </>
    );
};

export default Index;
