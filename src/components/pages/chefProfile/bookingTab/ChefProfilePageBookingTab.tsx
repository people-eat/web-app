import { useMutation, useQuery } from '@apollo/client';
import { Button, Paper } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import { useState, type ReactElement } from 'react';
import {
    CreateOneCookBookingRequestDocument,
    FindCookProfileGlobalBookingRequestsDocument,
    FindManyCookBookingRequestsDocument,
} from '../../../../data-source/generated/graphql';
import PEBookingRequestCardClosed from '../../../cards/bookingRequestCard/PEBookingRequestCardClosed';
import PEBookingRequestCardInProcess from '../../../cards/bookingRequestCard/PEBookingRequestCardInProcess';
import PEBookingRequestCardOpen from '../../../cards/bookingRequestCard/PEBookingRequestCardOpen';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import { orders } from './orders.mock';

const BOOKING_TABS = ['Open', 'In Progress', 'Completed'];

export interface ChefProfilePageBookingTabProps {
    cookId: string;
}

export default function ChefProfilePageBookingTab({ cookId }: ChefProfilePageBookingTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<number | undefined>(0);

    const { data, loading, error } = useQuery(FindCookProfileGlobalBookingRequestsDocument, { variables: { cookId } });
    const globalBookingRequests = data?.cooks.globalBookingRequests.findMany;

    const bookingRequestsResult = useQuery(FindManyCookBookingRequestsDocument, { variables: { cookId } });
    const bookingRequests = bookingRequestsResult.data?.cooks.bookingRequests.findMany ?? [];
    const openBookingRequests = bookingRequests.filter((bookingRequest) => !bookingRequest.cookAccepted && !bookingRequest.userAccepted);
    // const completedBookingRequests = bookingRequests.filter((bookingRequest) => bookingRequest.cookAccepted && bookingRequest.userAccepted);

    const [createBookingRequest] = useMutation(CreateOneCookBookingRequestDocument);

    return (
        <VStack className="w-full relative max-w-screen-xl mb-[80px] lg:my-10 gap-6 px-5 box-border">
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

            {selectedTab === 0 && (
                <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                    {openBookingRequests.map((openBookingRequest) => (
                        <div key={openBookingRequest.bookingRequestId} className="w-[calc(50%-20px)] md:w-full">
                            <PEBookingRequestCardOpen
                                onOrderDetailsClick={(): void => undefined}
                                date={moment(openBookingRequest.createdAt).format(moment.HTML5_FMT.DATE)}
                                menuName={'Menu name'}
                                clientName={'My name'}
                                clientImage={undefined}
                                event={openBookingRequest.occasion}
                                price={`${openBookingRequest.price.amount} ${openBookingRequest.price.currencyCode}`}
                                eventDate={moment(openBookingRequest.dateTime).format(moment.HTML5_FMT.DATE)}
                                participants={openBookingRequest.adultParticipants + openBookingRequest.children}
                                time={moment(openBookingRequest.dateTime).format('LT')}
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
                    {orders.map(({ date, menuName, clientName, clientImage, event, eventDate, persons, time, address }, index) => (
                        <div key={index} className="w-[calc(50%-20px)] md:w-full">
                            <PEBookingRequestCardInProcess
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
                                onAcceptAsSender={(): void => undefined}
                            />
                        </div>
                    ))}
                </HStack>
            )}

            {selectedTab === 2 && (
                <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                    {orders.map(({ date, menuName, clientName, clientImage, event, eventDate, persons, time, address }, index) => (
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
                    ))}
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
