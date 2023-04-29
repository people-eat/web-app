import type { Meta, StoryObj } from '@storybook/react';
import PEMealCardMobile from './PEMealCardMobile';

const meta: Meta<typeof PEMealCardMobile> = {
    title: 'Cards/PEMealCardMobile',
    component: PEMealCardMobile,
};

export default meta;

export const Component: StoryObj<typeof PEMealCardMobile> = {
    args: {
        pricePerPerson: 12,
        menus: ['PEMealCard', 'PEMealC', 'PEMealCard'],
        categories: ['PEMealCard', 'PEMealC', 'PEMealCard'],
        mealDescription: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard',
        mealTitle: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMea',
    },
};
