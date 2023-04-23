import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatFAQ from './PeopleEatFAQ';

const meta: Meta<typeof PeopleEatFAQ> = {
    title: 'Standard Components/PeopleEatFAQ',
    component: PeopleEatFAQ,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatFAQ> = {
    args: {},
};
