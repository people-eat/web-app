import type { Meta, StoryObj } from '@storybook/react';
import PEChefCard from './PEChefCard';

const meta: Meta<typeof PEChefCard> = {
    title: 'Standard Components/PEChefCard',
    component: PEChefCard,
};

export default meta;

export const BigWithChef: StoryObj<typeof PEChefCard> = {
    args: {
        kitchensList: ['halal', 'eropean', 'halal', 'eropean', 'halal', 'eropean', 'geengo'],
        chefName: 'Maximilian',
        image: '/chef.png',
        city: 'Berlin',
        estimation: '4.9',
        voices: '25',
    },
};

export const BigWithoutChef: StoryObj<typeof PEChefCard> = {
    args: {
        kitchensList: ['halal', 'eropean', 'halal', 'eropean', 'halal', 'eropean', 'geengo'],
        chefName: 'Maximilian',
        city: 'Berlin',
        estimation: '4.9',
        voices: '25',
    },
};

export const SmallWithChef: StoryObj<typeof PEChefCard> = {
    args: {
        kitchensList: ['halal', 'eropean', 'halal', 'eropean', 'halal', 'eropean', 'geengo'],
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
        kitchensList: ['halal', 'eropean', 'halal', 'eropean', 'halal', 'eropean', 'geengo'],
        chefName: 'Maximilian',
        city: 'Berlin',
        size: 's',
        estimation: '4.9',
        voices: '25',
        dishesList: ['European', 'Australia', 'Midland'],
    },
};
