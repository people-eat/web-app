/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import HStack from '../../utility/hStack/HStack';
import PEEmailTextField from './PEEmailTextField';

const meta: Meta<typeof PEEmailTextField> = {
    title: 'Standard Components/Text Fields/PEEmailTextField',
    component: PEEmailTextField,
    argTypes: {
        email: { control: false },
        placeholder: { type: { name: 'string', required: false } },
        disabled: { type: { name: 'boolean', required: false } },
    },
};

export default meta;

export const Component: StoryObj<typeof PEEmailTextField> = {
    args: {
        placeholder: 'Email Address',
        disabled: undefined,
    },
    render: ({ placeholder, disabled }) => {
        const [email, setValue] = useState('');
        const [isValid, setIsValid] = useState(true);

        return (
            <HStack style={{ justifyContent: 'flex-start', gap: 32, alignItems: 'center' }}>
                <PEEmailTextField
                    email={email}
                    onChange={(changedValue: string, changedIsValid: boolean): void => {
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
