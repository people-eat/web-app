import type { Meta, StoryObj } from '@storybook/react';
import PEBookingRequestCardInProcess from './PEBookingRequestCardInProcess';

const meta: Meta<typeof PEBookingRequestCardInProcess> = {
    title: 'Cards/Booking Request/PEBookingRequestCardInProcess',
    component: PEBookingRequestCardInProcess,
};

export default meta;

export const Component: StoryObj<typeof PEBookingRequestCardInProcess> = {
    args: {
        menuName: 'Herdsmen',
        date: '9. April 2022, 12:20',
        onOrderDetailsClick: (): void => undefined,
        onAcceptAsSender: (): void => undefined,
        clientName: 'Brad',
        event: 'class: Bundestag',
        price: '340$',
        eventDate: '1. Jan 2023',
        persons: '8',
        time: '18:00',
        address: 'Weierstrass 42',
    },
};
