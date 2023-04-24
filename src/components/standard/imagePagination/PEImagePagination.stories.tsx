import type { Meta, StoryObj } from '@storybook/react';
import PEImagePagination from './PEImagePagination';

const meta: Meta<typeof PEImagePagination> = {
    title: 'Standard Components/PEImagePagination',
    component: PEImagePagination,
};

export default meta;

export const Component: StoryObj<typeof PEImagePagination> = {
    args: {
        currentIndex: 1,
        length: 5,
    },
};
