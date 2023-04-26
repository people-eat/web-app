import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../icon/Icon';
import PEButton from './PEButton';

const meta: Meta<typeof PEButton> = {
    title: 'Standard Components/PEButton',
    component: PEButton,
};

export default meta;

export const ButtonPrimary: StoryObj<typeof PEButton> = {
    args: {
        type: 'primary',
        size: 'm',
        onClick: (): void => undefined,
        title: 'click me!',
    },
};

export const ButtonSecondary: StoryObj<typeof PEButton> = {
    args: {
        type: 'secondary',
        size: 'l',
        onClick: (): void => undefined,
        title: 'click me!',
    },
};

export const ButtonPrimaryLoading: StoryObj<typeof PEButton> = {
    args: {
        type: 'primary',
        size: 'l',
        onClick: (): void => undefined,
        title: 'click me!',
        loading: true,
    },
};

export const ButtonPrimaryIcon: StoryObj<typeof PEButton> = {
    args: {
        type: 'primary',
        size: 'l',
        onClick: (): void => undefined,
        iconLeft: Icon.searchBar,
    },
};

export const ButtonSecondaryIcon: StoryObj<typeof PEButton> = {
    args: {
        type: 'secondary',
        size: 'l',
        onClick: (): void => undefined,
        iconLeft: Icon.search,
    },
};
