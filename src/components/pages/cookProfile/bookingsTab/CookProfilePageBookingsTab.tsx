import { useQuery } from '@apollo/client';
import { Divider, List, ListItemButton, Skeleton } from '@mui/material';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useState, type ReactElement } from 'react';
import { FindManyCookBookingRequestsDocument } from '../../../../data-source/generated/graphql';
import { formatPrice } from '../../../../shared-domain/formatPrice';
import BookingRequestStatusPill from '../../../standard/bookingRequestStatusPill/BookingRequestStatusPill';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import CookProfilePageBookingsTabDetail from './CookProfilePageBookingsTabDetail';

export interface CookProfilePageBookingsTabProps {
    cookId: string;
}

export default function CookProfilePageBookingsTab({ cookId }: CookProfilePageBookingsTabProps): ReactElement {
    const [selectedBookingRequestId, setSelectedBookingRequestId] = useState<string | undefined>();
    const { t: translateGlobalBookingRequest } = useTranslation('global-booking-request');
    const { data, loading } = useQuery(FindManyCookBookingRequestsDocument, { variables: { cookId } });
    const bookingRequests = data?.cooks.bookingRequests.findMany ?? [];

    // useEffect(() => {
    //     bookingRequests = bookingRequests.sort((b1, b2) => new Date(b1.createdAt).getTime() - new Date(b2.createdAt).getTime());
    // }, [bookingRequests]);

    return (
        <>
            <HStack className="w-full max-w-screen-xl" gap={32}>
                <VStack
                    className="bg-white shadow-primary"
                    style={{
                        alignItems: 'stretch',
                        justifyContent: 'flex-start',
                        paddingTop: 8,
                        flex: 1,
                        borderRadius: 16,
                        height: 800,
                    }}
                >
                    <span style={{ margin: 16 }} className="text-heading-ss-bold md:text-text-sm-bold">
                        {translateGlobalBookingRequest('booking-request-title')}
                    </span>

                    <Divider />

                    {loading && (
                        <VStack gap={1} style={{ alignItems: 'stretch' }}>
                            <Skeleton variant="rectangular" height={180} />
                            <Skeleton variant="rectangular" height={180} />
                            <Skeleton variant="rectangular" height={180} />
                        </VStack>
                    )}

                    {!loading && (
                        <List style={{ overflowY: 'scroll', paddingTop: 0, paddingBottom: 0 }}>
                            {bookingRequests.map((bookingRequest) => (
                                <>
                                    <ListItemButton
                                        key={bookingRequest.bookingRequestId}
                                        onClick={(): void => setSelectedBookingRequestId(bookingRequest.bookingRequestId)}
                                    >
                                        <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start' }}>
                                            <HStack className="w-full">
                                                <BookingRequestStatusPill status={bookingRequest.status} />

                                                <Spacer />

                                                <span className="text-green" style={{ fontWeight: 'bold' }}>
                                                    {formatPrice(bookingRequest.price)}
                                                </span>
                                            </HStack>

                                            <span className="text-heading-ss-bold md:text-text-sm-bold">{bookingRequest.occasion}</span>

                                            <HStack gap={16} className="text-gray">
                                                {moment(bookingRequest.dateTime).format(moment.HTML5_FMT.DATE)}
                                                <Divider orientation="vertical" flexItem style={{ display: 'inline' }} />
                                                {moment(bookingRequest.dateTime).format('LT')}
                                            </HStack>

                                            <HStack gap={16} style={{ alignItems: 'center' }} className="w-full">
                                                {bookingRequest.user.profilePictureUrl && (
                                                    <Image
                                                        className="rounded-3"
                                                        style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                                                        src={bookingRequest.user.profilePictureUrl}
                                                        alt={'client image'}
                                                        width={45}
                                                        height={45}
                                                    />
                                                )}
                                                {!bookingRequest.user.profilePictureUrl && (
                                                    <div className="flex justify-center items-center w-11 h-11 bg-base rounded-3">
                                                        <PEIcon icon={Icon.profileLight} edgeLength={32} />
                                                    </div>
                                                )}
                                                {bookingRequest.user.firstName}
                                                <Spacer />
                                                {translateGlobalBookingRequest('in')}{' '}
                                                {moment(bookingRequest.dateTime).diff(moment(), 'days')}{' '}
                                                {translateGlobalBookingRequest('days')}
                                            </HStack>
                                        </VStack>
                                    </ListItemButton>

                                    <Divider key={bookingRequest.bookingRequestId + 'divider'} />
                                </>
                            ))}
                        </List>
                    )}
                </VStack>

                <VStack
                    gap={16}
                    className="bg-white shadow-primary"
                    style={{ alignItems: 'center', justifyContent: 'flex-start', padding: 16, flex: 2, borderRadius: 16 }}
                >
                    {selectedBookingRequestId && (
                        <CookProfilePageBookingsTabDetail
                            cookId={cookId}
                            bookingRequestId={selectedBookingRequestId}
                            onClose={(): void => setSelectedBookingRequestId(undefined)}
                        />
                    )}

                    {!selectedBookingRequestId && translateGlobalBookingRequest('booking-selection')}
                </VStack>
            </HStack>
        </>
    );
}
