import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatInput from './PeopleEatInput';

const meta: Meta<typeof PeopleEatInput> = {
    title: 'Standard Components/PeopleEatInput',
    component: PeopleEatInput,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatInput> = {
    args: {},
};
