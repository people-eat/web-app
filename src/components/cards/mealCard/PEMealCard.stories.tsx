import type { Meta, StoryObj } from '@storybook/react';
import PEMealCard from './PEMealCard';

const meta: Meta<typeof PEMealCard> = {
    title: 'Cards/PEMealCard',
    component: PEMealCard,
};

export default meta;

export const Component: StoryObj<typeof PEMealCard> = {
    args: {
        pricePerPerson: 12,
        menus: ['PEMealCard', 'PEMealC', 'PEMealCard'],
        categories: ['PEMealCard', 'PEMealC', 'PEMealCard'],
        description: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard',
        title: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMea',
    },
};
