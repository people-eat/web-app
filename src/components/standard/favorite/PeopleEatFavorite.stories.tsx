import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatFavorite from './PeopleEatFavorite';

const meta: Meta<typeof PeopleEatFavorite> = {
    title: 'Standard Components/PeopleEatFavorite',
    component: PeopleEatFavorite,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatFavorite> = {
    args: {},
};
