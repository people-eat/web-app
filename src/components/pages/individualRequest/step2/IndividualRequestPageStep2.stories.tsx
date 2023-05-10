/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import IndividualRequestPageStep2 from './IndividualRequestPageStep2';

const meta: Meta<typeof IndividualRequestPageStep2> = {
    title: 'Individual Request Page/Step 2',
    component: IndividualRequestPageStep2,
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
            <IndividualRequestPageStep2
                categories={categories}
                onSelectCategoryId={(): void => undefined}
                allergies={allergies}
                onSelectAllergyId={(): void => undefined}
                kitchens={kitchens}
                onSelectKitchenId={(): void => undefined}
                // eslint-disable-next-line no-alert
                onContinue={(): void => alert('Continue')}
            />
        );
    },
};

export default meta;

export const Component: StoryObj<typeof IndividualRequestPageStep2> = {};
