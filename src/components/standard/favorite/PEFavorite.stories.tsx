import type { Meta, StoryObj } from '@storybook/react';
import PEFavorite from './PEFavorite';

const meta: Meta<typeof PEFavorite> = {
    title: 'Standard Components/PEFavorite',
    component: PEFavorite,
};

export default meta;

export const Component: StoryObj<typeof PEFavorite> = {
    args: {},
};
