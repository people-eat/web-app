import type { Meta, StoryObj } from '@storybook/react';
import PEMealCardMobile from './PEMealCardMobile';

const meta: Meta<typeof PEMealCardMobile> = {
    title: 'Cards/Meal/PEMealCardMobile',
    component: PEMealCardMobile,
};

export default meta;

export const Component: StoryObj<typeof PEMealCardMobile> = {
    args: {
        title: 'Meal title',
        description: 'Meal description',
        imageUrl: undefined,
        onClick: undefined,
    },
};
