import type { Meta, StoryObj } from '@storybook/react';
import PEReviewCardPlatform from './PEReviewCardPlatform';

const meta: Meta<typeof PEReviewCardPlatform> = {
    title: 'Cards/PEReviewCardPlatform',
    component: PEReviewCardPlatform,
};

export default meta;

export const Component: StoryObj<typeof PEReviewCardPlatform> = {
    args: {
        chefName: 'Maximilian',
        position: 'Cool event',
        rank: '4.9',
        date: 'June, 14 2023 ',
        description: 'PEReviewCardPlatform description',
        location: 'Berlin',
    },
};
