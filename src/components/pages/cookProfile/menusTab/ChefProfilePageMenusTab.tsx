import { useMutation, useQuery } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent, Menu, MenuItem } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import {
    DeleteOneCookMenuDocument,
    FindCookMenusDocument,
    UpdateCookMenuIsVisibleDocument,
    type CurrencyCode,
    type MealType,
} from '../../../../data-source/generated/graphql';
import useResponsive from '../../../../hooks/useResponsive';
import { type Category } from '../../../../shared-domain/Category';
import { type Kitchen } from '../../../../shared-domain/Kitchen';
import PEMenuCard from '../../../cards/menuCard/PEMenuCard';
import PEMenuCardMobile from '../../../cards/menuCard/PEMenuCardMobile';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMenu from './createMenu/ChefProfilePageCreateMenu';
import { calculateMenuPrice } from './createMenu/createMenuStep3/ChefProfilePageCreateMenuStep3';
import ChefProfilePageEditMenu from './editMenu/ChefProfilePageEditMenu';

export interface MealEntity {
    mealId: string;
    cookId: string;
    title: string;
    type: MealType;
    description: string;
    imageUrl?: string | null;
    createdAt: Date;
}

export interface MenuEntity {
    __typename?: 'Menu';
    menuId: string;
    isVisible: boolean;
    title: string;
    description: string;
    basePrice: number;
    basePriceCustomers: number;
    pricePerAdult: number;
    pricePerChild?: number | null;
    currencyCode: CurrencyCode;
    greetingFromKitchen?: string | null;
    preparationTime: number;
    createdAt: Date;
    kitchen?: Kitchen | null;
    categories: Category[];
    courses: {
        courseId: string;
        index: number;
        title: string;
        mealOptions: {
            index: number;
            meal: {
                mealId: string;
                title: string;
                description: string;
                imageUrl?: string | null;
                type: MealType;
                createdAt: Date;
            };
        }[];
    }[];
}

export interface CookProfilePageMenusTabProps {
    cookId: string;
}

// eslint-disable-next-line max-statements
export default function CookProfilePageMenusTab({ cookId }: CookProfilePageMenusTabProps): ReactElement {
    const { isMobile } = useResponsive();
    const { t } = useTranslation('chef-profile');
    const { t: commonTranslation } = useTranslation('common');
    const [selectedTab, setSelectedTab] = useState<'MENUS' | 'CREATE' | 'EDIT'>('MENUS');
    const [openCreateNewMenuSuccess, setOpenCreateNewMenuSuccess] = useState(false);
    const [openDeleteMenuDialog, setOpenDeleteMenuDialog] = useState(false);
    const [selectedMenuId, setSelectedMenuId] = useState<string | undefined>(undefined);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { data, loading, refetch } = useQuery(FindCookMenusDocument, { variables: { cookId } });

    const menus = data?.cooks.menus.findMany ?? [];

    const visibleMenus = menus.filter((menu) => menu.isVisible);

    const invisibleMenus = menus.filter((menu) => !menu.isVisible);

    const [deleteMenu] = useMutation(DeleteOneCookMenuDocument);
    const [updateMenuIsVisible] = useMutation(UpdateCookMenuIsVisibleDocument);

    function handleUpdateMenuIsVisible(): void {
        if (!selectedMenuId) return;

        const menuToUpdate = menus.find((menu) => menu.menuId === selectedMenuId);

        if (!menuToUpdate) return;

        const newVisibility = !menuToUpdate.isVisible;

        void updateMenuIsVisible({ variables: { cookId, menuId: selectedMenuId, isVisible: newVisibility } })
            .then((result): void => {
                setAnchorEl(null);
                if (result.data?.cooks.menus.success) void refetch();
            })
            .catch((e) => {
                console.error(e);
                setAnchorEl(null);
            });
    }

    function handleDeleteMenu(): void {
        if (!selectedMenuId) return;

        void deleteMenu({ variables: { cookId, menuId: selectedMenuId } })
            .then((result): void => {
                setOpenDeleteMenuDialog(false);
                if (result.data?.cooks.menus.success) void refetch();
            })
            .catch((e) => {
                console.error(e);
                setOpenDeleteMenuDialog(false);
            });
    }

    function handleCreateNewMenuSuccess(): void {
        setSelectedTab('MENUS');
        setOpenCreateNewMenuSuccess(true);
        void refetch();
    }

    return (
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
                        void refetch();
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

                    <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                        {visibleMenus.map((menu, index) => (
                            <div
                                onClick={(event): void => {
                                    setAnchorEl(event.currentTarget);
                                    setSelectedMenuId(menu.menuId);
                                }}
                                className="relative PEMenuCard editMenu md:w-full"
                                key={index}
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
                                    {invisibleMenus.map((menu, index) => (
                                        <div
                                            onClick={(event): void => {
                                                setAnchorEl(event.currentTarget);
                                                setSelectedMenuId(menu.menuId);
                                            }}
                                            className="relative editMenu"
                                            key={index}
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

            {loading && (
                <Dialog open>
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}

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

            <Dialog
                sx={{ width: '100%', '& .MuiPaper-root': { width: '750px', maxWidth: '750px' } }}
                open={openDeleteMenuDialog}
                onClose={(): void => setOpenDeleteMenuDialog(false)}
            >
                <DialogContent>
                    <VStack className="gap-8 relative box-border">
                        <VStack className="absolute top-0 right-0">
                            <PEIconButton
                                iconSize={24}
                                icon={Icon.close}
                                onClick={(): void => setOpenDeleteMenuDialog(false)}
                                withoutShadow
                                bg="white"
                            />
                        </VStack>
                        <p className="m-0 mt-2 text-text-m-bold w-full text-start">{t('delete-menu-title')}</p>
                        <p className="m-0 w-full text-start">{t('delete-menu-question')}</p>
                        <HStack className="w-full gap-4">
                            <PEButton onClick={(): void => setOpenDeleteMenuDialog(false)} title="Cancel" type="secondary" />
                            <PEButton onClick={handleDeleteMenu} title={commonTranslation('delete')} />
                        </HStack>
                    </VStack>
                </DialogContent>
            </Dialog>

            {open && selectedMenuId && (
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={(): void => setAnchorEl(null)}
                    onClick={(): void => setAnchorEl(null)}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    sx={{ borderRadius: '12px', overflow: 'hidden' }}
                >
                    <MenuItem
                        sx={{ width: '200px' }}
                        onClick={(): void => {
                            setSelectedTab('EDIT');
                            setSelectedMenuId(selectedMenuId);
                        }}
                    >
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">{commonTranslation('edit')}</p>
                    </MenuItem>
                    <div className="w-full h-[1px] bg-disabled" />
                    <MenuItem sx={{ width: '200px' }} onClick={(): void => handleUpdateMenuIsVisible()}>
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">
                            {visibleMenus.some((menu) => menu.menuId === selectedMenuId)
                                ? commonTranslation('unpublish')
                                : commonTranslation('publish')}
                        </p>
                    </MenuItem>
                    <div className="w-full h-[1px] bg-disabled" />
                    <MenuItem sx={{ width: '200px' }} onClick={(): void => setOpenDeleteMenuDialog(true)}>
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">{commonTranslation('delete')}</p>
                    </MenuItem>
                </Menu>
            )}
        </VStack>
    );
}
