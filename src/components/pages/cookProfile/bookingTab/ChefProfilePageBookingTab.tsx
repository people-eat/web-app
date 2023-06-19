import { useMutation, useQuery } from '@apollo/client';
import { Button, Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import {
    CookBookingRequestAcceptDocument,
    CookBookingRequestDeclineDocument,
    CreateOneCookBookingRequestDocument,
    FindCookProfileGlobalBookingRequestsDocument,
    FindManyCookBookingRequestsDocument,
} from '../../../../data-source/generated/graphql';
import PEBookingRequestCardInProcess from '../../../cards/bookingRequestCard/PEBookingRequestCardInProcess';
import PEBookingRequestCardOpen from '../../../cards/bookingRequestCard/PEBookingRequestCardOpen';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

export interface CookProfilePageBookingTabProps {
    cookId: string;
}

export default function CookProfilePageBookingTab({ cookId }: CookProfilePageBookingTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<number | undefined>(0);
    const { t } = useTranslation('chef-profile');

    const BOOKING_TABS = ['Open', t('booking-in-progress'), 'Completed'];

    const { data, loading, error, refetch } = useQuery(FindCookProfileGlobalBookingRequestsDocument, { variables: { cookId } });
    const globalBookingRequests = data?.cooks.globalBookingRequests.findMany;

    const bookingRequestsResult = useQuery(FindManyCookBookingRequestsDocument, { variables: { cookId } });
    const bookingRequests = bookingRequestsResult.data?.cooks.bookingRequests.findMany ?? [];
    const openBookingRequests = bookingRequests.filter((bookingRequest) => !bookingRequest.cookAccepted || !bookingRequest.userAccepted);
    const bookingRequestsInProgress = bookingRequests.filter(
        (bookingRequest) => bookingRequest.cookAccepted && bookingRequest.userAccepted,
    );

    const [createBookingRequest] = useMutation(CreateOneCookBookingRequestDocument);
    const [acceptBookingRequest] = useMutation(CookBookingRequestAcceptDocument);
    const [declineBookingRequest] = useMutation(CookBookingRequestDeclineDocument);

    return (
        <VStack className="w-full relative max-w-screen-xl mb-[80px] lg:my-10 gap-6 box-border">
            <HStack
                gap={8}
                className="w-full bg-white shadow-primary md:shadow-none box-border p-8 md:p-0 rounded-4 md:overflow-x-auto"
                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {BOOKING_TABS.map((menu, index) => (
                    <PETabItem key={index} title={menu} onClick={(): void => setSelectedTab(index)} active={selectedTab === index} />
                ))}

                <Spacer />

                <PETabItem
                    title={t('booking-global-requests')}
                    onClick={(): void => setSelectedTab(undefined)}
                    active={selectedTab === undefined}
                />
            </HStack>

            {selectedTab === 0 && (
                <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                    {openBookingRequests.map((openBookingRequest) => (
                        <div key={openBookingRequest.bookingRequestId} className="w-[calc(50%-20px)] md:w-full">
                            <PEBookingRequestCardOpen
                                title={'Chef Booking Request'}
                                name={openBookingRequest.user.firstName}
                                profilePictureUrl={openBookingRequest.user.profilePictureUrl ?? undefined}
                                occasion={openBookingRequest.occasion}
                                price={`${openBookingRequest.price.amount} ${openBookingRequest.price.currencyCode}`}
                                participants={openBookingRequest.adultParticipants + openBookingRequest.children}
                                address={'Location'}
                                dateTime={moment(openBookingRequest.dateTime)}
                                createdAt={moment(openBookingRequest.createdAt)}
                                onAcceptClick={(): void =>
                                    void acceptBookingRequest({
                                        variables: { cookId, bookingRequestId: openBookingRequest.bookingRequestId },
                                    }).then((result) => {
                                        if (!result.data?.cooks.bookingRequests.success) return;
                                        void refetch();
                                        setTimeout(() => setSelectedTab(1), 500);
                                    })
                                }
                                onDeclineClick={(): void =>
                                    void declineBookingRequest({
                                        variables: { cookId, bookingRequestId: openBookingRequest.bookingRequestId },
                                    }).then((result) => {
                                        if (!result.data?.cooks.bookingRequests.success) return;
                                        void refetch();
                                    })
                                }
                                onOrderDetailsClick={(): void => undefined}
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
                                name={bookingRequestInProgress.user.firstName}
                                profilePictureUrl={bookingRequestInProgress.user.profilePictureUrl ?? undefined}
                                occasion={bookingRequestInProgress.occasion}
                                price={`${bookingRequestInProgress.price.amount} ${bookingRequestInProgress.price.currencyCode}`}
                                participants={bookingRequestInProgress.adultParticipants + bookingRequestInProgress.children}
                                address={'Location'}
                                dateTime={moment(bookingRequestInProgress.dateTime)}
                                createdAt={moment(bookingRequestInProgress.createdAt)}
                                onOrderDetailsClick={(): void => undefined}
                                onToChatClick={(): void => undefined}
                            />
                        </div>
                    ))}
                </HStack>
            )}

            {selectedTab === 2 && (
                <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                    {/* {orders.map(({ date, menuName, clientName, clientImage, event, eventDate, persons, time, address }, index) => (
                        <div key={index} className="w-[calc(50%-20px)] md:w-full">
                            <PEBookingRequestCardClosed
                                onOrderDetailsClick={(): void => undefined}
                                date={date}
                                menuName={menuName}
                                clientName={clientName}
                                clientImage={clientImage}
                                event={event}
                                price={'340€'}
                                eventDate={eventDate}
                                persons={persons}
                                time={time}
                                address={address}
                                onDownloadDocumentsClick={(): void => undefined}
                                onSendInvoiceClick={(): void => undefined}
                                onShowReviewClick={(): void => undefined}
                            />
                        </div>
                    ))} */}
                </HStack>
            )}

            {selectedTab === undefined &&
                globalBookingRequests?.map((globalBookingRequest, index) => (
                    <Paper elevation={3} key={index}>
                        <VStack style={{ width: 256, height: 256, padding: 16, alignItems: 'flex-start' }} gap={16}>
                            <span>
                                <b>{globalBookingRequest.occasion}</b>
                            </span>
                            <span>{moment(globalBookingRequest.dateTime).format(moment.HTML5_FMT.DATE)}</span>
                            <span>{globalBookingRequest.message}</span>

                            <Spacer />

                            <Button
                                className="w-full"
                                variant="contained"
                                onClick={(): void =>
                                    void createBookingRequest({
                                        variables: { cookId, globalBookingRequestId: globalBookingRequest.globalBookingRequestId },
                                    }).then(({ data: successData }) => {
                                        if (!successData?.cooks.bookingRequests.success) return;
                                        void bookingRequestsResult.refetch();
                                        setSelectedTab(0);
                                    })
                                }
                            >
                                Accept
                            </Button>
                        </VStack>
                    </Paper>
                ))}

            {loading && <CircularProgress />}

            {error && <>An error ocurred</>}
        </VStack>
    );
}
