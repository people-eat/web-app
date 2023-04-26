import type { Meta, StoryObj } from '@storybook/react';
import PEHeader from './PEHeader';

const meta: Meta<typeof PEHeader> = {
    title: 'Standard Components/PEHeader',
    component: PEHeader,
};

export default meta;

export const Component: StoryObj<typeof PEHeader> = {
    args: {},
};
