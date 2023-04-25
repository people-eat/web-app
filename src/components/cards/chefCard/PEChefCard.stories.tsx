import type { Meta, StoryObj } from '@storybook/react';
import PEChefCard from './PEChefCard';

const meta: Meta<typeof PEChefCard> = {
    title: 'Cards/PEChefCard',
    component: PEChefCard,
};

export default meta;

export const BigWithChef: StoryObj<typeof PEChefCard> = {
    args: {
        kitchensList: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        chefName: 'Maximilian',
        image: '/chef.png',
        city: 'Berlin',
        estimation: '4.9',
        voices: '25',
    },
};

export const BigWithoutChef: StoryObj<typeof PEChefCard> = {
    args: {
        kitchensList: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        chefName: 'Maximilian',
        city: 'Berlin',
        estimation: '4.9',
        voices: '25',
    },
};

export const SmallWithChef: StoryObj<typeof PEChefCard> = {
    args: {
        kitchensList: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        chefName: 'Maximilian',
        image: '/chef.png',
        city: 'Berlin',
        size: 's',
        estimation: '4.9',
        voices: '25',
        dishesList: ['European', 'Australia', 'Midland'],
    },
};

export const SmallWithoutChef: StoryObj<typeof PEChefCard> = {
    args: {
        kitchensList: ['halal', 'european', 'halal', 'european', 'halal', 'european', 'greek'],
        chefName: 'Maximilian',
        city: 'Berlin',
        size: 's',
        estimation: '4.9',
        voices: '25',
        dishesList: ['European', 'Australia', 'Midland'],
    },
};
