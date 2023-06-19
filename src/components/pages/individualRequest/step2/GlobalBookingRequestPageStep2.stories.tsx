/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import GlobalBookingRequestPageStep2 from './GlobalBookingRequestPageStep2';

const meta: Meta<typeof GlobalBookingRequestPageStep2> = {
    title: 'Global Booking Request Page/Step 2',
    component: GlobalBookingRequestPageStep2,
    render: () => {
        const categories: { categoryId: string; title: string }[] = [
            { categoryId: 'A', title: 'category 1' },
            { categoryId: 'B', title: 'category 2' },
            { categoryId: 'C', title: 'category 3' },
            { categoryId: 'D', title: 'category 4' },
        ];
        const allergies: { allergyId: string; title: string }[] = [
            { allergyId: 'A', title: 'allergy 1' },
            { allergyId: 'B', title: 'allergy 2' },
            { allergyId: 'C', title: 'allergy 3' },
            { allergyId: 'D', title: 'allergy 4' },
        ];
        const kitchens: { kitchenId: string; title: string }[] = [
            { kitchenId: 'A', title: 'kitchen 1' },
            { kitchenId: 'B', title: 'kitchen 2' },
            { kitchenId: 'C', title: 'kitchen 3' },
            { kitchenId: 'D', title: 'kitchen 4' },
        ];

        return (
            <GlobalBookingRequestPageStep2
                categories={categories}
                selectedCategories={[]}
                setSelectedCategories={(): void => undefined}
                kitchens={kitchens}
                selectedKitchen={undefined}
                setSelectedKitchen={(): void => undefined}
                allergies={allergies}
                selectedAllergies={[]}
                setSelectedAllergies={(): void => undefined}
                // eslint-disable-next-line no-alert
                onContinue={(): void => alert('Continue')}
            />
        );
    },
};

export default meta;

export const Component: StoryObj<typeof GlobalBookingRequestPageStep2> = {};
