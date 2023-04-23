import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatImagePagination from './PeopleEatImagePagination';

const meta: Meta<typeof PeopleEatImagePagination> = {
    title: 'Standard Components/PeopleEatImagePagination',
    component: PeopleEatImagePagination,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatImagePagination> = {
    args: {},
};
