/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import HStack from '../../utility/hStack/HStack';
import PEMultiLineTextField from './PEMultiLineTextField';

const meta: Meta<typeof PEMultiLineTextField> = {
    title: 'Standard Components/Text Fields/PEMultiLineTextField',
    component: PEMultiLineTextField,
    argTypes: {
        value: { control: false },
        placeholder: { type: { name: 'string', required: false } },
        disabled: { type: { name: 'boolean', required: false } },
    },
    render: ({ placeholder, disabled }) => {
        const [value, setValue] = useState('');
        const [isValid, setIsValid] = useState(true);

        return (
            <HStack gap={32} style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                <PEMultiLineTextField
                    value={value}
                    onChange={(changedValue: string, changedIsValid: boolean): void => {
                        setValue(changedValue);
                        setIsValid(changedIsValid);
                    }}
                    validationRule={undefined}
                    placeholder={placeholder}
                    disabled={disabled}
                />
                {isValid ? <span className="text-green">valid</span> : <span className="text-red-500">invalid</span>}
            </HStack>
        );
    },
};

export default meta;

export const Component: StoryObj<typeof PEMultiLineTextField> = {
    args: {
        placeholder: 'Placeholder',
        disabled: false,
    },
};

export const ComponentBlank: StoryObj<typeof PEMultiLineTextField> = {
    args: {
        placeholder: undefined,
        disabled: undefined,
    },
};
