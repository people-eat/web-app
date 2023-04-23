import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatDatePicker from './PeopleEatDatePicker';

const meta: Meta<typeof PeopleEatDatePicker> = {
    title: 'Standard Components/PeopleEatDatePicker',
    component: PeopleEatDatePicker,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatDatePicker> = {
    args: {},
};
