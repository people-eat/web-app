// Button.stories.ts|tsx

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { ButtonComponent as Button } from './Button';

export default {
    title: 'Button',
    component: Button,
} as ComponentMeta<typeof Button>;

export const Primary: ComponentStory<typeof Button> = () => <Button />;
