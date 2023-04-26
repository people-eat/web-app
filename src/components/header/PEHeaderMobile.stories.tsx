import type { Meta, StoryObj } from '@storybook/react';
import PEHeaderMobile from './PEHeaderMobile';

const meta: Meta<typeof PEHeaderMobile> = {
    title: 'Header/Mobile',
    component: PEHeaderMobile,
};

export default meta;

export const NotSignedIn: StoryObj<typeof PEHeaderMobile> = {
    args: {
        signedInUser: undefined,
    },
};

export const SignedInNoCookAndNoAdmin: StoryObj<typeof PEHeaderMobile> = {
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

export const SignedInCookAndNoAdmin: StoryObj<typeof PEHeaderMobile> = {
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

export const SignedInNoCookAndAdmin: StoryObj<typeof PEHeaderMobile> = {
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

export const SignedInCookAndAdmin: StoryObj<typeof PEHeaderMobile> = {
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
