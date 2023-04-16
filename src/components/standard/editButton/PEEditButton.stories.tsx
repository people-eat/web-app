import type { Meta, StoryObj } from '@storybook/react';
import PEEditButton from './PEEditButton';

const meta: Meta<typeof PEEditButton> = {
    title: 'Standard Components/PEEditButton',
    component: PEEditButton,
};

export default meta;

export const Component: StoryObj<typeof PEEditButton> = {
    args: {
        onClick: () => 'click',
    },
};
