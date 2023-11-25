import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { Button } from '@mui/material';
import classNames from 'classnames';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import {
    BookingRequestChatMessageCreationsDocument,
    CreateOneUserBookingRequestChatMessageDocument,
    FindManyUserBookingRequestChatMessagesDocument,
    UserBookingRequestAcceptDocument,
    UserBookingRequestDeclineDocument,
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
import styles from './BookingRequestDetailChatTab.module.css';

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

// eslint-disable-next-line max-statements
export default function BookingRequestDetailChatTab({
    userId,
    bookingRequest,
    onUpdateRequired,
}: BookingRequestDetailChatTabProps): ReactElement {
    const { t: translateGlobalBookingRequest } = useTranslation('global-booking-request');
    const { t: cookProfileTranslate } = useTranslation('chef-profile');

    const chatBottom = useRef<HTMLDivElement>(null);

    const [chatMessages, setChatMessages] = useState<ChatMessageFragment[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [showAcceptDialog, setShowAcceptDialog] = useState(false);
    const [showDeclineDialog, setShowDeclineDialog] = useState(false);

    const [acceptBookingRequest, { loading: acceptLoading }] = useMutation(UserBookingRequestAcceptDocument);
    const [declineBookingRequest, { loading: declineLoading }] = useMutation(UserBookingRequestDeclineDocument);
    const [createMessage, { loading: createMessageLoading }] = useMutation(CreateOneUserBookingRequestChatMessageDocument);
    const { data } = useQuery(FindManyUserBookingRequestChatMessagesDocument, {
        variables: { userId, bookingRequestId: bookingRequest.bookingRequestId },
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
        const fetchedChatMessages = data?.users.bookingRequests.chatMessages.findMany;
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
                        type={userId === chatMessage.createdBy ? 'SENT' : 'RECEIVED'}
                        chatMessage={chatMessage}
                    />
                ))}
                <div data-element="chat-bottom" ref={chatBottom} />
            </VStack>

            {bookingRequest.status === 'OPEN' && (
                <HStack gap={16} className={classNames('w-full', styles.attachedToBottomOnMobile)}>
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
