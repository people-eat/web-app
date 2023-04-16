import type { Meta, StoryObj } from '@storybook/react';
import PEDownloadButton from './PEDownloadButton';

const meta: Meta<typeof PEDownloadButton> = {
    title: 'Standard Components/PEDownloadButton',
    component: PEDownloadButton,
};

export default meta;

export const Component: StoryObj<typeof PEDownloadButton> = {
    args: {},
};
