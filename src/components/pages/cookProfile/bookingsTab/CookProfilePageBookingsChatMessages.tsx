import { useQuery } from '@apollo/client';
import moment from 'moment';
import { type ReactElement } from 'react';
import { FindManyCookBookingRequestChatMessagesDocument } from '../../../../data-source/generated/graphql';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
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

    const chatMessages = data?.cooks.bookingRequests.chatMessages.findMany;

    if (!chatMessages) return <></>;

    const sortedChatMessages = chatMessages.map((chatMessage) => ({ ...chatMessage }));

    sortedChatMessages.sort((chatMessageA, chatMessageB): number => moment(chatMessageA.createdAt).diff(moment(chatMessageB.createdAt)));

    return (
        <VStack gap={32} style={{ width: '100%', maxHeight: 600, overflowY: 'scroll' }}>
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
        </VStack>
    );
}
