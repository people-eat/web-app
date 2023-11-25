import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import {
    BookingRequestChatMessageCreationsDocument,
    CookBookingRequestAcceptDocument,
    CookBookingRequestDeclineDocument,
    CreateOneCookBookingRequestChatMessageDocument,
    FindManyCookBookingRequestChatMessagesDocument,
    type BookingRequestStatus,
    type ChatMessageFragment,
} from '../../../data-source/generated/graphql';
import { BookingRequestAcceptDialog } from '../../bookingRequestAcceptDialog/BookingRequestAcceptDialog';
import { BookingRequestChatMessage } from '../../bookingRequestChatMessage/BookingRequestChatMessage';
import { BookingRequestDeclineDialog } from '../../bookingRequestDeclineDialog/BookingRequestDeclineDialog';
import { LoadingDialog } from '../../loadingDialog/LoadingDialog';
import PEButton from '../../standard/buttons/PEButton';
import PETextField from '../../standard/textFields/PETextField';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import styles from './CookBookingRequestDetailChatTab.module.css';

export interface CookBookingRequestDetailChatTabProps {
    cookId: string;
    cookHasStripePayoutMethodActivated: boolean;
    bookingRequest: {
        bookingRequestId: string;
        userAccepted?: boolean | null;
        cookAccepted?: boolean | null;
        status: BookingRequestStatus;
    };
    onUpdateRequired: () => void;
}

// eslint-disable-next-line max-statements
export function CookBookingRequestDetailChatTab({
    cookId,
    // use in this file
    cookHasStripePayoutMethodActivated,
    bookingRequest,
    onUpdateRequired,
}: CookBookingRequestDetailChatTabProps): ReactElement {
    const { t: translateGlobalBookingRequest } = useTranslation('global-booking-request');
    const { t: cookProfileTranslate } = useTranslation('chef-profile');

    const chatBottom = useRef<HTMLDivElement>(null);

    const [chatMessages, setChatMessages] = useState<ChatMessageFragment[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [showAcceptDialog, setShowAcceptDialog] = useState(false);
    const [showDeclineDialog, setShowDeclineDialog] = useState(false);
    const [showCompleteStripeOnboardingDialog, setShowCompleteStripeOnboardingDialog] = useState(false);

    const [acceptBookingRequest, { loading: acceptLoading }] = useMutation(CookBookingRequestAcceptDocument);
    const [declineBookingRequest, { loading: declineLoading }] = useMutation(CookBookingRequestDeclineDocument);
    const [createMessage, { loading: createMessageLoading }] = useMutation(CreateOneCookBookingRequestChatMessageDocument);
    const { data } = useQuery(FindManyCookBookingRequestChatMessagesDocument, {
        variables: { cookId, bookingRequestId: bookingRequest.bookingRequestId },
    });
    useSubscription(BookingRequestChatMessageCreationsDocument, {
        variables: { bookingRequestId: bookingRequest.bookingRequestId },
        onData: ({ data: subscriptionData }) => {
            const newChatMessage = subscriptionData.data?.bookingRequestChatMessageCreations;
            if (!newChatMessage) return;
            setChatMessages([...chatMessages, newChatMessage]);
            setTimeout(() => scrollToChatBottom(), 200);
        },
    });

    function scrollToChatBottom(): void {
        chatBottom.current?.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'center',
        });
    }

    useEffect(() => {
        const fetchedChatMessages = data?.cooks.bookingRequests.chatMessages.findMany;
        if (fetchedChatMessages) setChatMessages(fetchedChatMessages);
        setTimeout(() => scrollToChatBottom(), 200);
    }, [data]);

    useEffect(() => scrollToChatBottom(), []);

    const sortedChatMessages = chatMessages.map((chatMessage) => ({ ...chatMessage }));

    sortedChatMessages.sort((chatMessageA, chatMessageB): number => moment(chatMessageA.createdAt).diff(moment(chatMessageB.createdAt)));

    return (
        <VStack style={{ width: '100%', height: '100%', justifyContent: 'space-between', overflowY: 'auto' }}>
            <VStack gap={32} style={{ width: '100%', overflowY: 'auto' }}>
                {sortedChatMessages.map((chatMessage) => (
                    <BookingRequestChatMessage
                        key={chatMessage.chatMessageId}
                        type={cookId === chatMessage.createdBy ? 'SENT' : 'RECEIVED'}
                        chatMessage={chatMessage}
                    />
                ))}
                <div data-element="chat-bottom" ref={chatBottom} />
            </VStack>

            {bookingRequest.status === 'OPEN' && (
                <HStack gap={16} className={classNames('w-full', styles.attachedToBottomOnMobile)}>
                    {bookingRequest.cookAccepted === null && bookingRequest.userAccepted === true && (
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
                    {bookingRequest.cookAccepted === true && bookingRequest.userAccepted === null && (
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
                    className={styles.attachedToBottomOnMobile}
                    value={newMessage}
                    onChange={setNewMessage}
                    type="text"
                    disabled={createMessageLoading}
                    endContent={
                        <Button
                            onClick={(): void =>
                                void createMessage({
                                    variables: {
                                        cookId,
                                        bookingRequestId: bookingRequest.bookingRequestId,
                                        request: { message: newMessage },
                                    },
                                }).then((result) => {
                                    if (!result.data?.cooks.bookingRequests.chatMessages.success) return;
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
                        variables: { cookId, bookingRequestId: bookingRequest.bookingRequestId },
                    }).then((result) => {
                        setShowDeclineDialog(false);
                        if (result.data?.cooks.bookingRequests.success) onUpdateRequired();
                    })
                }
            />

            <BookingRequestAcceptDialog
                isOpen={showAcceptDialog}
                onCancel={(): void => setShowAcceptDialog(false)}
                onAccept={(): void => {
                    if (cookHasStripePayoutMethodActivated) {
                        void acceptBookingRequest({
                            variables: { cookId, bookingRequestId: bookingRequest.bookingRequestId },
                        }).then((result) => {
                            setShowAcceptDialog(false);
                            if (result.data?.cooks.bookingRequests.success) onUpdateRequired();
                        });
                    } else setShowCompleteStripeOnboardingDialog(true);
                }}
            />

            <Dialog open={showCompleteStripeOnboardingDialog} onClose={(): void => setShowCompleteStripeOnboardingDialog(false)}>
                <DialogTitle>Wallet hinzufügen um fortzufahren</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Um Buchungsanfragen zukünftig akzeptieren zu können, schließe die Einrichtung deines Kontos bitte ab.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button>Abbrechen</Button>
                    <Button variant="contained" autoFocus>
                        Wallet hinzufügen
                    </Button>
                </DialogActions>
            </Dialog>
        </VStack>
    );
}
