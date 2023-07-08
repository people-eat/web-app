import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { useState, type ReactElement } from 'react';
import {
    FindManyUserBookingRequestsDocument,
    FindUserProfileGlobalBookingRequestsDocument,
    type CurrencyCode,
} from '../../../../data-source/generated/graphql';
import BookingRequestDetailsDialog from '../../../BookingRequestDetailsDialog';
import PEBookingRequestCardInProcess from '../../../cards/bookingRequestCard/PEBookingRequestCardInProcess';
import PEBookingRequestCardOpen from '../../../cards/bookingRequestCard/PEBookingRequestCardOpen';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

const BOOKING_TABS = ['Open', 'In Progress', 'Completed'];

export interface ProfilePageBookingsTabProps {
    userId: string;
}

export default function ProfilePageBookingsTab({ userId }: ProfilePageBookingsTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<number | undefined>(0);

    const [selectedBookingRequest, setSelectedBookingRequest] = useState<
        | {
              bookingRequestId: string;
              globalBookingRequestId?: string | null;
              adultParticipants: number;
              children: number;
              dateTime: Date;
              userAccepted: boolean;
              cookAccepted: boolean;
              kitchenId?: string | null;
              occasion: string;
              preparationTime: number;
              duration: number;
              createdAt: Date;
              price: { amount: number; currencyCode: CurrencyCode };
          }
        | undefined
    >();

    const { data, loading, error } = useQuery(FindUserProfileGlobalBookingRequestsDocument, { variables: { userId } });
    const globalBookingRequests = data?.users.globalBookingRequests.findMany;

    const bookingRequestsResult = useQuery(FindManyUserBookingRequestsDocument, { variables: { userId } });
    const bookingRequests = bookingRequestsResult.data?.users.bookingRequests.findMany ?? [];
    const openBookingRequests = bookingRequests.filter((bookingRequest) => !bookingRequest.cookAccepted || !bookingRequest.userAccepted);
    const bookingRequestsInProgress = bookingRequests.filter(
        (bookingRequest) => bookingRequest.cookAccepted && bookingRequest.userAccepted,
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

            {selectedTab === undefined &&
                globalBookingRequests?.map((globalBookingRequest, index) => (
                    <Button variant="contained" key={index}>
                        {globalBookingRequest.occasion}
                    </Button>
                ))}

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
                                onAcceptClick={(): void => undefined}
                                onDeclineClick={(): void => undefined}
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
                                onToChatClick={(): void => undefined}
                            />
                        </div>
                    ))}
                </HStack>
            )}

            {loading && <CircularProgress />}

            {error && <>An error ocurred</>}

            {selectedBookingRequest && (
                <BookingRequestDetailsDialog
                    onClose={(): void => setSelectedBookingRequest(undefined)}
                    bookingRequest={selectedBookingRequest}
                />
            )}
        </VStack>
    );
}
