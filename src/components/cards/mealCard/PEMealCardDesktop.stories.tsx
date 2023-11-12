import type { Meta, StoryObj } from '@storybook/react';
import PEMealCardDesktop from './PEMealCardDesktop';

const meta: Meta<typeof PEMealCardDesktop> = {
    title: 'Cards/Meal/PEMealCardDesktop',
    component: PEMealCardDesktop,
};

export default meta;

export const Component: StoryObj<typeof PEMealCardDesktop> = {
    args: {
        title: 'Meal title',
        description: 'Meal description',
        imageUrl: undefined,
        onClick: undefined,
    },
};
