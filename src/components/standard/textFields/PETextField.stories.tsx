/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import HStack from '../../utility/hStack/HStack';
import PETextField from './PETextField';

const meta: Meta<typeof PETextField> = {
    title: 'Standard Components/Text Fields/PETextField',
    component: PETextField,
    argTypes: {
        placeholder: { type: { name: 'string', required: false } },
        disabled: { type: { name: 'boolean', required: false } },
        type: {
            control: 'select',
            options: [
                'button',
                'checkbox',
                'color',
                'date',
                'datetime-local',
                'email',
                'file',
                'hidden',
                'image',
                'month',
                'number',
                'password',
                'radio',
                'range',
                'reset',
                'search',
                'submit',
                'tel',
                'text',
                'time',
                'url',
                'week',
            ],
            defaultValue: 'text',
        },
        startContent: { type: { name: 'string', required: false } },
        endContent: { type: { name: 'string', required: false } },
    },
};

export default meta;

export const Component: StoryObj<typeof PETextField> = {
    args: {
        placeholder: undefined,
        disabled: undefined,
        type: 'text',
        startContent: undefined,
        endContent: undefined,
    },
    render: ({ placeholder, disabled, type, startContent, endContent }) => {
        const [value, setValue] = useState('');
        const [isValid, setIsValid] = useState(true);

        return (
            <HStack style={{ justifyContent: 'flex-start', gap: 32, alignItems: 'center' }}>
                <PETextField
                    value={value}
                    onChange={(changedValue: string, changedIsValid: boolean): void => {
                        setValue(changedValue);
                        setIsValid(changedIsValid);
                    }}
                    validationRule={undefined}
                    placeholder={placeholder}
                    disabled={disabled}
                    type={type}
                    startContent={startContent}
                    endContent={endContent}
                />
                {isValid ? <span className="text-green">valid</span> : <span className="text-red-500">invalid</span>}
            </HStack>
        );
    },
};
