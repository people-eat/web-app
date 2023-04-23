import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatSlider from './PeopleEatSlider';

const meta: Meta<typeof PeopleEatSlider> = {
    title: 'Standard Components/PeopleEatSlider',
    component: PeopleEatSlider,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatSlider> = {
    args: {},
};
