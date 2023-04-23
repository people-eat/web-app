import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatDropdown from './PeopleEatDropdown';

const meta: Meta<typeof PeopleEatDropdown> = {
    title: 'Standard Components/PeopleEatDropdown',
    component: PeopleEatDropdown,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatDropdown> = {
    args: {},
};
