import type { Meta, StoryObj } from '@storybook/react';
import PEReviewCardMenu from './PEReviewCardMenu';

const meta: Meta<typeof PEReviewCardMenu> = {
    title: 'Cards/PEReviewCardMenu',
    component: PEReviewCardMenu,
};

export default meta;

export const Component: StoryObj<typeof PEReviewCardMenu> = {
    args: {
        chefFirstName: 'Maximilian',
        chefProfilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        chefRank: 'MASTER',
        customerFirstName: 'Alice',
        occasion: 'occasion',
        ratingValue: '4.9',
        comment: 'Thank you for the amazing experience.',
        createdAt: new Date().toDateString(),
        onClick: undefined,
    },
};

export const WithoutPicture: StoryObj<typeof PEReviewCardMenu> = {
    args: {
        chefFirstName: 'Maximilian',
        chefProfilePictureUrl: undefined,
        chefRank: 'MASTER',
        customerFirstName: 'Alice',
        occasion: 'occasion',
        ratingValue: '4.9',
        comment: 'Thank you for the amazing experience.',
        createdAt: new Date().toDateString(),
        onClick: undefined,
    },
};

export const WithLongText: StoryObj<typeof PEReviewCardMenu> = {
    args: {
        chefFirstName: 'Maximilian',
        chefProfilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        chefRank: 'MASTER',
        customerFirstName: 'Alice',
        occasion: 'occasion',
        ratingValue: '4.9',
        comment:
            'Thank you for the amazing experience. Thank you for the amazing experience. Thank you for the amazing experience. Thank you for the amazing experience. Thank you for the amazing experience.',
        createdAt: new Date().toDateString(),
        onClick: undefined,
    },
};
