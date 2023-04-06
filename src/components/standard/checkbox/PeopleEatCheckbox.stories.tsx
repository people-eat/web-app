import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatCheckbox from './PeopleEatCheckbox';

const meta: Meta<typeof PeopleEatCheckbox> = {
    title: 'Standard Components/PeopleEatCheckbox',
    component: PeopleEatCheckbox,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatCheckbox> = {
    args: {},
};
