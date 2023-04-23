import type { Meta, StoryObj } from '@storybook/react';
import Spacer from '../spacer/Spacer';
import VStack from './VStack';

const meta: Meta<typeof VStack> = {
    title: 'Utility Components/VStack',
    component: VStack,
};

export default meta;

export const Component: StoryObj<typeof VStack> = {
    render: () => (
        <VStack>
            <div>A</div>
            <div>B</div>
        </VStack>
    ),
};

export const ComponentWithSpacer: StoryObj<typeof VStack> = {
    render: () => (
        <VStack style={{ height: '200px' }}>
            <div>A</div>
            <Spacer />
            <div>B</div>
        </VStack>
    ),
};
