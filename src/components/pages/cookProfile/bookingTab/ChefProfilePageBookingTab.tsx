import { useMutation, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import {
    CookBookingRequestAcceptDocument,
    CookBookingRequestDeclineDocument,
    CookBookingRequestUpdatePriceDocument,
    CreateOneCookBookingRequestDocument,
    FindCookProfileGlobalBookingRequestsDocument,
    FindManyCookBookingRequestsDocument,
    type CurrencyCode,
} from '../../../../data-source/generated/graphql';
import BookingRequestDetailsDialog from '../../../BookingRequestDetailsDialog';
import PEBookingRequestCardInProcess from '../../../cards/bookingRequestCard/PEBookingRequestCardInProcess';
import PEBookingRequestCardOpen from '../../../cards/bookingRequestCard/PEBookingRequestCardOpen';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

export interface CookProfilePageBookingTabProps {
    cookId: string;
}

// eslint-disable-next-line max-statements
export default function CookProfilePageBookingTab({ cookId }: CookProfilePageBookingTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<number | undefined>(0);
    const { t } = useTranslation('chef-profile');

    const BOOKING_TABS = ['Open', t('booking-in-progress'), 'Completed', ' Canceled'];

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

    const { data, loading, error, refetch } = useQuery(FindCookProfileGlobalBookingRequestsDocument, { variables: { cookId } });
    const globalBookingRequests = data?.cooks.globalBookingRequests.findMany;

    const bookingRequestsResult = useQuery(FindManyCookBookingRequestsDocument, { variables: { cookId } });
    const bookingRequests = bookingRequestsResult.data?.cooks.bookingRequests.findMany ?? [];
    const openBookingRequests = bookingRequests.filter(
        ({ cookAccepted, userAccepted }) =>
            (cookAccepted === null && userAccepted === true) || (cookAccepted === true && userAccepted === null),
    );
    const bookingRequestsInProgress = bookingRequests.filter(({ cookAccepted, userAccepted }) => cookAccepted && userAccepted);
    const canceledBookingRequests = bookingRequests.filter(
        ({ cookAccepted, userAccepted }) => cookAccepted === false || userAccepted === false,
    );

    const [createBookingRequest] = useMutation(CreateOneCookBookingRequestDocument);
    const [acceptBookingRequest] = useMutation(CookBookingRequestAcceptDocument);
    const [declineBookingRequest] = useMutation(CookBookingRequestDeclineDocument);
    const [updateBookingRequestPrice] = useMutation(CookBookingRequestUpdatePriceDocument);

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
                                onAcceptClick={
                                    openBookingRequest.cookAccepted
                                        ? undefined
                                        : (): void =>
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
                                onOrderDetailsClick={(): void => setSelectedBookingRequest(openBookingRequest)}
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
                                onOrderDetailsClick={(): void => setSelectedBookingRequest(bookingRequestInProgress)}
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

            {selectedTab === 3 && (
                <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                    {canceledBookingRequests.map((canceledBookingRequest) => (
                        <div key={canceledBookingRequest.bookingRequestId} className="w-[calc(50%-20px)] md:w-full">
                            <PEBookingRequestCardInProcess
                                title={'Chef Booking Request'}
                                name={canceledBookingRequest.user.firstName}
                                profilePictureUrl={canceledBookingRequest.user.profilePictureUrl ?? undefined}
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

            {selectedTab === undefined && (
                <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                    {globalBookingRequests?.map((globalBookingRequest) => (
                        <div key={globalBookingRequest.globalBookingRequestId} className="w-[calc(50%-20px)] md:w-full">
                            <PEBookingRequestCardOpen
                                onOrderDetailsClick={(): void => undefined}
                                createdAt={moment(globalBookingRequest.createdAt)}
                                title={'Global Booking Request'}
                                name={''}
                                profilePictureUrl={undefined}
                                occasion={globalBookingRequest.occasion}
                                price={`${globalBookingRequest.price.amount} ${globalBookingRequest.price.currencyCode}`}
                                dateTime={moment(globalBookingRequest.dateTime)}
                                participants={globalBookingRequest.adultParticipants + globalBookingRequest.children}
                                address={'Location'}
                                onAcceptClick={(): void =>
                                    void createBookingRequest({
                                        variables: { cookId, globalBookingRequestId: globalBookingRequest.globalBookingRequestId },
                                    }).then(({ data: successData }) => {
                                        if (!successData?.cooks.bookingRequests.success) return;
                                        void bookingRequestsResult.refetch();
                                        setSelectedTab(1);
                                    })
                                }
                            />
                        </div>
                    ))}
                </HStack>
            )}

            {/* {selectedTab === undefined &&
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
                                onClick={
                                }
                            >
                                Accept
                            </Button>
                        </VStack>
                    </Paper>
                ))} */}

            {loading && <CircularProgress />}

            {error && <>An error ocurred</>}

            {selectedBookingRequest && (
                <BookingRequestDetailsDialog
                    onClose={(): void => setSelectedBookingRequest(undefined)}
                    bookingRequest={selectedBookingRequest}
                    onPriceChange={(changedPrice): void => {
                        void updateBookingRequestPrice({
                            variables: { cookId, bookingRequestId: selectedBookingRequest.bookingRequestId, price: changedPrice },
                        })
                            .then((result) => {
                                if (!result.data?.cooks.bookingRequests.success) return;
                                void refetch();
                            })
                            .finally((): void => setSelectedBookingRequest(undefined));
                    }}
                />
            )}
        </VStack>
    );
}
