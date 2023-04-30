import type { Meta, StoryObj } from '@storybook/react';
import PEMealComponentMobile from './PEMealComponentMobile';

const meta: Meta<typeof PEMealComponentMobile> = {
    title: 'Cards/PEMealComponentMobile',
    component: PEMealComponentMobile,
};

export default meta;

export const Component: StoryObj<typeof PEMealComponentMobile> = {
    args: {
        description: 'PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard',
        title: 'PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMenuCard PEMea',
    },
};
