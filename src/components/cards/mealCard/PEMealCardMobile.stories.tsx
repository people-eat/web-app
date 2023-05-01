import type { Meta, StoryObj } from '@storybook/react';
import PEMealCardMobile from './PEMealCardMobile';

const meta: Meta<typeof PEMealCardMobile> = {
    title: 'Cards/PEMealCardMobile',
    component: PEMealCardMobile,
};

export default meta;

export const Component: StoryObj<typeof PEMealCardMobile> = {
    args: {
        description: 'Meal description',
        title: 'Meal title',
    },
};
