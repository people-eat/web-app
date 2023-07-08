import { useQuery } from '@apollo/client';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import {
    FindManyUserBookingRequestsDocument,
    FindUserProfileGlobalBookingRequestsDocument,
    type CurrencyCode,
} from '../../../../data-source/generated/graphql';
import PEBookingRequestCardInProcess from '../../../cards/bookingRequestCard/PEBookingRequestCardInProcess';
import PEBookingRequestCardOpen from '../../../cards/bookingRequestCard/PEBookingRequestCardOpen';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../standard/tabItem/PETabItem';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import { Transition } from '../personalTab/CreateAddressDialog';

const BOOKING_TABS = ['Open', 'In Progress', 'Completed'];

export interface ProfilePageBookingsTabProps {
    userId: string;
}

export default function ProfilePageBookingsTab({ userId }: ProfilePageBookingsTabProps): ReactElement {
    const { t: translateCommon } = useTranslation('common');

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
                <Dialog open onClose={(): void => setSelectedBookingRequest(undefined)} TransitionComponent={Transition} keepMounted>
                    <DialogTitle>
                        <HStack>
                            <span>{translateCommon('Booking Request Details')}</span>
                            <Spacer />
                            <PEIconButton
                                withoutShadow
                                bg="white"
                                icon={Icon.close}
                                onClick={(): void => setSelectedBookingRequest(undefined)}
                                iconSize={24}
                            />
                        </HStack>
                    </DialogTitle>
                    <DialogContent>
                        <VStack className="box-border p-4 md:p-0" gap={32}>
                            <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                                <span className="text-text-m-bold">Participants</span>
                                <HStack className="w-full">
                                    Adults <Spacer /> {selectedBookingRequest.adultParticipants}
                                </HStack>
                                <HStack className="w-full">
                                    Children <Spacer /> {selectedBookingRequest.children}
                                </HStack>
                            </VStack>
                            <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                                <span className="text-text-m-bold">Event Details</span>
                                <HStack gap={16}>
                                    <PETextField
                                        value={moment(selectedBookingRequest.dateTime).format(moment.HTML5_FMT.DATE)}
                                        onChange={(): void => undefined}
                                        type="text"
                                    />
                                    <PETextField
                                        value={moment(selectedBookingRequest.dateTime).format('LT')}
                                        onChange={(): void => undefined}
                                        type="text"
                                    />
                                    <PETextField value={selectedBookingRequest.occasion} onChange={(): void => undefined} type="text" />
                                </HStack>
                            </VStack>
                            <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                                <span className="text-text-m-bold">Categories</span>
                                <PETextField value="" onChange={(): void => undefined} type="text" />
                            </VStack>
                            <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                                <span className="text-text-m-bold">Kitchen</span>
                                <PETextField value="" onChange={(): void => undefined} type="text" />
                            </VStack>
                            <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                                <span className="text-text-m-bold">Allergies</span>
                                <PETextField value="" onChange={(): void => undefined} type="text" />
                            </VStack>
                            <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                                <span className="text-text-m-bold">Budget</span>
                                <PETextField
                                    value={`${selectedBookingRequest.price.amount}`}
                                    endContent={<>{selectedBookingRequest.price.currencyCode}</>}
                                    onChange={(): void => undefined}
                                    type="text"
                                />
                            </VStack>
                        </VStack>
                    </DialogContent>
                </Dialog>
            )}
        </VStack>
    );
}
