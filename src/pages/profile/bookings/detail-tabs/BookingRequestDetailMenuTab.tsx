import { type ReactElement } from 'react';
import PEMealCardDesktop from '../../../../components/cards/mealCard/PEMealCardDesktop';
import VStack from '../../../../components/utility/vStack/VStack';
import { type ConfiguredMenuFragment } from '../../../../data-source/generated/graphql';

export interface BookingRequestDetailMenuTabProps {
    configuredMenu: ConfiguredMenuFragment;
}

export default function BookingRequestDetailMenuTab({ configuredMenu }: BookingRequestDetailMenuTabProps): ReactElement {
    return (
        <VStack gap={32} style={{ alignItems: 'flex-start', width: '100%' }}>
            <span className="text-heading-m">{configuredMenu.title}</span>
            <VStack gap={32} style={{ flex: 1, alignItems: 'flex-start' }}>
                {configuredMenu.courses.map((course) => (
                    <VStack gap={16} key={course.index} className="w-full" style={{ alignItems: 'flex-start' }}>
                        <span className="text-heading-s">{course.title}</span>

                        <PEMealCardDesktop
                            title={course.mealTitle}
                            description={course.mealDescription}
                            imageUrl={course.mealImageUrl ?? undefined}
                            displayOnly
                        />
                    </VStack>
                ))}
            </VStack>
        </VStack>
    );
}
