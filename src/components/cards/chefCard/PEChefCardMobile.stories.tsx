import type { Meta, StoryObj } from '@storybook/react';
import PEChefCardMobile from './PEChefCardMobile';

const meta: Meta<typeof PEChefCardMobile> = {
    title: 'Cards/PEChefCardMobile',
    component: PEChefCardMobile,
};

export default meta;

export const Component: StoryObj<typeof PEChefCardMobile> = {
    args: {
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        name: 'Maximilian',
        imageUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        location: 'Berlin',
        rank: 'Home',
        rating: { count: 25, average: 4.9 },
    },
};
