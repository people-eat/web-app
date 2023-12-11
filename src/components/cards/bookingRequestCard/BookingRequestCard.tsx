import { Divider, ListItemButton } from '@mui/material';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { type ReactElement } from 'react';
import { type GetUserProfileBookingsPageDataQuery } from '../../../data-source/generated/graphql';
import { formatPrice } from '../../../shared-domain/formatPrice';
import { type Unpacked } from '../../../shared-domain/util-types';
import BookingRequestStatusPill from '../../standard/bookingRequestStatusPill/BookingRequestStatusPill';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface BookingRequestCardProps {
    bookingRequest: Unpacked<NonNullable<GetUserProfileBookingsPageDataQuery['users']['bookingRequests']['findMany']>>;
    isSelected?: boolean;
    showDividerAtEnd?: boolean;
    onClick?: () => void;
}

export function BookingRequestCard({ bookingRequest, isSelected, showDividerAtEnd, onClick }: BookingRequestCardProps): ReactElement {
    const { t } = useTranslation('global-booking-request');

    return (
        <>
            <ListItemButton selected={isSelected} onClick={onClick}>
                <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start' }}>
                    <HStack className="w-full">
                        <BookingRequestStatusPill status={bookingRequest.status} />

                        <Spacer />

                        <span className="text-green">{formatPrice(bookingRequest.price)}</span>
                    </HStack>

                    <span className="text-heading-ss-bold md:text-text-sm-bold">{bookingRequest.occasion}</span>

                    <HStack gap={16} className="text-gray">
                        {moment(bookingRequest.dateTime).format('L')}
                        <Divider orientation="vertical" flexItem style={{ display: 'inline' }}></Divider>
                        {moment(bookingRequest.dateTime).format('LT')}
                    </HStack>

                    <HStack gap={16} style={{ alignItems: 'center' }} className="w-full">
                        {bookingRequest.cook.user.profilePictureUrl && (
                            <Image
                                unoptimized
                                className="rounded-3"
                                style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                                src={bookingRequest.cook.user.profilePictureUrl}
                                alt="Profilbild Koch"
                                width={45}
                                height={45}
                            />
                        )}
                        {!bookingRequest.cook.user.profilePictureUrl && (
                            <div className="flex justify-center items-center w-11 h-11 bg-base rounded-3">
                                <PEIcon icon={Icon.profileLight} edgeLength={32} />
                            </div>
                        )}
                        {bookingRequest.cook.user.firstName}
                        <Spacer />
                        in {moment(bookingRequest.dateTime).diff(moment(), 'days')} {t('days')}
                    </HStack>
                </VStack>
            </ListItemButton>

            {showDividerAtEnd && <Divider />}
        </>
    );
}
