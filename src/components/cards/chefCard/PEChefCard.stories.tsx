import type { Meta, StoryObj } from '@storybook/react';
import PEChefCard from './PEChefCard';

const meta: Meta<typeof PEChefCard> = {
    title: 'Cards/PEChefCard',
    component: PEChefCard,
};

export default meta;

export const BigWithChef: StoryObj<typeof PEChefCard> = {
    args: {
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        name: 'Maximilian',
        imageUrl: '/chef.png',
        location: 'Berlin',
        rank: '4.9',
        rating: { count: 25 },
    },
};

export const BigWithoutChef: StoryObj<typeof PEChefCard> = {
    args: {
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        name: 'Maximilian',
        location: 'Berlin',
        rank: '4.9',
        rating: { count: 25 },
    },
};

export const SmallWithChef: StoryObj<typeof PEChefCard> = {
    args: {
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        name: 'Maximilian',
        imageUrl: '/chef.png',
        location: 'Berlin',
        size: 's',
        rank: '4.9',
        rating: { count: 25 },
        menus: ['European', 'Australia', 'Midland'],
    },
};

export const SmallWithoutChef: StoryObj<typeof PEChefCard> = {
    args: {
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        name: 'Maximilian',
        location: 'Berlin',
        size: 's',
        rank: '4.9',
        rating: { count: 25 },
        menus: ['European', 'Australia', 'Midland'],
    },
};
