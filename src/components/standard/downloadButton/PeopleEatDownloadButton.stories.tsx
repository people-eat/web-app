import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatDownloadButton from './PeopleEatDownloadButton';

const meta: Meta<typeof PeopleEatDownloadButton> = {
    title: 'Standard Components/PeopleEatDownloadButton',
    component: PeopleEatDownloadButton,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatDownloadButton> = {
    args: {},
};
