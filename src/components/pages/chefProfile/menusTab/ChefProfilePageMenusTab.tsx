import { useMutation, useQuery } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent, Menu, MenuItem } from '@mui/material';
import { useState, type ReactElement } from 'react';
import {
    DeleteOneCookMenuDocument,
    FindCookMenusDocument,
    type CurrencyCode,
    type MealType,
} from '../../../../data-source/generated/graphql';
import useResponsive from '../../../../hooks/useResponsive';
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
    kitchen?: { __typename?: 'Kitchen'; kitchenId: string; title: string } | null;
    categories: { __typename?: 'Category'; categoryId: string; title: string }[];
}

export interface ChefProfilePageMenusTabProps {
    cookId: string;
}

export default function ChefProfilePageMenusTab({ cookId }: ChefProfilePageMenusTabProps): ReactElement {
    const { isMobile } = useResponsive();

    const [selectedTab, setSelectedTab] = useState<'MENUS' | 'CREATE' | 'EDIT'>('MENUS');
    const [openCreateNewMenuSuccess, setOpenCreateNewMenuSuccess] = useState(false);
    const [openDeleteMenuDialog, setOpenDeleteMenuDialog] = useState(false);
    const [editMenuId, setEditMenuId] = useState<string | undefined>(undefined);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { data, loading, refetch } = useQuery(FindCookMenusDocument, { variables: { cookId } });

    const menus = data?.cooks.menus.findMany ?? [];

    const visibleMenus = menus.filter((menu) => menu.isVisible);

    const invisibleMenus = menus.filter((menu) => !menu.isVisible);

    const [deleteMenu] = useMutation(DeleteOneCookMenuDocument);

    function handleDeleteMenu(): void {
        try {
            void deleteMenu({
                variables: {
                    cookId,
                    menuId: editMenuId ?? '',
                },
            }).then((result): void => {
                setOpenDeleteMenuDialog(false);
                if (result.data && result.data.cooks.menus.success) void refetch();
            });
        } catch (e) {
            console.error(e);
            setOpenDeleteMenuDialog(false);
        }
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

            {selectedTab === 'EDIT' && editMenuId && (
                <ChefProfilePageEditMenu
                    onSaveUpdates={(): void => {
                        setSelectedTab('MENUS');
                        void refetch();
                    }}
                    menuId={editMenuId}
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
                        <Spacer />

                        <PEIconButton icon={Icon.filtersOrange} border="1px solid rgba(255, 100, 51, 1)" bg="white" withoutShadow />

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
                                    setEditMenuId(menu.menuId);
                                }}
                                className="relative PEMenuCard editMenu md:w-full"
                                key={index}
                            >
                                {isMobile ? (
                                    <PEMenuCardMobile
                                        title={menu.title}
                                        description={menu.description}
                                        imageUrls={[]}
                                        pricePerPerson={menu.pricePerAdult}
                                        chefFirstName={data?.users.me?.firstName ?? ''}
                                        chefProfilePictureUrl={data?.users.me?.profilePictureUrl ?? undefined}
                                        categories={menu.categories.map(({ title }) => title)}
                                        kitchen={menu.kitchen?.title ?? undefined}
                                    />
                                ) : (
                                    <PEMenuCard
                                        title={menu.title}
                                        description={menu.description}
                                        imageUrls={[]}
                                        pricePerPerson={menu.pricePerAdult}
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
                                                setEditMenuId(menu.menuId);
                                            }}
                                            className="relative editMenu"
                                            key={index}
                                        >
                                            <PEMenuCard
                                                title={menu.title}
                                                description={menu.description}
                                                imageUrls={[]}
                                                pricePerPerson={menu.pricePerAdult}
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
                <DialogContent>
                    <VStack className="w-[450px] gap-8 relative">
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
                            <p className="m-0">The new menu has been successfully added.</p>
                            <p className="m-0">To delete or edit - click on it.</p>
                        </VStack>
                        <PEButton className="max-w-[250px]" onClick={(): void => setOpenCreateNewMenuSuccess(false)} title="Ok" />
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
                        <p className="m-0 mt-2 text-text-m-bold w-full text-start">Delete the menu</p>
                        <p className="m-0 w-full text-start">Do you really want to delete the menu?</p>
                        <HStack className="w-full gap-4">
                            <PEButton onClick={(): void => setOpenDeleteMenuDialog(false)} title="Cancel" type="secondary" />
                            <PEButton onClick={handleDeleteMenu} title="Delete" />
                        </HStack>
                    </VStack>
                </DialogContent>
            </Dialog>

            {open && editMenuId && (
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
                            setEditMenuId(editMenuId);
                        }}
                    >
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">Edit</p>
                    </MenuItem>
                    <div className="w-full h-[1px] bg-disabled" />
                    <MenuItem sx={{ width: '200px' }} onClick={(): void => undefined}>
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">Publish</p>
                    </MenuItem>
                    <div className="w-full h-[1px] bg-disabled" />
                    <MenuItem sx={{ width: '200px' }} onClick={(): void => setOpenDeleteMenuDialog(true)}>
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">Delete</p>
                    </MenuItem>
                </Menu>
            )}
        </VStack>
    );
}
