import type { Meta, StoryObj } from '@storybook/react';
import SignUpPage from '.';

const meta: Meta<typeof SignUpPage> = {
    title: 'Pages/Sign Up',
    component: SignUpPage,
};

export default meta;

export const Component: StoryObj<typeof SignUpPage> = {
    args: {},
};
