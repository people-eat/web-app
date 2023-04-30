import type { Meta, StoryObj } from '@storybook/react';
import PEMenuCard from './PEMenuCard';

const meta: Meta<typeof PEMenuCard> = {
    title: 'Cards/PEMenuCard',
    component: PEMenuCard,
};

export default meta;

export const Component: StoryObj<typeof PEMenuCard> = {
    args: {
        pricePerPerson: 12,
        kitchens: ['PEMenuCard', 'PEMealC', 'PEMenuCard'],
        categories: ['PEMenuCard', 'PEMealC', 'PEMenuCard'],
        description: 'PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard',
        title: 'PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMea',
        chefName: 'Loren',
    },
};
