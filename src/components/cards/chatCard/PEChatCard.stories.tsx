import type { Meta, StoryObj } from '@storybook/react';
import PEChatCard from './PEChatCard';

const meta: Meta<typeof PEChatCard> = {
    title: 'Cards/PEChatCard',
    component: PEChatCard,
};

export default meta;

export const Component: StoryObj<typeof PEChatCard> = {
    args: {
        label: 'upcoming',
        menuTitle: 'Menu Title',
        date: '01. January 2023',
        time: '14:00 pm',
        place: 'Mannheim',
        userName: 'Maximilian',
        lastDateActive: 'last active',
    },
};
