import type { Meta, StoryObj } from '@storybook/react';
import PEMenuCardMobile from './PEMenuCardMobile';

const meta: Meta<typeof PEMenuCardMobile> = {
    title: 'Cards/Menu/PEMenuCardMobile',
    component: PEMenuCardMobile,
};

export default meta;

export const Component: StoryObj<typeof PEMenuCardMobile> = {
    args: {
        title: 'Menu title',
        description: 'Menu description',
        imageUrls: [
            'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
            'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
            'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        ],
        pricePerPerson: 12,
        chefFirstName: 'Loren',
        chefProfilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        categories: ['category-1', 'category-2', 'category-3'],
        kitchen: 'kitchen-1',
        onClick: undefined,
    },
};

export const WithOneImage: StoryObj<typeof PEMenuCardMobile> = {
    args: {
        title: 'Menu title',
        description: 'Menu description',
        imageUrls: ['https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg'],
        pricePerPerson: 12,
        chefFirstName: 'Loren',
        chefProfilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        categories: ['category-1', 'category-2', 'category-3'],
        kitchen: 'kitchen-1',
        onClick: undefined,
    },
};

export const WithOutImages: StoryObj<typeof PEMenuCardMobile> = {
    args: {
        title: 'Menu title',
        description: 'Menu description',
        imageUrls: [],
        pricePerPerson: 12,
        chefFirstName: 'Loren',
        chefProfilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        categories: ['category-1', 'category-2', 'category-3'],
        kitchen: 'kitchen-1',
        onClick: undefined,
    },
};

export const WithChefPicture: StoryObj<typeof PEMenuCardMobile> = {
    args: {
        title: 'Menu title',
        description: 'Menu description',
        imageUrls: ['https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg'],
        pricePerPerson: 12,
        chefFirstName: 'Loren',
        chefProfilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        categories: ['category-1', 'category-2', 'category-3'],
        kitchen: 'kitchen-1',
        onClick: undefined,
    },
};

export const WithoutChefPicture: StoryObj<typeof PEMenuCardMobile> = {
    args: {
        title: 'Menu title',
        description: 'Menu description',
        imageUrls: ['https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg'],
        pricePerPerson: 12,
        chefFirstName: 'Loren',
        chefProfilePictureUrl: undefined,
        categories: ['category-1', 'category-2', 'category-3'],
        kitchen: 'kitchen-1',
        onClick: undefined,
    },
};

export const WithKitchen: StoryObj<typeof PEMenuCardMobile> = {
    args: {
        title: 'Menu title',
        description: 'Menu description',
        imageUrls: ['https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg'],
        pricePerPerson: 12,
        chefFirstName: 'Loren',
        chefProfilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        categories: ['category-1', 'category-2', 'category-3'],
        kitchen: 'kitchen-1',
        onClick: undefined,
    },
};

export const WithoutKitchen: StoryObj<typeof PEMenuCardMobile> = {
    args: {
        title: 'Menu title',
        description: 'Menu description',
        imageUrls: ['https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg'],
        pricePerPerson: 12,
        chefFirstName: 'Loren',
        chefProfilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        categories: ['category-1', 'category-2', 'category-3'],
        kitchen: undefined,
        onClick: undefined,
    },
};
