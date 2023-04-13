import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatCameraButton from './PeopleEatCameraButton';

const meta: Meta<typeof PeopleEatCameraButton> = {
    title: 'Standard Components/PeopleEatCameraButton',
    component: PeopleEatCameraButton,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatCameraButton> = {
    args: {
        onClick: () => 'click',
    },
};
