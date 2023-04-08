import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatChoice from './PeopleEatChoice';

const meta: Meta<typeof PeopleEatChoice> = {
    title: 'Standard Components/PeopleEatChoice',
    component: PeopleEatChoice,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatChoice> = {
    args: {
        title: 'Europäisch',
        onClose: () => alert('click'),
    },
};
