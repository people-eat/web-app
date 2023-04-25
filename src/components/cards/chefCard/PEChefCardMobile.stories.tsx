import type { Meta, StoryObj } from '@storybook/react';
import PEChefCardMobile from './PEChefCardMobile';

const meta: Meta<typeof PEChefCardMobile> = {
    title: 'Cards/PEChefCardMobile',
    component: PEChefCardMobile,
};

export default meta;

export const Component: StoryObj<typeof PEChefCardMobile> = {
    args: {
        firstName: 'Maximilian',
        profilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        rank: 'MASTER',
        location: 'Berlin',
        rating: { count: 25, average: 4.9 },
        kitchens: [],
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
    },
};
