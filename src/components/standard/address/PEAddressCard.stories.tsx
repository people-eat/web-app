import type { Meta, StoryObj } from '@storybook/react';
import PEAddressCard from './PEAddressCard';

const meta: Meta<typeof PEAddressCard> = {
    title: 'Standard Components/PEAddressCard',
    component: PEAddressCard,
};

export default meta;

export const Component: StoryObj<typeof PEAddressCard> = {
    args: {},
};
