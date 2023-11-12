import { useQuery, useSubscription } from '@apollo/client';
import moment from 'moment';
import { useEffect, useRef, useState, type ReactElement } from 'react';
import {
    BookingRequestChatMessageCreationsDocument,
    FindManyUserBookingRequestChatMessagesDocument,
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

export interface ProfilePageBookingsChatMessagesProps {
    userId: string;
    bookingRequestId: string;
}

export default function ProfilePageBookingsChatMessages({ userId, bookingRequestId }: ProfilePageBookingsChatMessagesProps): ReactElement {
    const { data } = useQuery(FindManyUserBookingRequestChatMessagesDocument, { variables: { userId, bookingRequestId } });
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
        <VStack gap={32} style={{ width: '100%', overflowY: 'auto' }}>
            {sortedChatMessages.map((chatMessage) => (
                <HStack key={chatMessage.chatMessageId} className="w-full">
                    {userId === chatMessage.createdBy && <Spacer />}
                    <VStack gap={8} style={{ alignItems: userId === chatMessage.createdBy ? 'flex-end' : 'flex-start' }}>
                        <span style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>{chatMessage.message}</span>
                        <span className="text-text-s">{moment(chatMessage.createdAt).format('lll')}</span>
                    </VStack>
                    {userId !== chatMessage.createdBy && <Spacer />}
                </HStack>
            ))}
            <div data-element="chat-bottom" ref={chatBottom} />
        </VStack>
    );
}
