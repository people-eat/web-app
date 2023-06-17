import { useQuery } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { FindCookMealsDocument, type MealType } from '../../../../../data-source/generated/graphql';
import { mealTypes } from '../../../../../shared/mealTypes';
import PEButton from '../../../../standard/buttons/PEButton';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import PEModalPopUp from '../../../../standard/modal/PEModalPopUp';
import PENextButton from '../../../../standard/nextButton/PENextButton';
import PETabItem from '../../../../standard/tabItem/PETabItem';
import PETextField from '../../../../standard/textFields/PETextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';
import { type MealEntity } from '../ChefProfilePageMenusTab';
import FilteredMealsList from '../filteredMenuList/FilteredMealsList';
import FilteredMealsListWithMealFilter from '../filteredMenuList/FilteredMealsListWithMealFilter';

export interface ChefProfilePageCreateMenusStep2Props {
    cookId: string;
    menuId?: string;
    onSelectedMeals: (selectedMeals: MealEntity[]) => void;
    greetingFromKitchen: boolean;
    setGreetingFromKitchen: (changedGreetingFromKitchen: boolean) => void;
}

export const MEALS_CARD_COUNT = 6;

function selectMealByTypeAndSelected(meals: MealEntity[], mealType: MealType | 'ALL' | 'CREATE', selectedMeals: string[]): MealEntity[] {
    return meals.filter(({ type, mealId }) => type === mealType && selectedMeals.includes(mealId));
}

// eslint-disable-next-line max-statements
export default function ChefProfilePageCreateMenusStep2({
    cookId,
    onSelectedMeals,
    greetingFromKitchen,
    setGreetingFromKitchen,
}: ChefProfilePageCreateMenusStep2Props): ReactElement {
    const { t } = useTranslation('chef-profile');

    const [openPopUp, setOpenPopUp] = useState(false);
    const [selectedTab, setSelectedTab] = useState<MealType | 'ALL' | 'CREATE'>('ALL');
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
    const [editSelectedMeals, setEditSelectedMeals] = useState<string[]>([]);
    const [greetingFromKitchenDescription, setGreetingFromKitchenDescription] = useState('');

    const { data } = useQuery(FindCookMealsDocument, { variables: { cookId } });

    const meals: MealEntity[] = data?.cooks.meals.findMany ?? [];

    function handleUnSaveChooseMeals(): void {
        setOpenPopUp(false);
        setEditSelectedMeals(selectedMeals);
    }

    function handleSaveChooseMeals(): void {
        setOpenPopUp(false);
        setSelectedMeals(editSelectedMeals);
        onSelectedMeals(meals.filter(({ mealId }) => editSelectedMeals.includes(mealId)));
    }

    function handleSelectTab(value: MealType | 'ALL' | 'CREATE'): void {
        setSelectedTab(value);
        setActiveIndex(0);
    }

    function handleUpdateSelectedMeals(index: string): void {
        const indexOfSelectedMeals = editSelectedMeals.indexOf(index);
        if (indexOfSelectedMeals + 1) {
            setEditSelectedMeals([
                ...editSelectedMeals.slice(0, indexOfSelectedMeals),
                ...editSelectedMeals.slice(indexOfSelectedMeals + 1),
            ]);
        } else setEditSelectedMeals([...editSelectedMeals, index]);
    }

    function handleNextListOfMeals(listOfMeals: MealEntity[]): void {
        setActiveIndex(Math.floor((activeIndex + 1) % Math.round(listOfMeals.length / 6 + 1)));
    }

    function handlePreviousListOfMeals(listOfMeals: MealEntity[]): void {
        setActiveIndex(Math.abs(Math.floor((activeIndex - 1) % Math.round(listOfMeals.length / 6 + 1))));
    }

    return (
        <VStack className="w-full gap-6" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <PEModalPopUp openMenu={openPopUp} handleOpenMenu={handleUnSaveChooseMeals} width={850}>
                <VStack className="w-[850px] h-[730px] px-8 py-15 box-border relative gap-5">
                    <h2 className="m-0 mt-[-40px] w-full text-heading-ss">Training</h2>

                    <HStack className="w-full" style={{ justifyContent: 'space-between' }}>
                        <HStack className="gap-4">
                            {mealTypes.map((mealType, index) => (
                                <PETabItem
                                    key={index}
                                    title={mealType}
                                    onClick={(): void => handleSelectTab(mealType)}
                                    active={selectedTab === mealType}
                                />
                            ))}
                        </HStack>

                        <HStack className="gap-4">
                            <PENextButton onClick={(): void => handlePreviousListOfMeals(meals)} reverse />
                            <PENextButton onClick={(): void => handleNextListOfMeals(meals)} />
                        </HStack>
                    </HStack>

                    <VStack className="w-full h-full gap-10">
                        <VStack className="w-full h-[480px]">
                            <FilteredMealsListWithMealFilter
                                meals={meals.filter(({ type }) => type === 'STARTER')}
                                selectedMeals={editSelectedMeals}
                                clickOnMeal={handleUpdateSelectedMeals}
                                show={selectedTab === 'STARTER'}
                                activeIndex={activeIndex}
                            />

                            <FilteredMealsListWithMealFilter
                                meals={meals.filter(({ type }) => type === 'MAIN_COURSE')}
                                selectedMeals={editSelectedMeals}
                                clickOnMeal={handleUpdateSelectedMeals}
                                show={selectedTab === 'MAIN_COURSE'}
                                activeIndex={activeIndex}
                            />

                            <FilteredMealsListWithMealFilter
                                meals={meals.filter(({ type }) => type === 'DESSERT')}
                                selectedMeals={editSelectedMeals}
                                clickOnMeal={handleUpdateSelectedMeals}
                                show={selectedTab === 'DESSERT'}
                                activeIndex={activeIndex}
                            />
                        </VStack>

                        <PEButton onClick={handleSaveChooseMeals} title="Save" />
                    </VStack>
                </VStack>
            </PEModalPopUp>

            <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                <VStack className="w-full my-4">
                    <p className="w-full text-text-m-bold my-0">Would you like to offer a greeting from the kitchen?</p>

                    <HStack className="gap-2 w-full my-4" style={{ justifyContent: 'flex-start' }}>
                        <PETabItem title="Yes" onClick={(): void => setGreetingFromKitchen(true)} active={greetingFromKitchen} />
                        <PETabItem title="No" onClick={(): void => setGreetingFromKitchen(false)} active={!greetingFromKitchen} />
                    </HStack>

                    <PETextField type={'text'} value={greetingFromKitchenDescription} onChange={setGreetingFromKitchenDescription} />
                </VStack>

                <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'flex-start' }}>
                    {!selectedMeals.length && (
                        <div
                            onClick={(): void => setOpenPopUp(true)}
                            className="flex items-center w-[380px] h-[140px] border-orange border-[1px] border-solid border-disabled hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition justify-center rounded-4"
                        >
                            <VStack>
                                <PEIcon icon={Icon.plusOrange} />
                                <p className="my-2 text-orange text-text-sm">Add Dish</p>
                            </VStack>
                        </div>
                    )}

                    {Boolean(selectMealByTypeAndSelected(meals, 'STARTER', selectedMeals).length) && (
                        <p className="text-text-m-bold">Starter ({selectMealByTypeAndSelected(meals, 'STARTER', selectedMeals).length})</p>
                    )}
                    <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'flex-start' }}>
                        <FilteredMealsList
                            meals={selectMealByTypeAndSelected(meals, 'STARTER', selectedMeals)}
                            clickOnMeal={handleUpdateSelectedMeals}
                            show={Boolean(selectMealByTypeAndSelected(meals, 'STARTER', selectedMeals).length)}
                            openPopUp={(): void => {
                                setOpenPopUp(true);
                                setSelectedTab('STARTER');
                            }}
                        />
                    </HStack>

                    {Boolean(selectMealByTypeAndSelected(meals, 'MAIN_COURSE', selectedMeals).length) && (
                        <p className="text-text-m-bold">Main ({selectMealByTypeAndSelected(meals, 'MAIN_COURSE', selectedMeals).length})</p>
                    )}
                    <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'flex-start' }}>
                        <FilteredMealsList
                            meals={selectMealByTypeAndSelected(meals, 'MAIN_COURSE', selectedMeals)}
                            clickOnMeal={handleUpdateSelectedMeals}
                            show={Boolean(selectMealByTypeAndSelected(meals, 'MAIN_COURSE', selectedMeals).length)}
                            openPopUp={(): void => {
                                setOpenPopUp(true);
                                setSelectedTab('MAIN_COURSE');
                            }}
                        />
                    </HStack>

                    {Boolean(selectMealByTypeAndSelected(meals, 'DESSERT', selectedMeals).length) && (
                        <p className="text-text-m-bold">Dessert ({selectMealByTypeAndSelected(meals, 'DESSERT', selectedMeals).length})</p>
                    )}
                    <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'flex-start' }}>
                        <FilteredMealsList
                            meals={selectMealByTypeAndSelected(meals, 'DESSERT', selectedMeals)}
                            clickOnMeal={handleUpdateSelectedMeals}
                            show={Boolean(selectMealByTypeAndSelected(meals, 'DESSERT', selectedMeals).length)}
                            openPopUp={(): void => {
                                setOpenPopUp(true);
                                setSelectedTab('DESSERT');
                            }}
                        />
                    </HStack>

                    {Boolean(!selectedMeals.length) && (
                        <PEButton className="max-w-[250px]" onClick={(): void => undefined} title={t('add-gear')} />
                    )}
                </HStack>
            </VStack>
        </VStack>
    );
}
