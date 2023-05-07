/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import HStack from '../../utility/hStack/HStack';
import PEPhoneNumberTextField from './PEPhoneNumberTextField';

const meta: Meta<typeof PEPhoneNumberTextField> = {
    title: 'Standard Components/Text Fields/PEPhoneNumberTextField',
    component: PEPhoneNumberTextField,
    argTypes: {
        phoneNumber: { control: false },
        placeholder: { type: { name: 'string', required: false } },
        disabled: { type: { name: 'boolean', required: false } },
    },
};

export default meta;

export const Component: StoryObj<typeof PEPhoneNumberTextField> = {
    args: {
        placeholder: 'Phone Number',
        disabled: undefined,
    },
    render: ({ placeholder, disabled }) => {
        const [phoneNumber, setValue] = useState('');
        const [isValid, setIsValid] = useState(true);

        return (
            <HStack gap={32} style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
                <PEPhoneNumberTextField
                    phoneNumber={phoneNumber}
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
