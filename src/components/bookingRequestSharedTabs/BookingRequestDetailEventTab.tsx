import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import { Icon } from '../standard/icon/Icon';
import PEIcon from '../standard/icon/PEIcon';
import PETextField from '../standard/textFields/PETextField';
import HStack from '../utility/hStack/HStack';
import Spacer from '../utility/spacer/Spacer';
import VStack from '../utility/vStack/VStack';

export interface BookingRequestDetailEventTabProps {
    bookingRequest: {
        occasion: string;
        adultParticipants: number;
        children: number;
        dateTime: Date;
        location: {
            text: string;
        };
    };
}

export function BookingRequestDetailEventTab({ bookingRequest }: BookingRequestDetailEventTabProps): ReactElement {
    const { t: translateGlobalBookingRequest } = useTranslation('global-booking-request');

    return (
        <VStack className="box-border p-4 md:p-0" gap={32} style={{ maxHeight: 675, overflowY: 'auto' }}>
            <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                <span className="text-text-m-bold">{translateGlobalBookingRequest('participants-label')}</span>
                <HStack gap={16} className="w-full">
                    <PEIcon icon={Icon.users} /> <span>{translateGlobalBookingRequest('adults-label')}</span> <Spacer />{' '}
                    {bookingRequest.adultParticipants}
                </HStack>
                <HStack gap={16} className="w-full">
                    <PEIcon icon={Icon.users} /> <span>{translateGlobalBookingRequest('children-label')}</span> <Spacer />{' '}
                    {bookingRequest.children}
                </HStack>
            </VStack>
            <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                <span className="text-text-m-bold">{translateGlobalBookingRequest('event-details-label')}</span>
                <HStack gap={16}>
                    <PETextField value={moment(bookingRequest.dateTime).format('L')} onChange={(): void => undefined} type="text" />
                    <PETextField value={moment(bookingRequest.dateTime).format('LT')} onChange={(): void => undefined} type="text" />
                    <PETextField value={bookingRequest.occasion} onChange={(): void => undefined} type="text" />
                </HStack>
                <PETextField value={bookingRequest.location.text} onChange={(): void => undefined} type="text" />
            </VStack>
            <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                <span className="text-text-m-bold">{translateGlobalBookingRequest('categories-label')}</span>
                <PETextField value="" onChange={(): void => undefined} type="text" />
            </VStack>
            <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                <span className="text-text-m-bold">{translateGlobalBookingRequest('kitchen-label')}</span>
                <PETextField value="" onChange={(): void => undefined} type="text" />
            </VStack>
            <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                <span className="text-text-m-bold">{translateGlobalBookingRequest('allergies-label')}</span>
                <PETextField value="" onChange={(): void => undefined} type="text" />
            </VStack>
        </VStack>
    );
}
