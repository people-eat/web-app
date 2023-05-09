import Image from 'next/image';
import { type ReactElement } from 'react';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';
import { type MealEntity } from '../ChefProfilePageMenusTab';

export interface ChefProfilePageCreateMenusPreviewStep2Props {
    selectedMeals: MealEntity[];
}

export default function ChefProfilePageCreateMenusPreviewStep2({
    selectedMeals,
}: ChefProfilePageCreateMenusPreviewStep2Props): ReactElement {
    return (
        <VStack className="w-full gap-6" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <HStack className="w-full gap-4" style={{ justifyContent: 'flex-start' }}>
                {selectedMeals.map((meal, index) => (
                    <div
                        key={index}
                        className="flex items-center w-[200px] h-[200px] hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition border-solid border-[1px] border-disabled justify-center rounded-4"
                    >
                        <Image
                            className="w-[200px] h-[200px]"
                            height={200}
                            width={200}
                            src={meal.imageUrl ?? ''}
                            alt={meal.imageUrl ?? ''}
                        />
                    </div>
                ))}
            </HStack>
        </VStack>
    );
}
