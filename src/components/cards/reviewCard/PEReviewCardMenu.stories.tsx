import type { Meta, StoryObj } from '@storybook/react';
import PEReviewCardMenu from './PEReviewCardMenu';

const meta: Meta<typeof PEReviewCardMenu> = {
    title: 'Cards/PEReviewCardMenu',
    component: PEReviewCardMenu,
};

export default meta;

export const Component: StoryObj<typeof PEReviewCardMenu> = {
    args: {
        chefName: 'Maximilian',
        event: 'Cool event',
        rank: '4.9',
        date: 'June, 14 2023 ',
        description: 'PEReviewCardMenu description',
    },
};
