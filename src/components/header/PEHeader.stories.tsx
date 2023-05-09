import type { Meta, StoryObj } from '@storybook/react';
import PEHeader from './PEHeader';

const meta: Meta<typeof PEHeader> = {
    title: 'Standard Components/PEHeader',
    component: PEHeader,
};

export default meta;

export const NotSignedIn: StoryObj<typeof PEHeader> = {
    args: {
        signedInUser: undefined,
    },
};

export const SignedInNoCookAndNoAdmin: StoryObj<typeof PEHeader> = {
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

export const SignedInCookAndNoAdmin: StoryObj<typeof PEHeader> = {
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

export const SignedInNoCookAndAdmin: StoryObj<typeof PEHeader> = {
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

export const SignedInCookAndAdmin: StoryObj<typeof PEHeader> = {
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
