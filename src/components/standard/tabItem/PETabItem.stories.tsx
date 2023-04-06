import type { Meta, StoryObj } from '@storybook/react';
import PETabItem from './PETabItem';

const meta: Meta<typeof PETabItem> = {
    title: 'Standard Components/PETabItem',
    component: PETabItem,
};

export default meta;

export const Component: StoryObj<typeof PETabItem> = {
    args: {
        title: 'European',
    },
};

export const ActiveComponent: StoryObj<typeof PETabItem> = {
    args: {
        active: true,
        title: 'European',
    },
};
