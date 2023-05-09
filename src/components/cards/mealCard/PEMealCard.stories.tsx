import type { Meta, StoryObj } from '@storybook/react';
import PEMealCard from './PEMealCard';

const meta: Meta<typeof PEMealCard> = {
    title: 'Cards/Meal/PEMealCard',
    component: PEMealCard,
};

export default meta;

export const Component: StoryObj<typeof PEMealCard> = {
    args: {
        title: 'Meal title',
        description: 'Meal description',
        imageUrl: undefined,
        onClick: undefined,
    },
};
