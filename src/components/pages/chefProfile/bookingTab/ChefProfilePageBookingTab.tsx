import { useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, type ReactElement } from 'react';
import { GetCookProfileQueryDocument } from '../../../../data-source/generated/graphql';
import PEBookingRequestCardClosed from '../../../cards/bookingRequestCard/PEBookingRequestCardClosed';
import PEBookingRequestCardInProcess from '../../../cards/bookingRequestCard/PEBookingRequestCardInProcess';
import PEBookingRequestCardOpen from '../../../cards/bookingRequestCard/PEBookingRequestCardOpen';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import { orders } from './orders.mock';

const BOOKING_TABS = ['Open', 'In process', 'Completed'];

export default function ChefProfilePageBookingTab({ cookId }: { cookId: string }): ReactElement {
    const { data, loading, error } = useQuery(GetCookProfileQueryDocument, {
        variables: { cookId },
    });

    const [selectedTab, setSelectedTab] = useState(0);

    const chefProfile = data?.cooks.findOne;

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
            </HStack>

            {chefProfile && (
                <>
                    {selectedTab === 0 && (
                        <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                            {orders.map(({ date, menuName, clientName, clientImage, event, eventDate, persons, time, address }, index) => (
                                <div key={index} className="w-[calc(50%-20px)] md:w-full">
                                    <PEBookingRequestCardOpen
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
                </>
            )}

            {loading && <CircularProgress />}

            {error && <>An error ocurred</>}
        </VStack>
    );
}
