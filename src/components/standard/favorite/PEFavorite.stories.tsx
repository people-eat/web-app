/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import PEFavorite from './PEFavorite';

const meta: Meta<typeof PEFavorite> = {
    title: 'Standard Components/PEFavorite',
    component: PEFavorite,
};

export default meta;

export const Favorite: StoryObj<typeof PEFavorite> = {
    args: {},
    render() {
        const [isFavorite, setIsFavorite] = useState(true);

        return <PEFavorite isFavorite={isFavorite} onIsFavoriteChange={setIsFavorite} />;
    },
};

export const NoFavorite: StoryObj<typeof PEFavorite> = {
    args: {},
    render() {
        const [isFavorite, setIsFavorite] = useState(false);

        return <PEFavorite isFavorite={isFavorite} onIsFavoriteChange={setIsFavorite} />;
    },
};
