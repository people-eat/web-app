import type { Meta, StoryObj } from '@storybook/react';
import { type GetUserProfileBookingsPageDataQuery } from '../../../data-source/generated/graphql';
import { type Unpacked } from '../../../shared-domain/util-types';
import { BookingRequestCard } from './BookingRequestCard';

const meta: Meta<typeof BookingRequestCard> = {
    title: 'Cards/BookingRequestCard',
    component: BookingRequestCard,
};

export default meta;

const bookingRequest: Unpacked<NonNullable<GetUserProfileBookingsPageDataQuery['users']['bookingRequests']['findMany']>> = {
    bookingRequestId: '',
    globalBookingRequestId: '',
    adultParticipants: 4,
    children: 1,
    dateTime: new Date(),
    status: 'OPEN',
    userAccepted: true,
    cookAccepted: false,
    kitchenId: null,
    occasion: 'Birthday',
    preparationTime: 120,
    duration: 120,
    createdAt: new Date(),
    price: { amount: 12345, currencyCode: 'EUR' },
    location: { latitude: 49, longitude: 8, text: 'Mannheim' },
    cook: {
        cookId: '',
        rank: 'HOBBY',
        user: { firstName: 'Maximilian', profilePictureUrl: null },
    },
    configuredMenu: { title: 'Candle Light Dinner' },
};

export const Primary: StoryObj<typeof BookingRequestCard> = {
    args: {
        bookingRequest,
        isSelected: false,
        showDividerAtEnd: true,
    },
};
