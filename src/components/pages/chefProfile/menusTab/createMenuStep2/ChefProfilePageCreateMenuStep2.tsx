import { useQuery } from '@apollo/client';
import { useState, type ReactElement } from 'react';
import { FindCookMealsDocument, MealType } from '../../../../../data-source/generated/graphql';
import { mealTypes } from '../../../../../shared/mealTypes';
import { PEMealCardProps } from '../../../../cards/mealCard/PEMEalCardProps';
import PEMealCard from '../../../../cards/mealCard/PEMealCard';
import PEButton from '../../../../standard/buttons/PEButton';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import PEModalPopUp from '../../../../standard/modal/PEModalPopUp';
import PENextButton from '../../../../standard/nextButton/PENextButton';
import PETabItem from '../../../../standard/tabItem/PETabItem';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';
import { MEALS } from '../meals.mock';

export interface ChefProfilePageCreateMenusStep2Props {
    cookId: string;
    onSelectedMeals: (selectedMeals: PEMealCardProps[]) => void;
}

export default function ChefProfilePageCreateMenusStep2({ cookId, onSelectedMeals }: ChefProfilePageCreateMenusStep2Props): ReactElement {
    const [openPopUp, setOpenPopUp] = useState(false);
    const [selectedTab, setSelectedTab] = useState<MealType | 'ALL' | 'CREATE'>('ALL');
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedMeals, setSelectedMeals] = useState<number[]>([]);
    const [editSelectedMeals, setEditSelectedMeals] = useState<number[]>([]);

    const { data } = useQuery(FindCookMealsDocument, { variables: { cookId } });

    const meals = data?.cooks.meals.findMany ?? [];

    function handleUnSaveChooseMeals(): void {
        setOpenPopUp(false);
        setEditSelectedMeals(selectedMeals);
    }

    function handleSaveChooseMeals(): void {
        setOpenPopUp(false);
        setSelectedMeals(editSelectedMeals);
        onSelectedMeals(MEALS.filter((_, index) => editSelectedMeals.includes(index)));
    }

    function handleSelectTab(value: MealType | 'ALL' | 'CREATE'): void {
        setSelectedTab(value);
        setActiveIndex(0);
    }

    function handleUpdateSelectedMeals(index: number): void {
        const indexOfSelectedMeals = editSelectedMeals.indexOf(index);
        if (indexOfSelectedMeals + 1) {
            setEditSelectedMeals([
                ...editSelectedMeals.slice(0, indexOfSelectedMeals),
                ...editSelectedMeals.slice(indexOfSelectedMeals + 1),
            ]);
        } else setEditSelectedMeals([...editSelectedMeals, index]);
    }

    function handleNextListOfMeals(listOfMeals: PEMealCardProps[]): void {
        setActiveIndex(Math.floor((activeIndex + 1) % Math.round(listOfMeals.length / 6 + 1)));
    }

    function handlePreviousListOfMeals(listOfMeals: PEMealCardProps[]): void {
        setActiveIndex(Math.abs(Math.floor((activeIndex - 1) % Math.round(listOfMeals.length / 6 + 1))));
    }

    return (
        <VStack className="w-full gap-6" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <PEModalPopUp openMenu={openPopUp} handleOpenMenu={handleUnSaveChooseMeals} width={850}>
                <VStack className="w-[850px] h-[730px] px-8 py-15 box-border relative gap-5">
                    <h2 className="m-0 mt-[-40px] w-full text-heading-ss">Training</h2>

                    <HStack className="w-full" style={{ justifyContent: 'space-between' }}>
                        <HStack className="gap-4">
                            <PETabItem title="All" onClick={(): void => handleSelectTab('ALL')} active={selectedTab === 'ALL'} />
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
                            <PENextButton onClick={(): void => handlePreviousListOfMeals(MEALS)} reverse />
                            <PENextButton onClick={(): void => handleNextListOfMeals(MEALS)} />
                        </HStack>
                    </HStack>

                    <VStack className="w-full h-full gap-10">
                        <VStack className="w-full h-[480px]">
                            {selectedTab === 'ALL' && (
                                <HStack
                                    className="relative w-full gap-6 flex-wrap"
                                    style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    {meals
                                        .filter((_, index) => index < activeIndex * 6)
                                        .map(({ title, description, imageUrl }, index) => (
                                            <PEMealCard
                                                key={index}
                                                title={title}
                                                description={description}
                                                imageUrl={imageUrl ?? undefined}
                                            />
                                        ))}
                                </HStack>
                            )}

                            <HStack className="w-full flex-wrap gap-6" style={{ justifyContent: 'space-between' }}>
                                {MEALS.map(({ title, description, imageUrl }, index) => (
                                    <>
                                        {index >= activeIndex * 6 && index < (activeIndex + 1) * 6 ? (
                                            <div key={index} className="w-full basis-[380px]">
                                                <PEMealCard
                                                    active={editSelectedMeals.includes(index)}
                                                    onClick={(): void => handleUpdateSelectedMeals(index)}
                                                    title={title}
                                                    description={description}
                                                    imageUrl={imageUrl ?? undefined}
                                                />
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </>
                                ))}
                            </HStack>

                            {selectedTab === 'STARTER' && (
                                <HStack
                                    className="relative w-full gap-6 flex-wrap"
                                    style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    {meals
                                        .filter(({ type }) => type === 'STARTER')
                                        .map(({ title, description, imageUrl }, index) => (
                                            <PEMealCard
                                                key={index}
                                                title={title}
                                                description={description}
                                                imageUrl={imageUrl ?? undefined}
                                            />
                                        ))}
                                </HStack>
                            )}

                            {selectedTab === 'MAIN_COURSE' && (
                                <HStack
                                    className="relative w-full gap-6 flex-wrap"
                                    style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    {meals
                                        .filter(({ type }) => type === 'MAIN_COURSE')
                                        .map(({ title, description, imageUrl }, index) => (
                                            <PEMealCard
                                                key={index}
                                                title={title}
                                                description={description}
                                                imageUrl={imageUrl ?? undefined}
                                            />
                                        ))}
                                </HStack>
                            )}

                            {selectedTab === 'DESSERT' && (
                                <HStack
                                    className="relative w-full gap-6 flex-wrap"
                                    style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                                >
                                    {meals
                                        .filter(({ type }) => type === 'DESSERT')
                                        .map(({ title, description, imageUrl }, index) => (
                                            <PEMealCard
                                                key={index}
                                                title={title}
                                                description={description}
                                                imageUrl={imageUrl ?? undefined}
                                            />
                                        ))}
                                </HStack>
                            )}
                        </VStack>

                        <PEButton onClick={handleSaveChooseMeals} title="Save" />
                    </VStack>
                </VStack>
            </PEModalPopUp>

            <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'flex-start' }}>
                    {MEALS.filter((_, index) => selectedMeals.includes(index)).map(({ title, description, imageUrl }, index) => (
                        <div key={index} className="w-full basis-[390px]">
                            <PEMealCard
                                onClick={(): void => handleUpdateSelectedMeals(index)}
                                title={title}
                                description={description}
                                imageUrl={imageUrl ?? undefined}
                            />
                        </div>
                    ))}
                    <div
                        onClick={(): void => setOpenPopUp(true)}
                        className="flex items-center w-[380px] h-[140px] border-orange border-[1px] border-solid hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition border-solid border-[1px] border-disabled justify-center rounded-4"
                    >
                        <VStack>
                            <PEIcon icon={Icon.plusOrange} />
                            <p className="my-2 text-orange text-text-sm">Add Dish</p>
                        </VStack>
                    </div>
                </HStack>
            </VStack>
        </VStack>
    );
}
