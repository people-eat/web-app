import type { Meta, StoryObj } from '@storybook/react';
import PEChefCard from './PEChefCard';

const meta: Meta<typeof PEChefCard> = {
    title: 'Cards/PEChefCard',
    component: PEChefCard,
};

export default meta;

export const BigWithChef: StoryObj<typeof PEChefCard> = {
    args: {
        firstName: 'Maximilian',
        profilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        rank: 'HOBBY',
        location: 'Berlin',
        rating: { count: 25, average: 11 },
        kitchens: [],
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
    },
};

export const BigWithoutChef: StoryObj<typeof PEChefCard> = {
    args: {
        firstName: 'Maximilian',
        profilePictureUrl: undefined,
        rank: 'HOBBY',
        location: 'Berlin',
        rating: { count: 25, average: 4.9 },
        kitchens: [],
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
    },
};

export const SmallWithChef: StoryObj<typeof PEChefCard> = {
    args: {
        firstName: 'Maximilian',
        profilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        location: 'Berlin',
        rank: 'HOBBY',
        rating: { count: 25, average: 4.9 },
        kitchens: ['European', 'Australia', 'Midland'],
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
    },
};

export const SmallWithoutChef: StoryObj<typeof PEChefCard> = {
    args: {
        firstName: 'Maximilian',
        profilePictureUrl: undefined,
        rank: 'HOBBY',
        location: 'Berlin',
        rating: { count: 25, average: 4.9 },
        kitchens: ['European', 'Australia', 'Midland'],
        categories: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
    },
};
