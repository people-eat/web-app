import { useQuery } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState, type MouseEvent as MouseEventGen, type ReactElement } from 'react';
import { FindCookMenusDocument, type MealType } from '../../../../data-source/generated/graphql';
import PEMenuCard from '../../../cards/menuCard/PEMenuCard';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMenu from './ChefProfilePageCreateMenu';

export interface MealEntity {
    mealId: string;
    cookId: string;
    title: string;
    type: MealType;
    description: string;
    imageUrl?: string | null;
    createdAt: Date;
}

export interface ChefProfilePageMenusTabProps {
    cookId: string;
}

export default function ChefProfilePageMenusTab({ cookId }: ChefProfilePageMenusTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<'MENUS' | 'CREATE'>('MENUS');
    const [openCreateNewMenuSuccess, setOpenCreateNewMenuSuccess] = useState(false);
    const [openDeleteMenuDialog, setOpenDeleteMenuDialog] = useState(false);
    const [editMenu, setEditMenu] = useState({
        isOpen: false,
        x: 0,
        y: 0,
        menuId: '',
    });

    const { data, loading } = useQuery(FindCookMenusDocument, { variables: { cookId } });

    const menus = data?.cooks.menus.findMany ?? [];

    const visibleMenus = menus.filter((menu) => menu.isVisible);

    const invisibleMenus = menus.filter((menu) => !menu.isVisible);

    function handleDeleteMenuDialog(): void {
        setOpenDeleteMenuDialog(false);
    }

    function handleCreateNewMenuSuccess(): void {
        setSelectedTab('MENUS');
        setOpenCreateNewMenuSuccess(true);
    }

    function handleRightClick(event: MouseEventGen<HTMLDivElement>, menuId: string): void {
        if (event.button === 2) setEditMenu({ isOpen: true, x: event.clientX, y: event.clientY, menuId });
        else setEditMenu({ isOpen: false, x: 0, y: 0, menuId: '' });
    }

    function checkParentNodeHasClass(event: MouseEvent, targetClass: string): boolean {
        let element = event.target as HTMLElement;

        try {
            while (element && element.classList) {
                if (element.classList && element.classList?.contains(targetClass)) return true;
                element = element.parentNode as HTMLElement;
            }
        } catch (e) {
            console.error(e);
        }

        return false;
    }

    useEffect(() => {
        // remove default right click for that page, to use custom function
        document.addEventListener('contextmenu', (event) => event.preventDefault());
        document.addEventListener('click', (event) => {
            if (!checkParentNodeHasClass(event, 'editMenu')) setEditMenu({ isOpen: false, x: 0, y: 0, menuId: '' });
        });
    }, []);

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg:my-10 gap-6">
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

            {selectedTab === 'CREATE' && (
                <ChefProfilePageCreateMenu
                    cookId={cookId}
                    onSuccess={handleCreateNewMenuSuccess}
                    onCancel={(): void => setSelectedTab('MENUS')}
                />
            )}

            {selectedTab === 'MENUS' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {visibleMenus.map((menu, index) => (
                        <div
                            onMouseDown={(event): void => handleRightClick(event, menu.menuId)}
                            className="relative PEMenuCard"
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
                                        onMouseDown={(event): void => handleRightClick(event, menu.menuId)}
                                        className="relative"
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
                onClose={handleDeleteMenuDialog}
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
                            <PEButton onClick={(): void => setOpenDeleteMenuDialog(false)} title="Delete" />
                        </HStack>
                    </VStack>
                </DialogContent>
            </Dialog>

            {editMenu.isOpen && (
                <div
                    className="editMenu absolute w-[200px] box-border bg-white rounded-4 shadow-primary px-4 py-1"
                    style={{ top: editMenu.y, left: editMenu.x }}
                >
                    <Button
                        style={{ width: '100%', textTransform: 'capitalize', margin: '10px 0' }}
                        onClick={(): void => setOpenDeleteMenuDialog(true)}
                    >
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">Edit</p>
                    </Button>
                    <div className="w-full h-[1px] bg-disabled" />
                    <Button
                        style={{ width: '100%', textTransform: 'capitalize', margin: '10px 0' }}
                        onClick={(): void => setOpenDeleteMenuDialog(true)}
                    >
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
