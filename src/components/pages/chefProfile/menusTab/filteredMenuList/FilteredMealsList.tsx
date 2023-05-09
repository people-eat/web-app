import { type ReactElement } from 'react';
import PEMealCard from '../../../../cards/mealCard/PEMealCard';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';
import { type MealEntity } from '../ChefProfilePageMenusTab';

export interface FilteredMenuListProps {
    meals: MealEntity[];
    clickOnMeal: (value: string) => void;
    show: boolean;
    openPopUp: () => void;
}

export default function FilteredMealsList({ meals, show = true, clickOnMeal, openPopUp }: FilteredMenuListProps): ReactElement {
    return (
        <HStack className="w-full flex-wrap gap-4" style={{ justifyContent: 'flex-start' }}>
            {show && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {meals.map(({ title, description, imageUrl, mealId }) => (
                        <div key={mealId} className="w-full basis-[390px]">
                            <PEMealCard
                                onClick={(): void => clickOnMeal(mealId)}
                                title={title}
                                description={description}
                                imageUrl={imageUrl ?? undefined}
                            />
                        </div>
                    ))}
                    <div
                        onClick={openPopUp}
                        className="flex items-center w-[380px] h-[140px] border-orange border-[1px] border-solid hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition border-solid border-[1px] border-disabled justify-center rounded-4"
                    >
                        <VStack>
                            <PEIcon icon={Icon.plusOrange} />
                            <p className="my-2 text-orange text-text-sm">Add Dish</p>
                        </VStack>
                    </div>
                </HStack>
            )}
        </HStack>
    );
}
