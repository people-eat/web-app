import { useMutation, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import {
    FindManyUserBookingRequestsDocument,
    FindUserProfileGlobalBookingRequestsDocument,
    UserBookingRequestAcceptDocument,
    UserBookingRequestDeclineDocument,
    UserBookingRequestUpdatePriceDocument,
    type CurrencyCode,
} from '../../../../data-source/generated/graphql';
import BookingRequestDetailsDialog from '../../../BookingRequestDetailsDialog';
import PEBookingRequestCardInProcess from '../../../cards/bookingRequestCard/PEBookingRequestCardInProcess';
import PEBookingRequestCardOpen from '../../../cards/bookingRequestCard/PEBookingRequestCardOpen';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

const BOOKING_TABS = ['Open', 'In Progress', 'Completed', 'Canceled'];

export interface ProfilePageBookingTabProps {
    userId: string;
}

export default function ProfilePageBookingTab({ userId }: ProfilePageBookingTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<number | undefined>(0);
    const { t } = useTranslation('common');
    const { t: bookingTranslations } = useTranslation('global-booking-request');
    const [acceptBookingRequest] = useMutation(UserBookingRequestAcceptDocument);
    const [declineBookingRequest] = useMutation(UserBookingRequestDeclineDocument);
    const [updateBookingRequestPrice] = useMutation(UserBookingRequestUpdatePriceDocument);

    const [selectedBookingRequest, setSelectedBookingRequest] = useState<
        | {
              bookingRequestId: string;
              globalBookingRequestId?: string | null;
              adultParticipants: number;
              children: number;
              dateTime: Date;
              userAccepted?: boolean | null;
              cookAccepted?: boolean | null;
              kitchenId?: string | null;
              occasion: string;
              preparationTime: number;
              duration: number;
              createdAt: Date;
              price: { amount: number; currencyCode: CurrencyCode };
          }
        | undefined
    >();

    const { data, loading, error, refetch } = useQuery(FindUserProfileGlobalBookingRequestsDocument, { variables: { userId } });
    const globalBookingRequests = data?.users.globalBookingRequests.findMany;

    const bookingRequestsResult = useQuery(FindManyUserBookingRequestsDocument, { variables: { userId } });
    const bookingRequests = bookingRequestsResult.data?.users.bookingRequests.findMany ?? [];
    const openBookingRequests = bookingRequests.filter(
        ({ cookAccepted, userAccepted }) =>
            (cookAccepted === null && userAccepted === true) || (cookAccepted === true && userAccepted === null),
    );
    const bookingRequestsInProgress = bookingRequests.filter(({ cookAccepted, userAccepted }) => cookAccepted && userAccepted);
    const canceledBookingRequests = bookingRequests.filter(
        ({ cookAccepted, userAccepted }) => cookAccepted === false || userAccepted === false,
    );

    return (
        <VStack className="w-full md:overflow-hidden relative max-w-screen-xl gap-6 lg:px-4 md:py-6 box-border">
            <HStack
                gap={8}
                className="w-full bg-white shadow-primary md:shadow-none box-border p-8 md:p-0 rounded-4 md:overflow-x-auto"
                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {BOOKING_TABS.map((menu, index) => (
                    <PETabItem key={index} title={menu} onClick={(): void => setSelectedTab(index)} active={selectedTab === index} />
                ))}

                <Spacer />

                <PETabItem title={'Global Requests'} onClick={(): void => setSelectedTab(undefined)} active={selectedTab === undefined} />
            </HStack>

            {selectedTab === undefined && (
                <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                    {globalBookingRequests?.map((globalBookingRequest) => (
                        <div key={globalBookingRequest.globalBookingRequestId} className="w-[calc(50%-20px)] md:w-full">
                            <PEBookingRequestCardOpen
                                onOrderDetailsClick={(): void => undefined}
                                createdAt={moment(globalBookingRequest.createdAt)}
                                title={bookingTranslations('global-request')}
                                name={''}
                                profilePictureUrl={undefined}
                                occasion={globalBookingRequest.occasion}
                                price={`${globalBookingRequest.price.amount} ${globalBookingRequest.price.currencyCode}`}
                                dateTime={moment(globalBookingRequest.dateTime)}
                                participants={globalBookingRequest.adultParticipants + globalBookingRequest.children}
                                address={'Location'}
                            />
                        </div>
                    ))}
                </HStack>
            )}

            {selectedTab === 0 && (
                <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                    {openBookingRequests.map((openBookingRequest) => (
                        <div key={openBookingRequest.bookingRequestId} className="w-[calc(50%-20px)] md:w-full">
                            <PEBookingRequestCardOpen
                                onOrderDetailsClick={(): void => setSelectedBookingRequest(openBookingRequest)}
                                createdAt={moment(openBookingRequest.createdAt)}
                                title={'Chef Booking Request'}
                                name={openBookingRequest.cook.user.firstName}
                                profilePictureUrl={undefined}
                                occasion={openBookingRequest.occasion}
                                price={`${openBookingRequest.price.amount} ${openBookingRequest.price.currencyCode}`}
                                dateTime={moment(openBookingRequest.dateTime)}
                                participants={openBookingRequest.adultParticipants + openBookingRequest.children}
                                address={'Location'}
                                onAcceptClick={
                                    openBookingRequest.userAccepted
                                        ? undefined
                                        : (): void =>
                                              void acceptBookingRequest({
                                                  variables: { userId, bookingRequestId: openBookingRequest.bookingRequestId },
                                              }).then((result) => {
                                                  if (!result.data?.users.bookingRequests.success) return;
                                                  void refetch();
                                              })
                                }
                                onDeclineClick={(): void =>
                                    void declineBookingRequest({
                                        variables: { userId, bookingRequestId: openBookingRequest.bookingRequestId },
                                    }).then((result) => {
                                        if (!result.data?.users.bookingRequests.success) return;
                                        void refetch();
                                    })
                                }
                            />
                        </div>
                    ))}
                </HStack>
            )}

            {selectedTab === 1 && (
                <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                    {bookingRequestsInProgress.map((bookingRequestInProgress) => (
                        <div key={bookingRequestInProgress.bookingRequestId} className="w-[calc(50%-20px)] md:w-full">
                            <PEBookingRequestCardInProcess
                                title={'Chef Booking Request'}
                                name={bookingRequestInProgress.cook.user.firstName}
                                profilePictureUrl={bookingRequestInProgress.cook.user.profilePictureUrl ?? undefined}
                                occasion={bookingRequestInProgress.occasion}
                                price={`${bookingRequestInProgress.price.amount} ${bookingRequestInProgress.price.currencyCode}`}
                                participants={bookingRequestInProgress.adultParticipants + bookingRequestInProgress.children}
                                address={'Location'}
                                dateTime={moment(bookingRequestInProgress.dateTime)}
                                createdAt={moment(bookingRequestInProgress.createdAt)}
                                onOrderDetailsClick={(): void => setSelectedBookingRequest(bookingRequestInProgress)}
                            />
                        </div>
                    ))}
                </HStack>
            )}

            {selectedTab === 3 && (
                <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                    {canceledBookingRequests.map((canceledBookingRequest) => (
                        <div key={canceledBookingRequest.bookingRequestId} className="w-[calc(50%-20px)] md:w-full">
                            <PEBookingRequestCardInProcess
                                title={'Chef Booking Request'}
                                name={canceledBookingRequest.cook.user.firstName}
                                profilePictureUrl={canceledBookingRequest.cook.user.profilePictureUrl ?? undefined}
                                occasion={canceledBookingRequest.occasion}
                                price={`${canceledBookingRequest.price.amount} ${canceledBookingRequest.price.currencyCode}`}
                                participants={canceledBookingRequest.adultParticipants + canceledBookingRequest.children}
                                address={'Location'}
                                dateTime={moment(canceledBookingRequest.dateTime)}
                                createdAt={moment(canceledBookingRequest.createdAt)}
                                onOrderDetailsClick={(): void => setSelectedBookingRequest(canceledBookingRequest)}
                            />
                        </div>
                    ))}
                </HStack>
            )}

            {loading && <CircularProgress />}

            {error && <>{t('error')}</>}

            {selectedBookingRequest && (
                <BookingRequestDetailsDialog
                    onClose={(): void => setSelectedBookingRequest(undefined)}
                    bookingRequest={selectedBookingRequest}
                    onPriceChange={(changedPrice): void => {
                        void updateBookingRequestPrice({
                            variables: { userId, bookingRequestId: selectedBookingRequest.bookingRequestId, price: changedPrice },
                        })
                            .then((result) => {
                                if (!result.data?.users.bookingRequests.success) return;
                                void refetch();
                            })
                            .finally((): void => setSelectedBookingRequest(undefined));
                    }}
                />
            )}
        </VStack>
    );
}
