import { useMutation } from '@apollo/client';
import { Dialog, DialogContent } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { UpdateCookMenuGreetingFromKitchenDocument, type MealType } from '../../../../../../data-source/generated/graphql';
import { mealTypes } from '../../../../../../shared/mealTypes';
import PEButton from '../../../../../standard/buttons/PEButton';
import { Icon } from '../../../../../standard/icon/Icon';
import PEIcon from '../../../../../standard/icon/PEIcon';
import PETabItem from '../../../../../standard/tabItem/PETabItem';
import PETextField from '../../../../../standard/textFields/PETextField';
import HStack from '../../../../../utility/hStack/HStack';
import Spacer from '../../../../../utility/spacer/Spacer';
import VStack from '../../../../../utility/vStack/VStack';
import { type MealEntity, type MenuEntity } from '../../ChefProfilePageMenusTab';

export interface ChefProfilePageEditMenusStep2Props {
    menu: MenuEntity;
    cookId: string;
    menuId?: string;
    onSelectedMeals?: (selectedMeals: MealEntity[]) => void;
    onSaveUpdates: () => void;
}

// export const MEALS_CARD_COUNT = 6;
//
// function selectMealByTypeAndSelected(meals: MealEntity[], mealType: MealType | 'ALL' | 'CREATE', selectedMeals: string[]): MealEntity[] {
//     return meals.filter(({ type, mealId }) => type === mealType && selectedMeals.includes(mealId));
// }

// eslint-disable-next-line max-statements
export default function ChefProfilePageEditMenusStep2({ cookId, menu, onSaveUpdates }: ChefProfilePageEditMenusStep2Props): ReactElement {
    const { t } = useTranslation('chef-profile');

    const [_openPopUp, setOpenPopUp] = useState(false);
    // const [selectedTab, setSelectedTab] = useState<MealType | 'ALL' | 'CREATE'>('ALL');
    // const [activeIndex, setActiveIndex] = useState(0);
    const [selectedMeals] = useState<string[]>([]);
    // const [editSelectedMeals, setEditSelectedMeals] = useState<string[]>([]);
    // const [greetingFromKitchenDescription, setGreetingFromKitchenDescription] = useState('');
    const [greetingFromKitchen, setGreetingFromKitchen] = useState(menu.greetingFromKitchen ?? undefined);

    const [courses, setCourses] = useState<{ title: string; mealType: MealType }[]>([]);
    const [showCreateCourseDialog, setShowCreateCourseDialog] = useState(false);
    const [newCourseTitle, setNewCourseTitle] = useState('');
    const [newCourseMealType, setNewCourseMealType] = useState<MealType>('STARTER');

    // const { data } = useQuery(FindCookMealsDocument, { variables: { cookId } });

    const [updateGreetingFromKitchen] = useMutation(UpdateCookMenuGreetingFromKitchenDocument, {
        variables: { cookId, menuId: menu.menuId },
    });

    // function handleUnSaveChooseMeals(): void {
    //     setOpenPopUp(false);
    //     setEditSelectedMeals(selectedMeals);
    // }
    //
    // function handleSaveChooseMeals(): void {
    //     setOpenPopUp(false);
    //     setSelectedMeals(editSelectedMeals);
    //     onSelectedMeals(meals.filter(({ mealId }) => editSelectedMeals.includes(mealId)));
    // }
    //
    // function handleSelectTab(value: MealType | 'ALL' | 'CREATE'): void {
    //     setSelectedTab(value);
    //     setActiveIndex(0);
    // }
    //
    // function handleUpdateSelectedMeals(index: string): void {
    //     const indexOfSelectedMeals = editSelectedMeals.indexOf(index);
    //     if (indexOfSelectedMeals + 1) {
    //         setEditSelectedMeals([
    //             ...editSelectedMeals.slice(0, indexOfSelectedMeals),
    //             ...editSelectedMeals.slice(indexOfSelectedMeals + 1),
    //         ]);
    //     } else setEditSelectedMeals([...editSelectedMeals, index]);
    // }
    //
    // function handleNextListOfMeals(listOfMeals: MealEntity[]): void {
    //     setActiveIndex(Math.floor((activeIndex + 1) % Math.round(listOfMeals.length / 6 + 1)));
    // }
    //
    // function handlePreviousListOfMeals(listOfMeals: MealEntity[]): void {
    //     setActiveIndex(Math.abs(Math.floor((activeIndex - 1) % Math.round(listOfMeals.length / 6 + 1))));
    // }

    function handleOnSaveUpdatesError(e: string): void {
        console.error(e);
    }

    function handleSaveUpdates(): void {
        void Promise.all<{ data: { cook: { success?: boolean } } }>([
            new Promise((resolve) =>
                menu.greetingFromKitchen !== greetingFromKitchen
                    ? void updateGreetingFromKitchen()
                    : resolve({ data: { cook: { success: false } } }),
            ),
        ])
            .then((responses) => {
                if (responses.some((item) => item.data.cook.success)) onSaveUpdates();
            })
            .catch(handleOnSaveUpdatesError);
    }

    return (
        <VStack className="w-full gap-6" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            {/* <PEModalPopUp openMenu={openPopUp} handleOpenMenu={handleUnSaveChooseMeals} width={850}>*/}
            {/*    <VStack className="w-[850px] h-[730px] px-8 py-15 box-border relative gap-5">*/}
            {/*        <h2 className="m-0 mt-[-40px] w-full text-heading-ss">Training</h2>*/}

            {/*        <HStack className="w-full" style={{ justifyContent: 'space-between' }}>*/}
            {/*            <HStack className="gap-4">*/}
            {/*                {mealTypes.map((mealType, index) => (*/}
            {/*                    <PETabItem*/}
            {/*                        key={index}*/}
            {/*                        title={mealType}*/}
            {/*                        onClick={(): void => handleSelectTab(mealType)}*/}
            {/*                        active={selectedTab === mealType}*/}
            {/*                    />*/}
            {/*                ))}*/}
            {/*            </HStack>*/}

            {/*            <HStack className="gap-4">*/}
            {/*                <PENextButton onClick={(): void => handlePreviousListOfMeals(meals)} reverse />*/}
            {/*                <PENextButton onClick={(): void => handleNextListOfMeals(meals)} />*/}
            {/*            </HStack>*/}
            {/*        </HStack>*/}

            {/*        <VStack className="w-full h-full gap-10">*/}
            {/*            <VStack className="w-full h-[480px]">*/}
            {/*                <FilteredMealsListWithMealFilter*/}
            {/*                    meals={meals.filter(({ type }) => type === 'STARTER')}*/}
            {/*                    selectedMeals={editSelectedMeals}*/}
            {/*                    clickOnMeal={handleUpdateSelectedMeals}*/}
            {/*                    show={selectedTab === 'STARTER'}*/}
            {/*                    activeIndex={activeIndex}*/}
            {/*                />*/}

            {/*                <FilteredMealsListWithMealFilter*/}
            {/*                    meals={meals.filter(({ type }) => type === 'MAIN_COURSE')}*/}
            {/*                    selectedMeals={editSelectedMeals}*/}
            {/*                    clickOnMeal={handleUpdateSelectedMeals}*/}
            {/*                    show={selectedTab === 'MAIN_COURSE'}*/}
            {/*                    activeIndex={activeIndex}*/}
            {/*                />*/}

            {/*                <FilteredMealsListWithMealFilter*/}
            {/*                    meals={meals.filter(({ type }) => type === 'DESSERT')}*/}
            {/*                    selectedMeals={editSelectedMeals}*/}
            {/*                    clickOnMeal={handleUpdateSelectedMeals}*/}
            {/*                    show={selectedTab === 'DESSERT'}*/}
            {/*                    activeIndex={activeIndex}*/}
            {/*                />*/}
            {/*            </VStack>*/}

            {/*            <PEButton onClick={handleSaveChooseMeals} title="Save" />*/}
            {/*        </VStack>*/}
            {/*    </VStack>*/}
            {/* </PEModalPopUp>*/}

            <VStack gap={32} className="w-full" style={{ alignItems: 'flex-start' }}>
                <VStack className="w-full">
                    <p className="w-full text-text-m-bold my-0">Would you like to offer a greeting from the kitchen?</p>

                    <HStack gap={16} className="w-full my-4" style={{ alignItems: 'center' }}>
                        <PETabItem
                            title="Yes"
                            onClick={(): void => setGreetingFromKitchen('')}
                            active={greetingFromKitchen !== undefined}
                        />
                        <PETabItem
                            title="No"
                            onClick={(): void => setGreetingFromKitchen(undefined)}
                            active={greetingFromKitchen === undefined}
                        />
                        {greetingFromKitchen === undefined && (
                            <PETextField type={'text'} value={greetingFromKitchen} onChange={(): void => undefined} disabled={true} />
                        )}
                        {greetingFromKitchen !== undefined && (
                            <PETextField type={'text'} value={greetingFromKitchen} onChange={setGreetingFromKitchen} />
                        )}
                    </HStack>
                </VStack>

                <HStack className="w-full">
                    <span className="text-text-m-bold my-0">Courses</span>
                    <Spacer />
                    {Boolean(!selectedMeals.length) && (
                        <PEButton className="max-w-[250px]" onClick={(): void => setShowCreateCourseDialog(true)} title={t('add-gear')} />
                    )}
                </HStack>

                {courses.map(({ title, mealType }, index) => (
                    <VStack key={index} className="w-full" gap={16} style={{ alignItems: 'flex-start' }}>
                        <HStack gap={8} className="w-full" style={{ alignItems: 'center' }}>
                            <PETextField
                                value={title}
                                onChange={(changedTitle: string): void =>
                                    setCourses(
                                        courses.map((course, index2): { title: string; mealType: MealType } =>
                                            index === index2 ? { title: changedTitle, mealType: course.mealType } : course,
                                        ),
                                    )
                                }
                                type="text"
                            />
                            {mealType}
                        </HStack>
                        <VStack
                            onClick={(): void => setOpenPopUp(true)}
                            className="items-center w-[380px] h-[140px] border-orange border-[1px] border-solid hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 justify-center rounded-4"
                        >
                            <PEIcon icon={Icon.plusOrange} />
                            <span className="text-orange text-text-sm">Add Dish</span>
                        </VStack>
                    </VStack>
                ))}

                <Dialog open={showCreateCourseDialog}>
                    <DialogContent>
                        <VStack gap={16}>
                            <PETextField value={newCourseTitle} onChange={setNewCourseTitle} type="text" />
                            <HStack>
                                {mealTypes.map((mealType, index) => (
                                    <PETabItem
                                        key={index}
                                        title={mealType}
                                        onClick={(): void => setNewCourseMealType(mealType)}
                                        active={newCourseMealType === mealType}
                                    />
                                ))}
                            </HStack>
                            <PEButton
                                className="max-w-[250px]"
                                title={t('add-gear')}
                                onClick={(): void => {
                                    setCourses([...courses, { title: newCourseTitle, mealType: newCourseMealType }]);
                                    setNewCourseTitle('');
                                    setShowCreateCourseDialog(false);
                                }}
                            />
                        </VStack>
                    </DialogContent>
                </Dialog>

                {/* <VStack className="w-full" style={{ alignItems: 'flex-start' }}>*/}
                {/*    <VStack className="w-full my-4">*/}
                {/*        <p className="w-full text-text-m-bold my-0">Would you like to offer a greeting from the kitchen?</p>*/}

                {/*        <HStack className="gap-2 w-full my-4" style={{ justifyContent: 'flex-start' }}>*/}
                {/*            <PETabItem title="Yes" onClick={(): void => setGreetingFromKitchen(true)} active={greetingFromKitchen} />*/}
                {/*            <PETabItem title="No" onClick={(): void => setGreetingFromKitchen(false)} active={!greetingFromKitchen} />*/}
                {/*        </HStack>*/}

                {/*        <PETextField type={'text'} value={greetingFromKitchenDescription} onChange={setGreetingFromKitchenDescription} />*/}
                {/*    </VStack>*/}

                {/*    <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'flex-start' }}>*/}
                {/*        {!selectedMeals.length && (*/}
                {/*            <div*/}
                {/*                onClick={(): void => setOpenPopUp(true)}*/}
                {/*                className="flex items-center w-[380px] h-[140px] border-orange border-[1px] border-solid border-disabled hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition justify-center rounded-4"*/}
                {/*            >*/}
                {/*                <VStack>*/}
                {/*                    <PEIcon icon={Icon.plusOrange} />*/}
                {/*                    <p className="my-2 text-orange text-text-sm">Add Dish</p>*/}
                {/*                </VStack>*/}
                {/*            </div>*/}
                {/*        )}*/}

                {/*        {Boolean(selectMealByTypeAndSelected(meals, 'STARTER', selectedMeals).length) && (*/}
                {/*            <p className="text-text-m-bold">Starter ({selectMealByTypeAndSelected(meals, 'STARTER', selectedMeals).length})</p>*/}
                {/*        )}*/}
                {/*        <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'flex-start' }}>*/}
                {/*            <FilteredMealsList*/}
                {/*                meals={selectMealByTypeAndSelected(meals, 'STARTER', selectedMeals)}*/}
                {/*                clickOnMeal={handleUpdateSelectedMeals}*/}
                {/*                show={Boolean(selectMealByTypeAndSelected(meals, 'STARTER', selectedMeals).length)}*/}
                {/*                openPopUp={(): void => {*/}
                {/*                    setOpenPopUp(true);*/}
                {/*                    setSelectedTab('STARTER');*/}
                {/*                }}*/}
                {/*            />*/}
                {/*        </HStack>*/}

                {/*        {Boolean(selectMealByTypeAndSelected(meals, 'MAIN_COURSE', selectedMeals).length) && (*/}
                {/*            <p className="text-text-m-bold">Main ({selectMealByTypeAndSelected(meals, 'MAIN_COURSE', selectedMeals).length})</p>*/}
                {/*        )}*/}
                {/*        <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'flex-start' }}>*/}
                {/*            <FilteredMealsList*/}
                {/*                meals={selectMealByTypeAndSelected(meals, 'MAIN_COURSE', selectedMeals)}*/}
                {/*                clickOnMeal={handleUpdateSelectedMeals}*/}
                {/*                show={Boolean(selectMealByTypeAndSelected(meals, 'MAIN_COURSE', selectedMeals).length)}*/}
                {/*                openPopUp={(): void => {*/}
                {/*                    setOpenPopUp(true);*/}
                {/*                    setSelectedTab('MAIN_COURSE');*/}
                {/*                }}*/}
                {/*            />*/}
                {/*        </HStack>*/}

                {/*        {Boolean(selectMealByTypeAndSelected(meals, 'DESSERT', selectedMeals).length) && (*/}
                {/*            <p className="text-text-m-bold">Dessert ({selectMealByTypeAndSelected(meals, 'DESSERT', selectedMeals).length})</p>*/}
                {/*        )}*/}
                {/*        <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'flex-start' }}>*/}
                {/*            <FilteredMealsList*/}
                {/*                meals={selectMealByTypeAndSelected(meals, 'DESSERT', selectedMeals)}*/}
                {/*                clickOnMeal={handleUpdateSelectedMeals}*/}
                {/*                show={Boolean(selectMealByTypeAndSelected(meals, 'DESSERT', selectedMeals).length)}*/}
                {/*                openPopUp={(): void => {*/}
                {/*                    setOpenPopUp(true);*/}
                {/*                    setSelectedTab('DESSERT');*/}
                {/*                }}*/}
                {/*            />*/}
                {/*        </HStack>*/}

                {/*        {Boolean(!selectedMeals.length) && (*/}
                {/*            <PEButton className="max-w-[250px]" onClick={(): void => undefined} title={t('add-gear')} />*/}
                {/*        )}*/}
                {/*    </HStack>*/}
                {/* </VStack>*/}

                <PEButton title="Save" onClick={handleSaveUpdates} />
            </VStack>
        </VStack>
    );
}
