import { useQuery } from '@apollo/client';
import moment from 'moment';
import { type ReactElement } from 'react';
import { FindManyUserBookingRequestChatMessagesDocument } from '../../../../data-source/generated/graphql';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

export interface ProfilePageBookingsChatMessagesProps {
    userId: string;
    bookingRequestId: string;
}

export default function ProfilePageBookingsChatMessages({ userId, bookingRequestId }: ProfilePageBookingsChatMessagesProps): ReactElement {
    const { data } = useQuery(FindManyUserBookingRequestChatMessagesDocument, { variables: { userId, bookingRequestId } });

    const chatMessages = data?.users.bookingRequests.chatMessages.findMany;

    if (!chatMessages) return <></>;

    const sortedChatMessages = chatMessages.map((chatMessage) => ({ ...chatMessage }));

    sortedChatMessages.sort((chatMessageA, chatMessageB): number => moment(chatMessageA.createdAt).diff(moment(chatMessageB.createdAt)));

    return (
        <VStack gap={32} style={{ width: '100%', maxHeight: 600, overflowY: 'scroll' }}>
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
        </VStack>
    );
}
