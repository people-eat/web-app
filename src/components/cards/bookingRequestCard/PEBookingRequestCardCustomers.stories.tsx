import type { Meta, StoryObj } from '@storybook/react';
import PEBookingRequestCardCustomers from './PEBookingRequestCardCustomers';

const meta: Meta<typeof PEBookingRequestCardCustomers> = {
    title: 'Cards/Booking Request/PEBookingRequestCardCustomers',
    component: PEBookingRequestCardCustomers,
};

export default meta;

export const Component: StoryObj<typeof PEBookingRequestCardCustomers> = {
    args: {
        menuName: 'Herdsmen',
        date: '9. April 2022, 12:20',
        onOrderDetailsClick: (): void => undefined,
        onCustomersButtonClick: (): void => undefined,
        clientName: 'Brad',
        event: 'class: Bundestag',
        price: '340$',
        eventDate: '1. Jan 2023',
        persons: 8,
        time: '18:00',
        address: 'Weierstrass 42',
    },
};
