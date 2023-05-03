import type { Meta, StoryObj } from '@storybook/react';
import PEFooter from './PEFooter';

const meta: Meta<typeof PEFooter> = {
    title: 'Standard Components/PEFooter',
    component: PEFooter,
};

export default meta;

export const Component: StoryObj<typeof PEFooter> = {
    args: {},
};
