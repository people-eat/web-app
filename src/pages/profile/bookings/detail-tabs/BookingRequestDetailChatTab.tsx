import { useMutation } from '@apollo/client';
import { Button, CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import ProfilePageBookingsChatMessages from '../../../../components/pages/profile/bookingsTab/ProfilePageBookingsChatMessages';
import PEButton from '../../../../components/standard/buttons/PEButton';
import PETextField from '../../../../components/standard/textFields/PETextField';
import HStack from '../../../../components/utility/hStack/HStack';
import VStack from '../../../../components/utility/vStack/VStack';
import {
    CreateOneUserBookingRequestChatMessageDocument,
    UserBookingRequestAcceptDocument,
    UserBookingRequestDeclineDocument,
    type BookingRequestStatus,
} from '../../../../data-source/generated/graphql';

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
        <VStack style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>
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

            <Dialog open={acceptLoading}>
                <DialogTitle>{cookProfileTranslate('booking-loading-title-accept')}</DialogTitle>
                <DialogContent>
                    <VStack>
                        <CircularProgress />
                    </VStack>
                </DialogContent>
            </Dialog>

            <Dialog open={declineLoading}>
                <DialogTitle>{cookProfileTranslate('booking-loading-title-decline')}</DialogTitle>
                <DialogContent>
                    <VStack>
                        <CircularProgress />
                    </VStack>
                </DialogContent>
            </Dialog>

            <Dialog open={showDeclineDialog}>
                <DialogTitle>Bist du dir sicher dass du die Buchungsanfrage ablehnen möchtest?</DialogTitle>
                <DialogContent>
                    <VStack className="w-full" gap={32}>
                        <span>
                            Bitte beachte unsere Stornierungsbedingungen bevor du die Buchungsanfrage ablehnst. Diese findest du in unseren{' '}
                            <Link href="terms-and-conditions" target="_blank" className="text-orange">
                                AGB
                            </Link>
                            .
                        </span>
                        <HStack gap={16} className="w-full">
                            <PEButton title="Nein" type="secondary" onClick={(): void => setShowDeclineDialog(false)} />
                            <PEButton
                                title="Ja"
                                type="primary"
                                onClick={(): void =>
                                    void declineBookingRequest({
                                        variables: { userId, bookingRequestId: bookingRequest.bookingRequestId },
                                    }).then((result) => {
                                        setShowDeclineDialog(false);
                                        if (result.data?.users.bookingRequests.success) onUpdateRequired();
                                    })
                                }
                            />
                        </HStack>
                    </VStack>
                </DialogContent>
            </Dialog>

            <Dialog open={showAcceptDialog}>
                <DialogTitle>Buchungsanfrage akzeptieren?</DialogTitle>
                <DialogContent>
                    <VStack className="w-full" gap={32}>
                        <span>Wir freuen uns dass du die Buchungsanfrage annehmen möchtest.</span>
                        <HStack gap={16} className="w-full">
                            <PEButton title="Nein" type="secondary" onClick={(): void => setShowAcceptDialog(false)} />
                            <PEButton
                                title="Ja"
                                type="primary"
                                onClick={(): void =>
                                    void acceptBookingRequest({
                                        variables: { userId, bookingRequestId: bookingRequest.bookingRequestId },
                                    }).then((result) => {
                                        setShowAcceptDialog(false);
                                        if (result.data?.users.bookingRequests.success) onUpdateRequired();
                                    })
                                }
                            />
                        </HStack>
                    </VStack>
                </DialogContent>
            </Dialog>
        </VStack>
    );
}
