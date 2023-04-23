import type { Meta, StoryObj } from '@storybook/react';
import SignInPage from '.';

const meta: Meta<typeof SignInPage> = {
    title: 'Pages/Sign In',
    component: SignInPage,
};

export default meta;

export const Component: StoryObj<typeof SignInPage> = {
    args: {},
};
