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
        imageUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        location: 'Berlin',
        rank: 'Home',
        rating: { count: 25, average: 11 },
    },
};

export const BigWithoutChef: StoryObj<typeof PEChefCard> = {
    args: {
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        name: 'Maximilian',
        location: 'Berlin',
        rank: 'Home',
        rating: { count: 25, average: 4.9 },
    },
};

export const SmallWithChef: StoryObj<typeof PEChefCard> = {
    args: {
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        name: 'Maximilian',
        imageUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        location: 'Berlin',
        rank: 'Home',
        rating: { count: 25, average: 4.9 },
        menus: ['European', 'Australia', 'Midland'],
    },
};

export const SmallWithoutChef: StoryObj<typeof PEChefCard> = {
    args: {
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        name: 'Maximilian',
        location: 'Berlin',
        rank: 'home',
        rating: { count: 25, average: 4.9 },
        menus: ['European', 'Australia', 'Midland'],
    },
};
