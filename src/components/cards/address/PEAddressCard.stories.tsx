import type { Meta, StoryObj } from '@storybook/react';
import PEAddressCard from './PEAddressCard';

const meta: Meta<typeof PEAddressCard> = {
    title: 'Cards/PEAddressCard',
    component: PEAddressCard,
};

export default meta;

export const Component: StoryObj<typeof PEAddressCard> = {
    args: {
        title: 'My Home',
        address: '123456 Town, City Name house number',
    },
};
