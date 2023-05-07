/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import HStack from '../../utility/hStack/HStack';
import PENumberTextField from './PENumberTextField';

const meta: Meta<typeof PENumberTextField> = {
    title: 'Standard Components/Text Fields/PENumberTextField',
    component: PENumberTextField,
    argTypes: {
        value: { control: false },
        placeholder: { type: { name: 'string', required: false } },
        disabled: { type: { name: 'boolean', required: false } },
    },
};

export default meta;

export const Component: StoryObj<typeof PENumberTextField> = {
    args: {
        placeholder: 'Email Address',
        disabled: undefined,
    },
    render: ({ placeholder, disabled }) => {
        const [value, setValue] = useState(0);
        const [isValid, setIsValid] = useState(true);

        return (
            <HStack style={{ justifyContent: 'flex-start', gap: 32, alignItems: 'center' }}>
                <PENumberTextField
                    value={value}
                    onChange={(changedValue: number, changedIsValid: boolean): void => {
                        setValue(changedValue);
                        setIsValid(changedIsValid);
                    }}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {isValid ? <span className="text-green">valid</span> : <span className="text-red-500">invalid</span>}
            </HStack>
        );
    },
};
