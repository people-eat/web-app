import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import PEIcon from './PEIcon';

const meta: Meta<typeof PEIcon> = {
    title: 'Standard Components/PEIcon',
    component: PEIcon,
};

export default meta;

export const Component: StoryObj<typeof PEIcon> = { args: { icon: Icon.users } };
