/* eslint-disable @typescript-eslint/typedef */
import type { Meta } from '@storybook/react';
import PeopleEatButton from './PeopleEatButton';

const Story: Meta<typeof PeopleEatButton> = {
    component: PeopleEatButton,
    title: 'PeopleEatButton',
};

export default Story;

export const Primary = {
    args: {},
};
