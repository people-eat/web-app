import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatNextButton from './PeopleEatNextButton';

const meta: Meta<typeof PeopleEatNextButton> = {
    title: 'Standard Components/PeopleEatNextButton',
    component: PeopleEatNextButton,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatNextButton> = {
    args: {},
};
