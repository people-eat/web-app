import { useMutation } from '@apollo/client';
import { Button } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import {
    CreateOneUserBookingRequestChatMessageDocument,
    UserBookingRequestAcceptDocument,
    UserBookingRequestDeclineDocument,
    type BookingRequestStatus,
} from '../../../data-source/generated/graphql';
import { BookingRequestAcceptDialog } from '../../bookingRequestAcceptDialog/BookingRequestAcceptDialog';
import { BookingRequestDeclineDialog } from '../../bookingRequestDeclineDialog/BookingRequestDeclineDialog';
import { LoadingDialog } from '../../loadingDialog/LoadingDialog';
import ProfilePageBookingsChatMessages from '../../pages/profile/bookingsTab/ProfilePageBookingsChatMessages';
import PEButton from '../../standard/buttons/PEButton';
import PETextField from '../../standard/textFields/PETextField';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';

export interface BookingRequestDetailChatTabProps {
    userId: string;
    bookingRequest: {
        bookingRequestId: string;
        userAccepted?: boolean | null;
        cookAccepted?: boolean | null;
        status: BookingRequestStatus;
    };
    onUpdateRequired: () => void;
}

export default function BookingRequestDetailChatTab({
    userId,
    bookingRequest,
    onUpdateRequired,
}: BookingRequestDetailChatTabProps): ReactElement {
    const { t: translateGlobalBookingRequest } = useTranslation('global-booking-request');
    const { t: cookProfileTranslate } = useTranslation('chef-profile');

    const [newMessage, setNewMessage] = useState('');

    const [showAcceptDialog, setShowAcceptDialog] = useState(false);
    const [showDeclineDialog, setShowDeclineDialog] = useState(false);

    const [acceptBookingRequest, { loading: acceptLoading }] = useMutation(UserBookingRequestAcceptDocument);
    const [declineBookingRequest, { loading: declineLoading }] = useMutation(UserBookingRequestDeclineDocument);
    const [createMessage, { loading: createMessageLoading }] = useMutation(CreateOneUserBookingRequestChatMessageDocument);

    return (
        <VStack style={{ width: '100%', height: '100%', justifyContent: 'space-between', overflowY: 'auto' }}>
            <ProfilePageBookingsChatMessages userId={userId} bookingRequestId={bookingRequest.bookingRequestId} />

            {bookingRequest.status === 'OPEN' && (
                <HStack gap={16} className="w-full">
                    {bookingRequest.cookAccepted === true && bookingRequest.userAccepted === null && (
                        <>
                            <PEButton
                                onClick={(): void => setShowDeclineDialog(true)}
                                title={translateGlobalBookingRequest('decline')}
                                size="s"
                                type="secondary"
                            />
                            <PEButton
                                onClick={(): void => setShowAcceptDialog(true)}
                                title={translateGlobalBookingRequest('accept')}
                                size="s"
                            />
                        </>
                    )}
                    {bookingRequest.cookAccepted === null && bookingRequest.userAccepted === true && (
                        <PEButton
                            onClick={(): void => setShowDeclineDialog(true)}
                            title={translateGlobalBookingRequest('decline')}
                            size="s"
                        />
                    )}
                </HStack>
            )}

            {bookingRequest.status === 'PENDING' && (
                <PETextField
                    value={newMessage}
                    onChange={setNewMessage}
                    type="text"
                    disabled={createMessageLoading}
                    endContent={
                        <Button
                            onClick={(): void =>
                                void createMessage({
                                    variables: {
                                        userId,
                                        bookingRequestId: bookingRequest.bookingRequestId,
                                        request: { message: newMessage },
                                    },
                                }).then((result) => {
                                    if (!result.data?.users.bookingRequests.chatMessages.success) return;
                                    setNewMessage('');
                                })
                            }
                        >
                            {translateGlobalBookingRequest('send')}
                        </Button>
                    }
                />
            )}

            <LoadingDialog title={cookProfileTranslate('booking-loading-title-accept')} isLoading={acceptLoading} />

            <LoadingDialog title={cookProfileTranslate('booking-loading-title-decline')} isLoading={declineLoading} />

            <BookingRequestDeclineDialog
                isOpen={showDeclineDialog}
                onCancel={(): void => setShowDeclineDialog(false)}
                onDecline={(): void =>
                    void declineBookingRequest({
                        variables: { userId, bookingRequestId: bookingRequest.bookingRequestId },
                    }).then((result) => {
                        setShowDeclineDialog(false);
                        if (result.data?.users.bookingRequests.success) onUpdateRequired();
                    })
                }
            />

            <BookingRequestAcceptDialog
                isOpen={showAcceptDialog}
                onCancel={(): void => setShowAcceptDialog(false)}
                onAccept={(): void =>
                    void acceptBookingRequest({
                        variables: { userId, bookingRequestId: bookingRequest.bookingRequestId },
                    }).then((result) => {
                        setShowAcceptDialog(false);
                        if (result.data?.users.bookingRequests.success) onUpdateRequired();
                    })
                }
            />
        </VStack>
    );
}
