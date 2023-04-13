import type { Meta, StoryObj } from '@storybook/react';
import PEChatCard from './PEChatCard';

const meta: Meta<typeof PEChatCard> = {
    title: 'Standard Components/PEChatCard',
    component: PEChatCard,
};

export default meta;

export const Component: StoryObj<typeof PEChatCard> = {
    args: {},
};
