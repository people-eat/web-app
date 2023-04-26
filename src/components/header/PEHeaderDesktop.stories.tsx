import type { Meta, StoryObj } from '@storybook/react';
import PEHeaderDesktop from './PEHeaderDesktop';

const meta: Meta<typeof PEHeaderDesktop> = {
    title: 'Header/Desktop',
    component: PEHeaderDesktop,
};

export default meta;

export const NotSignedIn: StoryObj<typeof PEHeaderDesktop> = {
    args: {
        signedInUser: undefined,
    },
};

export const SignedInNoCookAndNoAdmin: StoryObj<typeof PEHeaderDesktop> = {
    args: {
        signedInUser: {
            userId: '',
            firstName: 'Max',
            profilePictureUrl: undefined,
            isCook: false,
            isAdmin: false,
        },
    },
};

export const SignedInCookAndNoAdmin: StoryObj<typeof PEHeaderDesktop> = {
    args: {
        signedInUser: {
            userId: '',
            firstName: 'Max',
            profilePictureUrl: undefined,
            isCook: true,
            isAdmin: false,
        },
    },
};

export const SignedInNoCookAndAdmin: StoryObj<typeof PEHeaderDesktop> = {
    args: {
        signedInUser: {
            userId: '',
            firstName: 'Max',
            profilePictureUrl: undefined,
            isCook: false,
            isAdmin: true,
        },
    },
};

export const SignedInCookAndAdmin: StoryObj<typeof PEHeaderDesktop> = {
    args: {
        signedInUser: {
            userId: '',
            firstName: 'Max',
            profilePictureUrl: undefined,
            isCook: true,
            isAdmin: true,
        },
    },
};
