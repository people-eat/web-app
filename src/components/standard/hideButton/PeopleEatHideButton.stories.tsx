import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatHideButton from './PeopleEatHideButton';

const meta: Meta<typeof PeopleEatHideButton> = {
    title: 'Standard Components/PeopleEatHideButton',
    component: PeopleEatHideButton,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatHideButton> = {
    args: {},
};
