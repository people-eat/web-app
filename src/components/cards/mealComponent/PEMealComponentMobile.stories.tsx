import type { Meta, StoryObj } from '@storybook/react';
import PEMealComponentMobile from './PEMealComponentMobile';

const meta: Meta<typeof PEMealComponentMobile> = {
    title: 'Cards/PEMealComponentMobile',
    component: PEMealComponentMobile,
};

export default meta;

export const Component: StoryObj<typeof PEMealComponentMobile> = {
    args: {
        mealDescription: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard',
        mealTitle: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMea',
    },
};
