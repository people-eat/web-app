import type { Meta, StoryObj } from '@storybook/react';
import PENextButton from './PENextButton';

const meta: Meta<typeof PENextButton> = {
    title: 'Standard Components/PENextButton',
    component: PENextButton,
};

export default meta;

export const Component: StoryObj<typeof PENextButton> = {
    args: {},
};
