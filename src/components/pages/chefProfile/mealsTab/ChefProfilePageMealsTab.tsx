import { useQuery } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import Button from '@mui/material/Button';
import { useEffect, useState, type MouseEvent as MouseEventGen, type ReactElement } from 'react';
import { FindCookMealsDocument, type MealType } from '../../../../data-source/generated/graphql';
import { mealTypes } from '../../../../shared/mealTypes';
import PEMealCard from '../../../cards/mealCard/PEMealCard';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMeal from './ChefProfilePageCreateMeal';

export interface ChefProfilePageMealsTabProps {
    cookId: string;
}

export default function ChefProfilePageMealsTab({ cookId }: ChefProfilePageMealsTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<MealType | 'ALL' | 'CREATE'>('ALL');
    const [openDeleteMealDialog, setOpenDeleteMealDialog] = useState(false);
    const [editMeal, setEditMeal] = useState({
        isOpen: false,
        x: 0,
        y: 0,
        mealId: '',
    });

    const { data, loading, refetch } = useQuery(FindCookMealsDocument, { variables: { cookId } });

    const meals = data?.cooks.meals.findMany ?? [];

    function handleDeleteMealDialog(): void {
        setOpenDeleteMealDialog(false);
    }

    function handleRightClick(event: MouseEventGen<HTMLDivElement>, mealId: string): void {
        if (event.button === 2) setEditMeal({ isOpen: true, x: event.clientX, y: event.clientY, mealId });
        else setEditMeal({ isOpen: false, x: 0, y: 0, mealId: '' });
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
            if (!checkParentNodeHasClass(event, 'editMeal')) setEditMeal({ isOpen: false, x: 0, y: 0, mealId: '' });
        });
    }, []);

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg:my-10 gap-6">
            {selectedTab !== 'CREATE' && (
                <HStack gap={8} className="w-full bg-white shadow-primary box-border p-8 rounded-4" style={{ alignItems: 'center' }}>
                    <PETabItem title="All" onClick={(): void => setSelectedTab('ALL')} active={selectedTab === 'ALL'} />

                    {mealTypes.map((mealType, index) => (
                        <PETabItem
                            key={index}
                            title={mealType}
                            onClick={(): void => setSelectedTab(mealType)}
                            active={selectedTab === mealType}
                        />
                    ))}

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

            {selectedTab === 'ALL' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {meals.map(({ title, description, imageUrl, mealId }, index) => (
                        <div className="editMeal" key={index} onMouseDown={(event): void => handleRightClick(event, mealId)}>
                            <PEMealCard key={index} title={title} description={description} imageUrl={imageUrl ?? undefined} />
                        </div>
                    ))}
                </HStack>
            )}

            {selectedTab === 'STARTER' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {meals
                        .filter(({ type }) => type === 'STARTER')
                        .map(({ title, description, imageUrl, mealId }, index) => (
                            <div className="editMeal" key={index} onMouseDown={(event): void => handleRightClick(event, mealId)}>
                                <PEMealCard key={index} title={title} description={description} imageUrl={imageUrl ?? undefined} />
                            </div>
                        ))}
                </HStack>
            )}

            {selectedTab === 'MAIN_COURSE' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {meals
                        .filter(({ type }) => type === 'MAIN_COURSE')
                        .map(({ title, description, imageUrl, mealId }, index) => (
                            <div className="editMeal" key={index} onMouseDown={(event): void => handleRightClick(event, mealId)}>
                                <PEMealCard key={index} title={title} description={description} imageUrl={imageUrl ?? undefined} />
                            </div>
                        ))}
                </HStack>
            )}

            {selectedTab === 'DESSERT' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {meals
                        .filter(({ type }) => type === 'DESSERT')
                        .map(({ title, description, imageUrl, mealId }, index) => (
                            <div className="editMeal" key={index} onMouseDown={(event): void => handleRightClick(event, mealId)}>
                                <PEMealCard key={index} title={title} description={description} imageUrl={imageUrl ?? undefined} />
                            </div>
                        ))}
                </HStack>
            )}

            {selectedTab === 'CREATE' && (
                <ChefProfilePageCreateMeal
                    cookId={cookId}
                    onSuccess={(): void => {
                        setSelectedTab('ALL');
                        void refetch();
                    }}
                    onCancel={(): void => setSelectedTab('ALL')}
                />
            )}

            {loading && (
                <Dialog open>
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}

            <Dialog
                sx={{ width: '100%', '& .MuiPaper-root': { width: '750px', maxWidth: '750px' } }}
                open={openDeleteMealDialog}
                onClose={handleDeleteMealDialog}
            >
                <DialogContent>
                    <VStack className="gap-8 relative box-border">
                        <VStack className="absolute top-0 right-0">
                            <PEIconButton
                                iconSize={24}
                                icon={Icon.close}
                                onClick={(): void => setOpenDeleteMealDialog(false)}
                                withoutShadow
                                bg="white"
                            />
                        </VStack>
                        <p className="m-0 mt-2 text-text-m-bold w-full text-start">Delete the menu</p>
                        <p className="m-0 w-full text-start">Do you really want to delete the menu?</p>
                        <HStack className="w-full gap-4">
                            <PEButton onClick={(): void => setOpenDeleteMealDialog(false)} title="Cancel" type="secondary" />
                            <PEButton onClick={(): void => setOpenDeleteMealDialog(false)} title="Delete" />
                        </HStack>
                    </VStack>
                </DialogContent>
            </Dialog>

            {editMeal.isOpen && (
                <div
                    className="editMeal absolute w-[200px] box-border bg-white rounded-4 shadow-primary px-4 py-1"
                    style={{ top: editMeal.y, left: editMeal.x }}
                >
                    <Button
                        style={{ width: '100%', textTransform: 'capitalize', margin: '10px 0' }}
                        onClick={(): void => setOpenDeleteMealDialog(true)}
                    >
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">Edit</p>
                    </Button>
                    <div className="w-full h-[1px] bg-disabled" />
                    <Button
                        style={{ width: '100%', textTransform: 'capitalize', margin: '10px 0' }}
                        onClick={(): void => setOpenDeleteMealDialog(true)}
                    >
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">Publish</p>
                    </Button>
                    <div className="w-full h-[1px] bg-disabled" />
                    <Button
                        style={{ width: '100%', textTransform: 'capitalize', margin: '10px 0' }}
                        onClick={(): void => setOpenDeleteMealDialog(true)}
                    >
                        <p className="w-full text-start m-0 hover:text-orange cursor-pointer">Delete</p>
                    </Button>
                </div>
            )}
        </VStack>
    );
}
