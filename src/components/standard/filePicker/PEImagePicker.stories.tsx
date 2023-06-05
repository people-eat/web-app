import type { Meta, StoryObj } from '@storybook/react';
import PEImagePicker from './PEImagePicker';

const meta: Meta<typeof PEImagePicker> = {
    title: 'Standard Components/PEImagePicker',
    component: PEImagePicker,
};

export default meta;

export const Component: StoryObj<typeof PEImagePicker> = {
    args: {},
};
