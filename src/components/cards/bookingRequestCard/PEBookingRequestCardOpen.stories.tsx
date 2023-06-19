import type { Meta, StoryObj } from '@storybook/react';
import moment from 'moment';
import PEBookingRequestCardOpen from './PEBookingRequestCardOpen';

const meta: Meta<typeof PEBookingRequestCardOpen> = {
    title: 'Cards/Booking Request/PEBookingRequestCardOpen',
    component: PEBookingRequestCardOpen,
};

export default meta;

export const Component: StoryObj<typeof PEBookingRequestCardOpen> = {
    args: {
        title: 'Herdsmen',
        name: 'Brad',
        profilePictureUrl: undefined,
        occasion: 'class: Bundestag',
        price: '340$',
        participants: 8,
        address: 'Weierstrass 42',
        dateTime: moment(),
        createdAt: moment(),
        onOrderDetailsClick: (): void => undefined,
        onDeclineClick: (): void => undefined,
        onAcceptClick: (): void => undefined,
    },
};
