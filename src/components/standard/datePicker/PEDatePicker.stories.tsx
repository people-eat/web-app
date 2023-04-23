import type { Meta, StoryObj } from '@storybook/react';
import PEDatePicker from './PEDatePicker';

const meta: Meta<typeof PEDatePicker> = {
    title: 'Standard Components/PEDatePicker',
    component: PEDatePicker,
};

export default meta;

export const Component: StoryObj<typeof PEDatePicker> = {
    args: {},
};
