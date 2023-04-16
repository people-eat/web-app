import type { Meta, StoryObj } from '@storybook/react';
import PECreditCard from './PECreditCard';

const meta: Meta<typeof PECreditCard> = {
    title: 'Standard Components/PECreditCard',
    component: PECreditCard,
};

export default meta;

export const Component: StoryObj<typeof PECreditCard> = {
    args: {},
};
