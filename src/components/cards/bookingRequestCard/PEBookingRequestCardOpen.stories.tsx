import type { Meta, StoryObj } from '@storybook/react';
import PEBookingRequestCardOpen from './PEBookingRequestCardOpen';

const meta: Meta<typeof PEBookingRequestCardOpen> = {
    title: 'Cards/Booking Request/PEBookingRequestCardOpen',
    component: PEBookingRequestCardOpen,
};

export default meta;

export const Component: StoryObj<typeof PEBookingRequestCardOpen> = {
    args: {
        menuName: 'Herdsmen',
        date: '9. April 2022, 12:20',
        onOrderDetailsClick: (): void => undefined,
        onDeclineClick: (): void => undefined,
        onAcceptClick: (): void => undefined,
        clientName: 'Brad',
        event: 'class: Bundestag',
        price: '340$',
        eventDate: '1. Jan 2023',
        participants: 8,
        time: '18:00',
        address: 'Weierstrass 42',
    },
};
