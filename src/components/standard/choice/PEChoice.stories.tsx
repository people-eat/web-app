import type { Meta, StoryObj } from '@storybook/react';
import PEChoice from './PEChoice';

const meta: Meta<typeof PEChoice> = {
    title: 'Standard Components/PEChoice',
    component: PEChoice,
};

export default meta;

export const Component: StoryObj<typeof PEChoice> = {
    args: {
        title: 'European',
        onClose: undefined,
    },
};
