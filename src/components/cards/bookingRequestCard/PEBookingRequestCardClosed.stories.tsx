import type { Meta, StoryObj } from '@storybook/react';
import PEBookingRequestCardClosed from './PEBookingRequestCardClosed';

const meta: Meta<typeof PEBookingRequestCardClosed> = {
    title: 'Cards/Booking Request/PEBookingRequestCardClosed',
    component: PEBookingRequestCardClosed,
};

export default meta;

export const Component: StoryObj<typeof PEBookingRequestCardClosed> = {
    args: {
        menuName: 'Herdsmen',
        date: '9. April 2022, 12:20',
        onOrderDetailsClick: (): void => undefined,
        onShowReviewClick: (): void => undefined,
        clientName: 'Brad',
        event: 'class: Bundestag',
        price: '340$',
        eventDate: '1. Jan 2023',
        persons: 8,
        time: '18:00',
        address: 'Weierstrass 42',
    },
};
