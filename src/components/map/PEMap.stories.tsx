import type { Meta, StoryObj } from '@storybook/react';
import PEMap from './PEMap';

const meta: Meta<typeof PEMap> = {
    title: 'PEMap',
    component: PEMap,
};

export default meta;

export const Component: StoryObj<typeof PEMap> = {
    render: () => {
        return <PEMap apiKey="" style={{ height: '500px' }} />;
    },
};
