import type { Meta, StoryObj } from '@storybook/react';
import PEMenuCard from './PEMenuCard';

const meta: Meta<typeof PEMenuCard> = {
    title: 'Cards/PEMenuCard',
    component: PEMenuCard,
};

export default meta;

export const Component: StoryObj<typeof PEMenuCard> = {
    args: {
        pricePerPerson: 12,
        kitchens: ['kitchen-1', 'kitchen-2', 'kitchen-3'],
        pictures: [
            'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
            'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
            'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        ],
        chefPicture: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        categories: ['category-1', 'category-2', 'category-3'],
        description: 'Menu description',
        title: 'Menu title',
        chefName: 'Loren',
    },
};
