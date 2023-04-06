import type { Meta, StoryObj } from '@storybook/react';
import PECounter from './PECounter';

const meta: Meta<typeof PECounter> = {
    title: 'Standard Components/PECounter',
    component: PECounter,
};

export default meta;

export const Component: StoryObj<typeof PECounter> = {
    args: {
        value: 12,
    },
};
