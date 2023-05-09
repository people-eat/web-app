import type { Meta, StoryObj } from '@storybook/react';
import PEReviewCardChef from './PEReviewCardChef';

const meta: Meta<typeof PEReviewCardChef> = {
    title: 'Cards/Rating/PEReviewCardChef',
    component: PEReviewCardChef,
};

export default meta;

export const Component: StoryObj<typeof PEReviewCardChef> = {
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

export const WithoutPicture: StoryObj<typeof PEReviewCardChef> = {
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

export const WithLongText: StoryObj<typeof PEReviewCardChef> = {
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
