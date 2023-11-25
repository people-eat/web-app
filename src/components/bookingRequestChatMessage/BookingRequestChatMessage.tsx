import moment from 'moment';
import { type ReactElement } from 'react';
import { type ChatMessageFragment } from '../../data-source/generated/graphql';
import HStack from '../utility/hStack/HStack';
import Spacer from '../utility/spacer/Spacer';
import VStack from '../utility/vStack/VStack';

export interface BookingRequestChatMessageProps {
    type: 'RECEIVED' | 'SENT';
    chatMessage: ChatMessageFragment;
}

export function BookingRequestChatMessage({ type, chatMessage }: BookingRequestChatMessageProps): ReactElement {
    return (
        <HStack className="w-full">
            {type === 'SENT' && <Spacer />}
            <VStack gap={8} style={{ alignItems: type === 'SENT' ? 'flex-end' : 'flex-start' }}>
                <span style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>{chatMessage.message}</span>
                <span className="text-text-s">{moment(chatMessage.createdAt).format('lll')}</span>
            </VStack>
            {type === 'RECEIVED' && <Spacer />}
        </HStack>
    );
}
