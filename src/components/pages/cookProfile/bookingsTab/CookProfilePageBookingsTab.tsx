import { useQuery } from '@apollo/client';
import { Divider, List, ListItemButton, Skeleton } from '@mui/material';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useState, type ReactElement } from 'react';
import { FindManyCookBookingRequestsDocument, type Price } from '../../../../data-source/generated/graphql';
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
    const { t } = useTranslation('global-booking-request');
    const { t: chefProfileTranslations } = useTranslation('chef-profile');
    const { data, loading } = useQuery(FindManyCookBookingRequestsDocument, { variables: { cookId } });
    const bookingRequests = data?.cooks.bookingRequests.findMany ?? [];

    const formatPrice = (price: Price): string => (price.amount / 100).toFixed(2) + ' ' + price.currencyCode;

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
                        {chefProfileTranslations('tab-bookings')}
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
                                                {bookingRequest.status === 'OPEN' && (
                                                    <span
                                                        className="text-green"
                                                        style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}
                                                    >
                                                        {chefProfileTranslations('booking-open')}
                                                    </span>
                                                )}
                                                {bookingRequest.status === 'PENDING' && (
                                                    <span
                                                        className="text-blue-400"
                                                        style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}
                                                    >
                                                        {chefProfileTranslations('booking-in-progress')}
                                                    </span>
                                                )}
                                                {bookingRequest.status === 'CANCELED' && (
                                                    <span
                                                        className="text-red-400"
                                                        style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}
                                                    >
                                                        {chefProfileTranslations('booking-cancelled')}
                                                    </span>
                                                )}
                                                {bookingRequest.status === 'COMPLETED' && (
                                                    <span style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>
                                                        Completed
                                                    </span>
                                                )}
                                                <Spacer />
                                                <span className="text-green" style={{ fontWeight: 'bold' }}>
                                                    {formatPrice(bookingRequest.price)}
                                                </span>
                                            </HStack>
                                            <span className="text-heading-ss-bold md:text-text-sm-bold">
                                                {bookingRequest.configuredMenu?.title ?? chefProfileTranslations('cook-request-title')}
                                            </span>

                                            <HStack gap={16} className="text-gray">
                                                {moment(bookingRequest.dateTime).format(moment.HTML5_FMT.DATE)}
                                                <Divider orientation="vertical" flexItem style={{ display: 'inline' }}></Divider>
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
                                                {t('in')} {moment(bookingRequest.dateTime).diff(moment(), 'days')} {t('days')}
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

                    {!selectedBookingRequestId && t('booking-selection')}
                </VStack>
            </HStack>
        </>
    );
}
