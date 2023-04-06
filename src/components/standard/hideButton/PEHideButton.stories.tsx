import type { Meta, StoryObj } from '@storybook/react';
import PEHideButton from './PEHideButton';

const meta: Meta<typeof PEHideButton> = {
    title: 'Standard Components/PEHideButton',
    component: PEHideButton,
};

export default meta;

export const Component: StoryObj<typeof PEHideButton> = {
    args: {},
};
