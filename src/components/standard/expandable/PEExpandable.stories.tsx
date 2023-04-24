import type { Meta, StoryObj } from '@storybook/react';
import PEExpandable from './PEExpandable';

const meta: Meta<typeof PEExpandable> = {
    title: 'Standard Components/PEExpandable',
    component: PEExpandable,
};

export default meta;

export const Component: StoryObj<typeof PEExpandable> = {
    args: {},
};
