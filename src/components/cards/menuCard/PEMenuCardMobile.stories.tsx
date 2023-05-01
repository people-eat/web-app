import type { Meta, StoryObj } from '@storybook/react';
import PEMenuCardMobile from './PEMenuCardMobile';

const meta: Meta<typeof PEMenuCardMobile> = {
    title: 'Cards/PEMenuCardMobile',
    component: PEMenuCardMobile,
};

export default meta;

export const Component: StoryObj<typeof PEMenuCardMobile> = {
    args: {
        pricePerPerson: 12,
        kitchens: ['kitchen-1', 'kitchen-2', 'kitchen-3'],
        categories: ['category-1', 'category-2', 'category-3'],
        description: 'Menu description',
        title: 'Menu title',
        chefName: 'Loren',
    },
};
