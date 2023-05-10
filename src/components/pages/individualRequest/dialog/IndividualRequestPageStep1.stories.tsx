import type { Meta, StoryObj } from '@storybook/react';
import IndividualRequestPageDialog from './IndividualRequestPageDialog';

const meta: Meta<typeof IndividualRequestPageDialog> = {
    title: 'Individual Request Page/Dialog',
    component: IndividualRequestPageDialog,
};

export default meta;

export const Success: StoryObj<typeof IndividualRequestPageDialog> = {
    args: {
        state: 'SUCCESS',
    },
};

export const Error: StoryObj<typeof IndividualRequestPageDialog> = {
    args: {
        state: 'ERROR',
    },
};

export const Loading: StoryObj<typeof IndividualRequestPageDialog> = {
    args: {
        state: 'LOADING',
    },
};
