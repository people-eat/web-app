import type { Meta, StoryObj } from '@storybook/react';
import PECheckbox from './PECheckbox';

const meta: Meta<typeof PECheckbox> = {
    title: 'Standard Components/PECheckbox',
    component: PECheckbox,
};

export default meta;

export const Component: StoryObj<typeof PECheckbox> = {
    args: {
        checked: true,
    },
};
