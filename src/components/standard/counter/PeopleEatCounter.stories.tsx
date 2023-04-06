import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatCounter from './PeopleEatCounter';

const meta: Meta<typeof PeopleEatCounter> = {
    title: 'Standard Components/PeopleEatCounter',
    component: PeopleEatCounter,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatCounter> = {
    args: {},
};
