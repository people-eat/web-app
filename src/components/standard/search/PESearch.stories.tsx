import type { Meta, StoryObj } from '@storybook/react';
import PESearch from './PESearch';

const meta: Meta<typeof PESearch> = {
    title: 'Standard Components/PESearch',
    component: PESearch,
};

export default meta;

export const Component: StoryObj<typeof PESearch> = {
    args: {},
};
