import { type ReactElement } from 'react';
import HStack from '../../../../utility/hStack/HStack';
import { type MealEntity } from '../ChefProfilePageMenusTab';
// import { MEALS_CARD_COUNT } from '../createMenuStep2/ChefProfilePageCreateMenuStep2';

export interface FilteredMealsListWithMealFilterProps {
    meals: MealEntity[];
    selectedMeals: string[];
    clickOnMeal: (value: string) => void;
    show: boolean;
    activeIndex: number;
}

export default function FilteredMealsListWithMealFilter({ meals: _meals }: FilteredMealsListWithMealFilterProps): ReactElement {
    return (
        <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'flex-start' }}>
            {/* {show && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {meals.map(({ title, description, imageUrl, mealId }, index) => (
                        <>
                            {index >= activeIndex * MEALS_CARD_COUNT && index < (activeIndex + 1) * MEALS_CARD_COUNT && (
                                <div key={index} className="w-full basis-[380px]">
                                    <PEMealCard
                                        active={selectedMeals.includes(mealId)}
                                        onClick={(): void => clickOnMeal(mealId)}
                                        title={title}
                                        description={description}
                                        imageUrl={imageUrl ?? undefined}
                                    />
                                </div>
                            )}
                        </>
                    ))}
                </HStack>
            )} */}
        </HStack>
    );
}
