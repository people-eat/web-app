import { useQuery } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { FindCookMealsDocument, type MealType } from '../../../../data-source/generated/graphql';
import { mealTypes } from '../../../../shared/mealTypes';
import PEMealCard from '../../../cards/mealCard/PEMealCard';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMeal from './ChefProfilePageCreateMeal';
import ChefProfilePageEditMeal from './ChefProfilePageEditMeal';

export interface ChefProfilePageMealsTabProps {
    cookId: string;
}

export default function ChefProfilePageMealsTab({ cookId }: ChefProfilePageMealsTabProps): ReactElement {
    const { t } = useTranslation('chef-profile');
    const [selectedTab, setSelectedTab] = useState<MealType | 'CREATE' | undefined>();
    const [selectedMealId, setSelectedMealId] = useState<undefined | string>();

    const { data, loading, refetch } = useQuery(FindCookMealsDocument, { variables: { cookId } });

    const meals = data?.cooks.meals.findMany ?? [];

    const mealTypesTranslates = {
        DESSERT: t('label-dessert'),
        STARTER: t('label-starter'),
        MAIN_COURSE: t('label-main'),
        OTHER: 'other',
        SALAD: 'salad',
        SOUP: 'soup',
    };

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg_min:my-10 md:px-4 box-border gap-6">
            {selectedTab !== 'CREATE' && !selectedMealId && (
                <HStack
                    gap={8}
                    className="w-full bg-white shadow-primary md:shadow-none box-border p-8 md:p-0 rounded-4"
                    style={{ alignItems: 'center' }}
                >
                    <HStack className="overflow-x-auto w-[100%-80px] gap-2" style={{ justifyContent: 'flex-start' }}>
                        <PETabItem
                            title={t('label-all')}
                            onClick={(): void => setSelectedTab(undefined)}
                            active={selectedTab === undefined}
                        />

                        {mealTypes.map((mealType, index) => (
                            <PETabItem
                                key={index}
                                title={mealTypesTranslates?.[mealType] ?? mealType.toLowerCase()}
                                onClick={(): void => setSelectedTab(mealType)}
                                active={selectedTab === mealType}
                            />
                        ))}
                    </HStack>

                    <Spacer />

                    <PEIconButton icon={Icon.filtersOrange} border="1px solid rgba(255, 100, 51, 1)" bg="white" withoutShadow />

                    <PEIconButton
                        onClick={(): void => setSelectedTab('CREATE')}
                        icon={Icon.plusWhite}
                        bg="rgba(255, 100, 51, 1)"
                        withoutShadow
                    />
                </HStack>
            )}

            {selectedMealId && (
                <ChefProfilePageEditMeal
                    cookId={cookId}
                    mealId={selectedMealId}
                    onCancel={(): void => {
                        setSelectedMealId(undefined);
                        setSelectedTab(undefined);
                    }}
                    onSaveUpdates={(): void => {
                        setSelectedMealId(undefined);
                        setSelectedTab(undefined);
                        void refetch();
                    }}
                />
            )}

            {!selectedMealId && selectedTab === 'CREATE' && (
                <ChefProfilePageCreateMeal
                    cookId={cookId}
                    defaultMealType={undefined}
                    onCancel={(): void => setSelectedTab(undefined)}
                    onSuccess={(): void => {
                        setSelectedTab(undefined);
                        void refetch();
                    }}
                />
            )}

            {!selectedMealId && selectedTab !== 'CREATE' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {selectedTab !== undefined &&
                        meals
                            .filter(({ type }) => type === selectedTab)
                            .map(({ title, description, imageUrl, mealId }, index) => (
                                <PEMealCard
                                    key={index}
                                    title={title}
                                    description={description}
                                    imageUrl={imageUrl ?? undefined}
                                    onClick={(): void => setSelectedMealId(mealId)}
                                />
                            ))}
                    {selectedTab === undefined &&
                        meals.map(({ title, description, imageUrl, mealId }, index) => (
                            <PEMealCard
                                key={index}
                                title={title}
                                description={description}
                                imageUrl={imageUrl ?? undefined}
                                onClick={(): void => setSelectedMealId(mealId)}
                            />
                        ))}
                </HStack>
            )}

            {loading && (
                <Dialog open>
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}
        </VStack>
    );
}
