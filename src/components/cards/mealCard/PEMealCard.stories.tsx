import type { Meta, StoryObj } from '@storybook/react';
import PEMealCard from './PEMealCard';

const meta: Meta<typeof PEMealCard> = {
    title: 'Cards/PEMealCard',
    component: PEMealCard,
};

export default meta;

export const Component: StoryObj<typeof PEMealCard> = {
    args: {
        description: 'Meal description',
        title: 'Meal title',
    },
};
