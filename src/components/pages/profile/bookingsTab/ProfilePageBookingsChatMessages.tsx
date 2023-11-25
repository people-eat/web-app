import { useQuery, useSubscription } from '@apollo/client';
import moment from 'moment';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import {
    BookingRequestChatMessageCreationsDocument,
    FindManyUserBookingRequestChatMessagesDocument,
    type ChatMessageFragment,
} from '../../../../data-source/generated/graphql';
import { BookingRequestChatMessage } from '../../../bookingRequestChatMessage/BookingRequestChatMessage';
import VStack from '../../../utility/vStack/VStack';

export interface ProfilePageBookingsChatMessagesProps {
    userId: string;
    bookingRequestId: string;
}

export default function ProfilePageBookingsChatMessages({ userId, bookingRequestId }: ProfilePageBookingsChatMessagesProps): ReactElement {
    const { data } = useQuery(FindManyUserBookingRequestChatMessagesDocument, { variables: { userId, bookingRequestId } });
    const [chatMessages, setChatMessages] = useState<ChatMessageFragment[]>([]);

    const chatBottom = useRef<HTMLDivElement>(null);

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

    useSubscription(BookingRequestChatMessageCreationsDocument, {
        variables: { bookingRequestId },
        onData: ({ data: subscriptionData }) => {
            const newChatMessage = subscriptionData.data?.bookingRequestChatMessageCreations;
            if (!newChatMessage) return;
            setChatMessages([...chatMessages, newChatMessage]);
            setTimeout(() => scrollToChatBottom(), 200);
        },
    });

    const sortedChatMessages = chatMessages.map((chatMessage) => ({ ...chatMessage }));

    sortedChatMessages.sort((chatMessageA, chatMessageB): number => moment(chatMessageA.createdAt).diff(moment(chatMessageB.createdAt)));

    return (
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
    );
}
