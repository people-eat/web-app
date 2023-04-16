import type { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import PEInput from './PEInput';
import { type PEInputProps } from './PEInputProps';

const meta: Meta<typeof PEInput> = {
    title: 'Standard Components/PEInput',
    component: PEInput,
    args: {
        placeholder: 'Placeholder...',
        disabled: false,
    },
};

export default meta;

export const Component: StoryFn<PEInputProps> = ({ placeholder, disabled, value, type }) => {
    const [text, setText] = useState(value);
    return <PEInput value={text} onChange={setText} disabled={disabled} placeholder={placeholder} type={type} />;
};
