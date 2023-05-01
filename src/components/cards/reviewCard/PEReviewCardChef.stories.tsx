import type { Meta, StoryObj } from '@storybook/react';
import PEReviewCardChef from './PEReviewCardChef';

const meta: Meta<typeof PEReviewCardChef> = {
    title: 'Cards/PEReviewCardChef',
    component: PEReviewCardChef,
};

export default meta;

export const Component: StoryObj<typeof PEReviewCardChef> = {
    args: {
        chefName: 'Maximilian',
        event: 'Cool event',
        rank: '4.9',
        date: 'June, 14 2023 ',
        description: 'PEReviewCardChef description',
    },
};
