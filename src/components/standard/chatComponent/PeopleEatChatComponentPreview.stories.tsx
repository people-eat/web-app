import type { Meta, StoryObj } from '@storybook/react';
import PeopleEatChatComponentPreview from './PeopleEatChatComponentPreview';

const meta: Meta<typeof PeopleEatChatComponentPreview> = {
    title: 'Standard Components/PeopleEatChatComponentPreview',
    component: PeopleEatChatComponentPreview,
};

export default meta;

export const Component: StoryObj<typeof PeopleEatChatComponentPreview> = {
    args: {},
};
