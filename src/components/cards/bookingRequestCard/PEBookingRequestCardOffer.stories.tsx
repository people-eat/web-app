import type { Meta, StoryObj } from '@storybook/react';
import PEBookingRequestCardOffer from './PEBookingRequestCardOffer';

const meta: Meta<typeof PEBookingRequestCardOffer> = {
    title: 'Cards/PEBookingRequestCardOffer',
    component: PEBookingRequestCardOffer,
};

export default meta;

export const Component: StoryObj<typeof PEBookingRequestCardOffer> = {
    args: {
        menuName: 'Herdsmen',
        date: '9. April 2022, 12:20',
        onOrderDetailsClick: (): void => undefined,
        clientName: 'Bernd',
        event: 'class: Bundestag',
        price: '340$',
        eventDate: '1. Jan 2023',
        persons: '8',
        time: '18:00',
        address: 'Weierstrass 42',
    },
};
