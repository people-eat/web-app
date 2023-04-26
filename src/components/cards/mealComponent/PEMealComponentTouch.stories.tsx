import type { Meta, StoryObj } from '@storybook/react';
import PEMealComponentTouch from './PEMealComponentTouch';

const meta: Meta<typeof PEMealComponentTouch> = {
    title: 'Cards/PEMealComponentTouch',
    component: PEMealComponentTouch,
};

export default meta;

export const Component: StoryObj<typeof PEMealComponentTouch> = {
    args: {
        mealDescription: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard',
        mealTitle: 'PEMealCard PEMealCard PEMealCard PEMealCard PEMealCard PEMea',
    },
};
