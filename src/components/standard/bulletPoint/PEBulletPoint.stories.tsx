import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from '../icon/Icon';
import PEBulletPoint from './PEBulletPoint';

const meta: Meta<typeof PEBulletPoint> = {
    title: 'Standard Components/PEBulletPoint',
    component: PEBulletPoint,
};

export default meta;

export const Component: StoryObj<typeof PEBulletPoint> = {
    args: {
        icon: Icon.dishes,
        text: 'Lorem ipsum dore',
    },
};
