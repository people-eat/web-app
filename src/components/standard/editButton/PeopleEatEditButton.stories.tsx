import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatEditButton from './PeopleEatEditButton';

const meta: Meta<typeof PeopleEatEditButton> = {
    title: 'Standard Components/PeopleEatEditButton',
    component: PeopleEatEditButton,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatEditButton> = {
    args: {
        onClick: () => 'click',
    },
};
