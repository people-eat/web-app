import type { Meta, StoryObj } from '@storybook/react';
import PEDropdown from './PEDropdown';

const meta: Meta<typeof PEDropdown> = {
    title: 'Standard Components/PEDropdown',
    component: PEDropdown,
};

export default meta;

export const Component: StoryObj<typeof PEDropdown> = {
    args: {
        items: ['Option a', 'Option b', 'Option c'],
    },
};
