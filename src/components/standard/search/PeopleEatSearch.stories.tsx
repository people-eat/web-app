import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatSearch from './PeopleEatSearch';

const meta: Meta<typeof PeopleEatSearch> = {
    title: 'Standard Components/PeopleEatSearch',
    component: PeopleEatSearch,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatSearch> = {
    args: {},
};
