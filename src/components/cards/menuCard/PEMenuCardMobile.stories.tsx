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
        kitchens: ['PEMenuCard', 'PEMealC', 'PEMenuCard'],
        categories: ['PEMenuCard', 'PEMealC', 'PEMenuCard'],
        description: 'PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard',
        title: 'PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMea',
        chefName: 'Loren',
    },
};
