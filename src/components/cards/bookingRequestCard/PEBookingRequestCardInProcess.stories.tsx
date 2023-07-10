import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';
import PEBookingRequestCardInProcess from './PEBookingRequestCardInProcess';

const meta: Meta<typeof PEBookingRequestCardInProcess> = {
    title: 'Cards/Booking Request/PEBookingRequestCardInProcess',
    component: PEBookingRequestCardInProcess,
};

export default meta;

export const Component: StoryObj<typeof PEBookingRequestCardInProcess> = {
    args: {
        title: 'Herdsmen',
        name: 'Brad',
        occasion: 'Birthday',
        price: '340$',
        participants: 8,
        address: 'Weierstrass 42',
        dateTime: moment(),
        createdAt: moment(),
        onOrderDetailsClick: (): void => undefined,
    },
};
