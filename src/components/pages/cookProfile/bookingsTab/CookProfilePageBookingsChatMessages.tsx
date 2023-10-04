import { useQuery, useSubscription } from '@apollo/client';
import moment from 'moment';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import {
    BookingRequestChatMessageCreationsDocument,
    FindManyCookBookingRequestChatMessagesDocument,
} from '../../../../data-source/generated/graphql';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

interface ChatMessage {
    chatMessageId: string;
    message: string;
    createdBy: string;
    createdAt: Date;
}

export interface CookProfilePageBookingsChatMessagesProps {
    cookId: string;
    bookingRequestId: string;
}

export default function CookProfilePageBookingsChatMessages({
    cookId,
    bookingRequestId,
}: CookProfilePageBookingsChatMessagesProps): ReactElement {
    const { data } = useQuery(FindManyCookBookingRequestChatMessagesDocument, { variables: { cookId, bookingRequestId } });
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

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
        onSubscriptionData: ({ subscriptionData }) => {
            const newChatMessage = subscriptionData.data?.bookingRequestChatMessageCreations;
            if (!newChatMessage) return;
            setChatMessages([
                ...chatMessages,
                {
                    chatMessageId: newChatMessage.chatMessageId,
                    message: newChatMessage.message,
                    createdBy: newChatMessage.createdBy,
                    createdAt: newChatMessage.createdAt,
                },
            ]);
            setTimeout(() => scrollToChatBottom(), 200);
        },
    });

    const sortedChatMessages = chatMessages.map((chatMessage) => ({ ...chatMessage }));

    sortedChatMessages.sort((chatMessageA, chatMessageB): number => moment(chatMessageA.createdAt).diff(moment(chatMessageB.createdAt)));

    return (
        <VStack gap={32} style={{ width: '100%', maxHeight: 600, overflowY: 'scroll', minHeight: 400 }}>
            {sortedChatMessages.map((chatMessage) => (
                <HStack key={chatMessage.chatMessageId} className="w-full">
                    {cookId === chatMessage.createdBy && <Spacer />}
                    <VStack gap={8} style={{ alignItems: cookId === chatMessage.createdBy ? 'flex-end' : 'flex-start' }}>
                        <span style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>{chatMessage.message}</span>
                        <span className="text-text-s">{moment(chatMessage.createdAt).format('lll')}</span>
                    </VStack>
                    {cookId !== chatMessage.createdBy && <Spacer />}
                </HStack>
            ))}
            <div data-element="chat-bottom" ref={chatBottom} />
        </VStack>
    );
}
