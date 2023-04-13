import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatAddress from './PeopleEatAddress';

const meta: Meta<typeof PeopleEatAddress> = {
    title: 'Standard Components/PeopleEatAddress',
    component: PeopleEatAddress,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatAddress> = {
    args: {},
};
