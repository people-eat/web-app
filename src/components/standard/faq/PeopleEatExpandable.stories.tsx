import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatExpandable from './PeopleEatExpandable';

const meta: Meta<typeof PeopleEatExpandable> = {
    title: 'Standard Components/PeopleEatExpandable',
    component: PeopleEatExpandable,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatExpandable> = {
    args: {},
};
