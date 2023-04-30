import type { Meta, StoryObj } from '@storybook/react';
import PEMealComponent from './PEMealComponent';

const meta: Meta<typeof PEMealComponent> = {
    title: 'Cards/PEMealComponent',
    component: PEMealComponent,
};

export default meta;

export const Component: StoryObj<typeof PEMealComponent> = {
    args: {
        description: 'PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard',
        title: 'PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMea',
    },
};
