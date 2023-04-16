import type { Meta, StoryObj } from '@storybook/react';
import PEIconButton from './PEIconButton';

const meta: Meta<typeof PEIconButton> = {
    title: 'Standard Components/PEIconButton',
    component: PEIconButton,
};

export default meta;

export const Component: StoryObj<typeof PEIconButton> = {
    args: {
        onClick: undefined,
    },
};
