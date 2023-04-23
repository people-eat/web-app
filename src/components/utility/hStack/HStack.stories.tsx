import type { Meta, StoryObj } from '@storybook/react';
import Spacer from '../spacer/Spacer';
import HStack from './HStack';

const meta: Meta<typeof HStack> = {
    title: 'Utility Components/HStack',
    component: HStack,
};

export default meta;

export const Component: StoryObj<typeof HStack> = {
    render: () => (
        <HStack>
            <div>A</div>
            <div>B</div>
        </HStack>
    ),
};

export const ComponentWithSpacer: StoryObj<typeof HStack> = {
    render: () => (
        <HStack>
            <div>A</div>
            <Spacer />
            <div>B</div>
        </HStack>
    ),
};
