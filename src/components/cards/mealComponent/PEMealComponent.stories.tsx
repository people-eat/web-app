import type { Meta, StoryObj } from '@storybook/react';
import PEMealComponent from './PEMealComponent';

const meta: Meta<typeof PEMealComponent> = {
    title: 'Cards/PEMealComponent',
    component: PEMealComponent,
};

export default meta;

export const Component: StoryObj<typeof PEMealComponent> = {
    args: {
        mealDescription: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard',
        mealTitle: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMea',
    },
};
