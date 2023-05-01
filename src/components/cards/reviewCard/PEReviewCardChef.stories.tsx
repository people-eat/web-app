import type { Meta, StoryObj } from '@storybook/react';
import PEReviewCardChef from './PEReviewCardChef';

const meta: Meta<typeof PEReviewCardChef> = {
    title: 'Cards/PEReviewCardChef',
    component: PEReviewCardChef,
};

export default meta;

export const Component: StoryObj<typeof PEReviewCardChef> = {
    args: {
        chefFirstName: 'Maximilian',
        chefProfilePictureUrl: undefined,
        chefRank: 'MASTER',
        customerFirstName: 'Alice',
        occasion: 'occasion',
        ratingValue: '4.9',
        comment: 'Thank you for the amazing experience.',
        createdAt: new Date().toDateString(),
    },
};
