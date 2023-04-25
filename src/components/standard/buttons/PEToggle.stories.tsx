import type { Meta, StoryObj } from '@storybook/react';
import PEToggle from './PEToggle';

const meta: Meta<typeof PEToggle> = {
    title: 'Standard Components/PEToggle',
    component: PEToggle,
};

export default meta;

export const ButtonChef: StoryObj<typeof PEToggle> = {
    args: {
        active: false,
        onClick: (): void => undefined,
        title: 'Chef',
    },
};

export const ButtonMenu: StoryObj<typeof PEToggle> = {
    args: {
        active: true,
        onClick: (): void => undefined,
        title: 'Menu',
    },
};
