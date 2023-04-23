import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatIconButton from './PeopleEatIconButton';

const meta: Meta<typeof PeopleEatIconButton> = {
    title: 'Standard Components/PeopleEatIconButton',
    component: PeopleEatIconButton,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatIconButton> = {
    args: {
        onClick: undefined,
    },
};
