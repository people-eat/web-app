import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatCameraButton from './changePhotoButton';

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
