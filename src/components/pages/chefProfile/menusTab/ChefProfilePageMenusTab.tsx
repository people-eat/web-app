import { useMutation, useQuery } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState, type MouseEvent, type ReactElement } from 'react';
import {
    DeleteOneCookMenuDocument,
    FindCookMenusDocument,
    type CurrencyCode,
    type MealType,
} from '../../../../data-source/generated/graphql';
import { isParentNodeElementHasClass } from '../../../../utils/isParentNodeElementHasClass';
import PEMenuCard from '../../../cards/menuCard/PEMenuCard';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMenu from './ChefProfilePageCreateMenu';
import ChefProfilePageEditMenu from './ChefProfilePageEditMenu';

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
    const [selectedTab, setSelectedTab] = useState<'MENUS' | 'CREATE' | 'EDIT'>('MENUS');
    const [openCreateNewMenuSuccess, setOpenCreateNewMenuSuccess] = useState(false);
    const [openDeleteMenuDialog, setOpenDeleteMenuDialog] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState<string | undefined>(undefined);
    const [editMenu, setEditMenu] = useState({ x: 0, y: 0, menuId: '' });
    const [isEditMenuOpen, setEditMenuOpen] = useState(false);

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
                    menuId: editMenu.menuId,
                },
            }).then((): void => {
                setOpenDeleteMenuDialog(false);
                void refetch();
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

    function handleClickOnCard(event: MouseEvent<HTMLDivElement>, menuId: string): void {
        if (event.button === 0) {
            setEditMenuOpen(true);
            setEditMenu({ x: event.clientX, y: event.clientY, menuId });
        } else setEditMenuOpen(false);
    }

    useEffect(() => {
        // remove default right click for that page, to use custom function
        document.addEventListener('contextmenu', (event) => event.preventDefault());
        document.addEventListener('click', (event) => {
            if (!isParentNodeElementHasClass(event, 'editMenu')) setEditMenuOpen(false);
        });
    }, []);

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg:my-10 gap-6">
            {selectedTab === 'CREATE' && (
                <ChefProfilePageCreateMenu
                    cookId={cookId}
                    onSuccess={handleCreateNewMenuSuccess}
                    onCancel={(): void => setSelectedTab('MENUS')}
                />
            )}

            {selectedTab === 'EDIT' && selectedMenu && (
                <ChefProfilePageEditMenu
                    onCancel={(): void => {
                        setSelectedTab('MENUS');
                    }}
                    onSaveUpdates={(): void => {
                        setSelectedTab('MENUS');
                        void refetch();
                    }}
                    menuId={selectedMenu}
                    cookId={cookId}
                />
            )}

            {selectedTab === 'MENUS' && (
                <>
                    <HStack gap={8} className="w-full bg-white shadow-primary box-border p-8 rounded-4" style={{ alignItems: 'center' }}>
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
                                onMouseUp={(event): void => handleClickOnCard(event, menu.menuId)}
                                className="relative PEMenuCard editMenu"
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

                        {Boolean(invisibleMenus.length) && (
                            <>
                                <p className="text-text-m-bold w-full">Archive</p>
                                <HStack
                                    className="relative w-full gap-6 flex-wrap opacity-30"
                                    style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    {invisibleMenus.map((menu, index) => (
                                        <div
                                            onMouseUp={(event): void => handleClickOnCard(event, menu.menuId)}
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

            {isEditMenuOpen && (
                <div
                    className="editMenu absolute w-[200px] box-border bg-white rounded-4 shadow-primary px-4 py-1"
                    style={{ top: editMenu.y, left: editMenu.x }}
                >
                    <Button
                        style={{ width: '100%', textTransform: 'capitalize', margin: '10px 0' }}
                        onClick={(): void => {
                            setSelectedTab('EDIT');
                            setSelectedMenu(editMenu.menuId);
                            setEditMenuOpen(false);
                        }}
                    >
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">Edit</p>
                    </Button>
                    <div className="w-full h-[1px] bg-disabled" />
                    <Button style={{ width: '100%', textTransform: 'capitalize', margin: '10px 0' }} onClick={(): void => undefined}>
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">Publish</p>
                    </Button>
                    <div className="w-full h-[1px] bg-disabled" />
                    <Button
                        style={{ width: '100%', textTransform: 'capitalize', margin: '10px 0' }}
                        onClick={(): void => setOpenDeleteMenuDialog(true)}
                    >
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">Delete</p>
                    </Button>
                </div>
            )}
        </VStack>
    );
}
