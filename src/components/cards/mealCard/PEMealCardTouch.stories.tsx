import type { Meta, StoryObj } from '@storybook/react';
import PEMealCardTouch from './PEMealCardTouch';

const meta: Meta<typeof PEMealCardTouch> = {
    title: 'Cards/PEMealCardTouch',
    component: PEMealCardTouch,
};

export default meta;

export const Component: StoryObj<typeof PEMealCardTouch> = {
    args: {
        pricePerPerson: 12,
        menus: ['PEMealCard', 'PEMealC', 'PEMealCard'],
        categories: ['PEMealCard', 'PEMealC', 'PEMealCard'],
        mealDescription: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard',
        mealTitle: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMea',
    },
};
