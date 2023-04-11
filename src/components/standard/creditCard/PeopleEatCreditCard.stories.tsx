import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatCreditCard from './PeopleEatCreditCard';

const meta: Meta<typeof PeopleEatCreditCard> = {
    title: 'Standard Components/PeopleEatCreditCard',
    component: PeopleEatCreditCard,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatCreditCard> = {
    args: {},
};
