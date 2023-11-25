import { useLazyQuery } from '@apollo/client';
import { Alert, Dialog, DialogContent, Snackbar } from '@mui/material';
import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import PEMenuCard from '../../../components/cards/menuCard/PEMenuCard';
import PEMenuCardMobile from '../../../components/cards/menuCard/PEMenuCardMobile';
import PEFooter from '../../../components/footer/PEFooter';
import PEHeader from '../../../components/header/PEHeader';
import { LoadingDialog } from '../../../components/loadingDialog/LoadingDialog';
import { CookProfileNavigationTabs } from '../../../components/navigation/CookProfileNavigationTabs';
import styles from '../../../components/pages/cookProfile/cook-bookings.module.css';
import ChefProfilePageCreateMenu from '../../../components/pages/cookProfile/menusTab/createMenu/ChefProfilePageCreateMenu';
import { calculateMenuPrice } from '../../../components/pages/cookProfile/menusTab/createMenu/createMenuStep3/ChefProfilePageCreateMenuStep3';
import ChefProfilePageEditMenu from '../../../components/pages/cookProfile/menusTab/editMenu/ChefProfilePageEditMenu';
import PEButton from '../../../components/standard/buttons/PEButton';
import { Icon } from '../../../components/standard/icon/Icon';
import PEIcon from '../../../components/standard/icon/PEIcon';
import PEIconButton from '../../../components/standard/iconButton/PEIconButton';
import HStack from '../../../components/utility/hStack/HStack';
import Spacer from '../../../components/utility/spacer/Spacer';
import VStack from '../../../components/utility/vStack/VStack';
import { createApolloClient } from '../../../data-source/createApolloClient';
import {
    FindCookMenusDocument,
    GetCookProfileMenusPageDataDocument,
    GetSignedInUserDocument,
    type GetCookProfileMenusPageDataQuery,
    type GetSignedInUserQuery,
} from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';

interface ServerSideProps {
    signedInUser: NonNullable<GetSignedInUserQuery['users']['signedInUser']>;
    menus: NonNullable<GetCookProfileMenusPageDataQuery['cooks']['menus']['findMany']>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);

    const { data: signedInUserData } = await apolloClient.query({ query: GetSignedInUserDocument });

    const signedInUser = signedInUserData.users.signedInUser;

    if (!signedInUser) throw new Error();

    const { data } = await apolloClient.query({
        query: GetCookProfileMenusPageDataDocument,
        variables: { cookId: signedInUser.userId },
    });

    return {
        props: {
            signedInUser,
            menus: data.cooks.menus.findMany ?? [],
        },
    };
};

const Index: NextPage<ServerSideProps> = ({ signedInUser, menus: initialMenus }) => {
    const { userId: cookId } = signedInUser;

    const { isMobile } = useResponsive();
    const { t } = useTranslation('chef-profile');
    const [selectedTab, setSelectedTab] = useState<'MENUS' | 'CREATE' | 'EDIT'>('MENUS');
    const [openCreateNewMenuSuccess, setOpenCreateNewMenuSuccess] = useState(false);
    const [showMenuDeletedBanner, setShowMenuDeletedBanner] = useState(false);
    const [selectedMenuId, setSelectedMenuId] = useState<string | undefined>(undefined);

    const [fetchMenus, { loading, data }] = useLazyQuery(FindCookMenusDocument, { variables: { cookId } });

    const [menus, setMenus] = useState(initialMenus);
    const visibleMenus = menus.filter((menu) => menu.isVisible);
    const invisibleMenus = menus.filter((menu) => !menu.isVisible);

    useEffect(() => {
        const newMenus = data?.cooks.menus.findMany;
        if (newMenus) setMenus(newMenus);
    }, [data]);

    function handleCreateNewMenuSuccess(): void {
        setSelectedTab('MENUS');
        setOpenCreateNewMenuSuccess(true);
        void fetchMenus();
    }

    return (
        <>
            <Head>
                <title>PeopleEat - Menüs</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack className="w-full" gap={32}>
                <PEHeader signedInUser={signedInUser} />

                <div className={styles.bodyContainer}>
                    <CookProfileNavigationTabs selection="MENUS" />

                    <main>
                        <VStack className="relative w-full max-w-screen-xl mb-[80px] gap-6 box-border">
                            {selectedTab === 'CREATE' && (
                                <ChefProfilePageCreateMenu
                                    cookId={cookId}
                                    onSuccess={handleCreateNewMenuSuccess}
                                    onCancel={(): void => setSelectedTab('MENUS')}
                                />
                            )}

                            {selectedTab === 'EDIT' && selectedMenuId && (
                                <ChefProfilePageEditMenu
                                    onSaveUpdates={(): void => {
                                        setSelectedTab('MENUS');
                                        void fetchMenus();
                                    }}
                                    onDelete={(): void => {
                                        setSelectedTab('MENUS');
                                        void fetchMenus();
                                        setShowMenuDeletedBanner(true);
                                        setTimeout(() => setShowMenuDeletedBanner(false), 3000);
                                    }}
                                    menuId={selectedMenuId}
                                    cookId={cookId}
                                />
                            )}

                            {selectedTab === 'MENUS' && (
                                <>
                                    <HStack
                                        gap={8}
                                        className="w-full bg-white shadow-primary md:shadow-none box-border p-8 md:p-0 rounded-4"
                                        style={{ alignItems: 'center' }}
                                    >
                                        <p className="w-full mb-4 text-text-m-bold">{'Menü erstellen'}</p>
                                        <Spacer />
                                        {/* <PEIconButton icon={Icon.filtersOrange} border="1px solid rgba(255, 100, 51, 1)" bg="white" withoutShadow /> */}
                                        <PEIconButton
                                            onClick={(): void => setSelectedTab('CREATE')}
                                            icon={Icon.plusWhite}
                                            bg="rgba(255, 100, 51, 1)"
                                            withoutShadow
                                        />
                                    </HStack>

                                    <HStack
                                        className="relative w-full gap-6 flex-wrap"
                                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                                    >
                                        {visibleMenus.map((menu) => (
                                            <div
                                                onClick={(): void => {
                                                    setSelectedMenuId(menu.menuId);
                                                    setSelectedTab('EDIT');
                                                }}
                                                className="relative PEMenuCard editMenu md:w-full"
                                                key={menu.menuId}
                                            >
                                                {isMobile ? (
                                                    <PEMenuCardMobile
                                                        title={menu.title}
                                                        description={menu.description}
                                                        imageUrls={menu.imageUrls}
                                                        pricePerPerson={
                                                            calculateMenuPrice(
                                                                20,
                                                                0,
                                                                menu.basePrice,
                                                                menu.basePriceCustomers,
                                                                menu.pricePerAdult,
                                                                menu.pricePerChild ?? undefined,
                                                            ) / 20
                                                        }
                                                        currencyCode={menu.currencyCode}
                                                        chefFirstName={data?.users.me?.firstName ?? ''}
                                                        chefProfilePictureUrl={data?.users.me?.profilePictureUrl ?? undefined}
                                                        categories={menu.categories.map(({ title }) => title)}
                                                        kitchen={menu.kitchen?.title ?? undefined}
                                                    />
                                                ) : (
                                                    <PEMenuCard
                                                        title={menu.title}
                                                        description={menu.description}
                                                        imageUrls={menu.imageUrls}
                                                        pricePerPerson={
                                                            calculateMenuPrice(
                                                                20,
                                                                0,
                                                                menu.basePrice,
                                                                menu.basePriceCustomers,
                                                                menu.pricePerAdult,
                                                                menu.pricePerChild ?? undefined,
                                                            ) / 20
                                                        }
                                                        currencyCode={menu.currencyCode}
                                                        chefFirstName={data?.users.me?.firstName ?? ''}
                                                        chefProfilePictureUrl={data?.users.me?.profilePictureUrl ?? undefined}
                                                        categories={menu.categories.map(({ title }) => title)}
                                                        kitchen={menu.kitchen?.title ?? undefined}
                                                        fullWidth
                                                    />
                                                )}
                                            </div>
                                        ))}

                                        {Boolean(invisibleMenus.length) && (
                                            <>
                                                <p className="text-text-m-bold w-full">Archive</p>
                                                <HStack
                                                    className="relative w-full gap-6 flex-wrap opacity-30"
                                                    style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                                                >
                                                    {invisibleMenus.map((menu) => (
                                                        <div
                                                            onClick={(): void => {
                                                                setSelectedMenuId(menu.menuId);
                                                                setSelectedTab('EDIT');
                                                            }}
                                                            className="relative editMenu"
                                                            key={menu.menuId}
                                                        >
                                                            <PEMenuCard
                                                                title={menu.title}
                                                                description={menu.description}
                                                                imageUrls={menu.imageUrls}
                                                                pricePerPerson={
                                                                    calculateMenuPrice(
                                                                        20,
                                                                        0,
                                                                        menu.basePrice,
                                                                        menu.basePriceCustomers,
                                                                        menu.pricePerAdult,
                                                                        menu.pricePerChild ?? undefined,
                                                                    ) / 20
                                                                }
                                                                currencyCode={menu.currencyCode}
                                                                chefFirstName={data?.users.me?.firstName ?? ''}
                                                                chefProfilePictureUrl={data?.users.me?.profilePictureUrl ?? undefined}
                                                                categories={menu.categories.map(({ title }) => title)}
                                                                kitchen={menu.kitchen?.title ?? undefined}
                                                                fullWidth
                                                            />
                                                        </div>
                                                    ))}
                                                </HStack>
                                            </>
                                        )}
                                    </HStack>
                                </>
                            )}

                            <LoadingDialog isLoading={loading} />

                            <Snackbar open={showMenuDeletedBanner} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                                <Alert severity="success">Menü erfolgreich gelöscht</Alert>
                            </Snackbar>

                            <Dialog open={openCreateNewMenuSuccess} onClose={(): void => setOpenCreateNewMenuSuccess(false)}>
                                <DialogContent className="overflow-hidden flex justify-center">
                                    <VStack className="w-[450px] bg gap-8 relative">
                                        <VStack className="absolute top-0 right-0">
                                            <PEIconButton
                                                iconSize={24}
                                                icon={Icon.close}
                                                onClick={(): void => setOpenCreateNewMenuSuccess(false)}
                                                withoutShadow
                                                bg="white"
                                            />
                                        </VStack>
                                        <PEIcon className="mt-8" icon={Icon.celebrate} edgeLength={80} />
                                        <VStack className="w-full mt-8">
                                            <p className="m-0 text-center">{t('create-menu-popup')}</p>
                                        </VStack>
                                        <PEButton className="w-full" onClick={(): void => setOpenCreateNewMenuSuccess(false)} title="Ok" />
                                    </VStack>
                                </DialogContent>
                            </Dialog>
                        </VStack>
                    </main>
                </div>

                <PEFooter className={styles.hiddenOnMobile} />
            </VStack>
        </>
    );
};

export default Index;
