import type { Meta, StoryObj } from '@storybook/react';
import PEReviewCardPlatform from './PEReviewCardPlatform';

const meta: Meta<typeof PEReviewCardPlatform> = {
    title: 'Cards/PEReviewCardPlatform',
    component: PEReviewCardPlatform,
};

export default meta;

export const Component: StoryObj<typeof PEReviewCardPlatform> = {
    args: {
        userFirstName: 'Maximilian',
        userProfilePictureUrl: 'https://prykoly.ru/wp-content/uploads/2019/11/Chef9.jpg',
        ratingValue: '4.9',
        occasion: 'Birthday',
        location: 'Berlin',
        comment: 'Thank you for the amazing experience.',
    },
};

export const WithoutImage: StoryObj<typeof PEReviewCardPlatform> = {
    args: {
        userFirstName: 'Maximilian',
        userProfilePictureUrl: undefined,
        ratingValue: '4.9',
        occasion: 'Birthday',
        location: 'Berlin',
        comment: 'Thank you for the amazing experience.',
    },
};

export const WithoutLongText: StoryObj<typeof PEReviewCardPlatform> = {
    args: {
        userFirstName: 'Maximilian',
        userProfilePictureUrl: undefined,
        ratingValue: '4.9',
        occasion: 'Birthday',
        location: 'Berlin',
        comment:
            'Thank you for the amazing experience. Thank you for the amazing experience. Thank you for the amazing experience. Thank you for the amazing experience. Thank you for the amazing experience. Thank you for the amazing experience. Thank you for the amazing experience. Thank you for the amazing experience. Thank you for the amazing experience. Thank you for the amazing experience.',
    },
};
