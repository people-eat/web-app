import { useMutation, useQuery } from '@apollo/client';
import { Button, Divider, List, ListItemButton } from '@mui/material';
import moment from 'moment';
import Image from 'next/image';
import { useState, type ReactElement } from 'react';
import {
    CookBookingRequestAcceptDocument,
    CookBookingRequestDeclineDocument,
    CookBookingRequestUpdatePriceDocument,
    CreateOneCookBookingRequestChatMessageDocument,
    FindManyCookBookingRequestsDocument,
    type CurrencyCode,
} from '../../../../data-source/generated/graphql';
import BookingRequestDetailsDialog from '../../../BookingRequestDetailsDialog';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageBookingsChatMessages from './ChefProfilePageBookingsChatMessages';

export interface CookProfilePageBookingsTabProps {
    cookId: string;
}

export default function ChefProfilePageBookingsTab({ cookId }: CookProfilePageBookingsTabProps): ReactElement {
    const [selectedBookingRequest, setSelectedBookingRequest] = useState<
        | {
              bookingRequestId: string;
              globalBookingRequestId?: string | null;
              adultParticipants: number;
              user?: { firstName: string; profilePictureUrl?: string | null };
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

    const [showDetailsDialog, setShowDetailDialog] = useState(false);
    const [newMessage, setNewMessage] = useState('');

    const bookingRequestsResult = useQuery(FindManyCookBookingRequestsDocument, { variables: { cookId } });
    const bookingRequests = bookingRequestsResult.data?.cooks.bookingRequests.findMany ?? [];

    const [acceptBookingRequest] = useMutation(CookBookingRequestAcceptDocument);
    const [declineBookingRequest] = useMutation(CookBookingRequestDeclineDocument);
    const [updateBookingRequestPrice] = useMutation(CookBookingRequestUpdatePriceDocument);
    const [createMessage] = useMutation(CreateOneCookBookingRequestChatMessageDocument);

    return (
        <>
            <HStack className="w-full max-w-screen-xl" gap={32}>
                <VStack
                    className="bg-white shadow-primary"
                    style={{
                        alignItems: 'stretch',
                        justifyContent: 'flex-start',
                        paddingTop: 16,
                        paddingBottom: 16,
                        flex: 1,
                        borderRadius: 16,
                    }}
                >
                    <span style={{ margin: 16 }}>Hello world</span>
                    <Divider />
                    <List>
                        {bookingRequests.map((bookingRequest) => (
                            <>
                                <ListItemButton
                                    key={bookingRequest.bookingRequestId}
                                    onClick={(): void => setSelectedBookingRequest(bookingRequest)}
                                >
                                    <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start' }}>
                                        {((bookingRequest.cookAccepted === null && bookingRequest.userAccepted === true) ||
                                            (bookingRequest.cookAccepted === true && bookingRequest.userAccepted === null)) && (
                                            <span
                                                className="text-green"
                                                style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}
                                            >
                                                Open
                                            </span>
                                        )}
                                        {bookingRequest.cookAccepted === true && bookingRequest.userAccepted === true && (
                                            <span
                                                className="text-blue-400"
                                                style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}
                                            >
                                                In Progress
                                            </span>
                                        )}
                                        {(bookingRequest.cookAccepted === false || bookingRequest.userAccepted === false) && (
                                            <span
                                                className="text-red-400"
                                                style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}
                                            >
                                                Canceled
                                            </span>
                                        )}
                                        <span className={'text-heading-ss-bold md:text-text-sm-bold'}>Chef Booking Request</span>
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
                                            left days
                                        </HStack>
                                    </VStack>
                                </ListItemButton>
                                <Divider />
                            </>
                        ))}
                    </List>
                </VStack>
                {selectedBookingRequest && (
                    <VStack
                        gap={16}
                        className="bg-white shadow-primary"
                        style={{ alignItems: 'center', justifyContent: 'flex-start', padding: 16, flex: 2, borderRadius: 16 }}
                    >
                        <HStack gap={16} style={{ alignItems: 'center' }} className="w-full">
                            {selectedBookingRequest.user?.profilePictureUrl && (
                                <Image
                                    className="rounded-3"
                                    style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                                    src={selectedBookingRequest.user?.profilePictureUrl}
                                    alt={'client image'}
                                    width={45}
                                    height={45}
                                />
                            )}
                            {!selectedBookingRequest.user?.profilePictureUrl && (
                                <div className="flex justify-center items-center w-11 h-11 bg-base rounded-3">
                                    <PEIcon icon={Icon.profileLight} edgeLength={32} />
                                </div>
                            )}
                            {selectedBookingRequest.user?.firstName}
                            <Spacer />
                            <Button onClick={(): void => setShowDetailDialog(true)}>Order Details</Button>
                        </HStack>

                        <Divider flexItem />

                        <Spacer />

                        <ChefProfilePageBookingsChatMessages cookId={cookId} bookingRequestId={selectedBookingRequest.bookingRequestId} />

                        {((selectedBookingRequest.cookAccepted === null && selectedBookingRequest.userAccepted === true) ||
                            (selectedBookingRequest.cookAccepted === true && selectedBookingRequest.userAccepted === null)) && (
                            <HStack gap={16} className="w-full">
                                {selectedBookingRequest.cookAccepted === null && selectedBookingRequest.userAccepted === true && (
                                    <>
                                        <PEButton
                                            onClick={(): void =>
                                                void declineBookingRequest({
                                                    variables: { cookId, bookingRequestId: selectedBookingRequest.bookingRequestId },
                                                }).then(
                                                    (result) =>
                                                        result.data?.cooks.bookingRequests.success && void bookingRequestsResult.refetch(),
                                                )
                                            }
                                            title="Decline"
                                            size="s"
                                        />
                                        <PEButton
                                            onClick={(): void =>
                                                void acceptBookingRequest({
                                                    variables: { cookId, bookingRequestId: selectedBookingRequest.bookingRequestId },
                                                }).then(
                                                    (result) =>
                                                        result.data?.cooks.bookingRequests.success && void bookingRequestsResult.refetch(),
                                                )
                                            }
                                            title="Accept"
                                            size="s"
                                        />
                                    </>
                                )}
                                {selectedBookingRequest.cookAccepted === true && selectedBookingRequest.userAccepted === null && (
                                    <>
                                        <PEButton
                                            onClick={(): void =>
                                                void declineBookingRequest({
                                                    variables: { cookId, bookingRequestId: selectedBookingRequest.bookingRequestId },
                                                }).then(
                                                    (result) =>
                                                        result.data?.cooks.bookingRequests.success && void bookingRequestsResult.refetch(),
                                                )
                                            }
                                            title="Decline"
                                            size="s"
                                        />
                                    </>
                                )}
                            </HStack>
                        )}

                        {!(
                            (selectedBookingRequest.cookAccepted === null && selectedBookingRequest.userAccepted === true) ||
                            (selectedBookingRequest.cookAccepted === true && selectedBookingRequest.userAccepted === null)
                        ) && (
                            <PETextField
                                value={newMessage}
                                onChange={setNewMessage}
                                type="text"
                                endContent={
                                    <Button
                                        onClick={(): void =>
                                            void createMessage({
                                                variables: {
                                                    cookId,
                                                    bookingRequestId: selectedBookingRequest.bookingRequestId,
                                                    request: { message: newMessage },
                                                },
                                            }).then((result) => {
                                                if (!result.data?.cooks.bookingRequests.chatMessages.success) return;
                                                void bookingRequestsResult.refetch();
                                                setNewMessage('');
                                            })
                                        }
                                    >
                                        Send
                                    </Button>
                                }
                            />
                        )}

                        {showDetailsDialog && (
                            <BookingRequestDetailsDialog
                                onClose={(): void => setShowDetailDialog(false)}
                                bookingRequest={selectedBookingRequest}
                                onPriceChange={(changedPrice): void => {
                                    void updateBookingRequestPrice({
                                        variables: {
                                            cookId,
                                            bookingRequestId: selectedBookingRequest.bookingRequestId,
                                            price: changedPrice,
                                        },
                                    })
                                        .then((result) => {
                                            if (!result.data?.cooks.bookingRequests.success) return;
                                            void bookingRequestsResult.refetch();
                                        })
                                        .finally((): void => setShowDetailDialog(false));
                                }}
                            />
                        )}
                    </VStack>
                )}
                {!selectedBookingRequest && (
                    <VStack
                        className="bg-white shadow-primary"
                        style={{ alignItems: 'center', justifyContent: 'flex-start', padding: 16, flex: 2, borderRadius: 16 }}
                    >
                        Select a booking request
                    </VStack>
                )}
            </HStack>
        </>
    );
}
