import { Divider, ListItemButton } from '@mui/material';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import { type GetUserProfileBookingsPageDataQuery } from '../../../data-source/generated/graphql';
import { type Unpacked } from '../../../shared-domain/util-types';
import BookingRequestStatusPill from '../../standard/bookingRequestStatusPill/BookingRequestStatusPill';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface GlobalBookingRequestCardProps {
    globalBookingRequest: Unpacked<NonNullable<GetUserProfileBookingsPageDataQuery['users']['globalBookingRequests']['findMany']>>;
    isSelected?: boolean;
    onClick?: () => void;
}

export function GlobalBookingRequestCard({ globalBookingRequest, isSelected, onClick }: GlobalBookingRequestCardProps): ReactElement {
    const { t } = useTranslation('global-booking-request');

    return (
        <>
            <ListItemButton selected={isSelected} onClick={onClick}>
                <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start' }}>
                    <HStack className="w-full">
                        <BookingRequestStatusPill status="OPEN" />

                        <Spacer />

                        <span className="text-green">{globalBookingRequest.priceClass.type}</span>
                    </HStack>

                    <span className="text-heading-ss-bold md:text-text-sm-bold">{globalBookingRequest.occasion}</span>

                    <HStack gap={16} className="text-gray">
                        {moment(globalBookingRequest.dateTime).format('L')}
                        <Divider orientation="vertical" flexItem style={{ display: 'inline' }} />
                        {moment(globalBookingRequest.dateTime).format('LT')}
                    </HStack>

                    <HStack gap={16} style={{ alignItems: 'center' }} className="w-full">
                        <span>Globale Anfrage</span>
                        <Spacer />
                        in {moment(globalBookingRequest.dateTime).diff(moment(), 'days')} {t('days')}
                    </HStack>
                </VStack>
            </ListItemButton>

            <Divider />
        </>
    );
}
