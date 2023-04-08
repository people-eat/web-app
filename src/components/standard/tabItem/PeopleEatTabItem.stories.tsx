import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatTabItem from './PeopleEatTabItem';

const meta: Meta<typeof PeopleEatTabItem> = {
    title: 'Standard Components/PeopleEatTabItem',
    component: PeopleEatTabItem,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatTabItem> = {
    args: {
        title: 'Europäisch',
    },
};

export const ActiveComponent: StoryObj<typeof PeopleEatTabItem> = {
    args: {
        active: true,
        title: 'Europäisch',
    },
};
