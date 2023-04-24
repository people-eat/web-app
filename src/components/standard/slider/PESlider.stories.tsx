import type { Meta, StoryObj } from '@storybook/react';
import PESlider from './PESlider';

const meta: Meta<typeof PESlider> = {
    title: 'Standard Components/PESlider',
    component: PESlider,
};

export default meta;

export const Component: StoryObj<typeof PESlider> = {
    args: {},
};
