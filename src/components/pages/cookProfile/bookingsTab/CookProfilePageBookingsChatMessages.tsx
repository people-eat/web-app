import { useQuery, useSubscription } from '@apollo/client';
import moment from 'moment';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import {
    BookingRequestChatMessageCreationsDocument,
    FindManyCookBookingRequestChatMessagesDocument,
    type ChatMessageFragment,
} from '../../../../data-source/generated/graphql';
import { BookingRequestChatMessage } from '../../../bookingRequestChatMessage/BookingRequestChatMessage';
import VStack from '../../../utility/vStack/VStack';

export interface CookProfilePageBookingsChatMessagesProps {
    cookId: string;
    bookingRequestId: string;
}

export default function CookProfilePageBookingsChatMessages({
    cookId,
    bookingRequestId,
}: CookProfilePageBookingsChatMessagesProps): ReactElement {
    const { data } = useQuery(FindManyCookBookingRequestChatMessagesDocument, { variables: { cookId, bookingRequestId } });
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
        const fetchedChatMessages = data?.cooks.bookingRequests.chatMessages.findMany;
        if (fetchedChatMessages) setChatMessages(fetchedChatMessages);
        setTimeout(() => scrollToChatBottom(), 200);
    }, [data]);

    useEffect(scrollToChatBottom, []);

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
        <VStack gap={32} style={{ width: '100%', maxHeight: 600, overflowY: 'scroll', minHeight: 400 }}>
            {sortedChatMessages.map((chatMessage) => (
                <BookingRequestChatMessage
                    key={chatMessage.chatMessageId}
                    type={cookId === chatMessage.createdBy ? 'SENT' : 'RECEIVED'}
                    chatMessage={chatMessage}
                />
            ))}
            <div data-element="chat-bottom" ref={chatBottom} />
        </VStack>
    );
}
