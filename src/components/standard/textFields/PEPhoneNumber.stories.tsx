/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import HStack from '../../utility/hStack/HStack';
import PEPhoneNumber from './PEPhoneNumber';

const meta: Meta<typeof PEPhoneNumber> = {
    title: 'Standard Components/Text Fields/PEPhoneNumberTextField',
    component: PEPhoneNumber,
    argTypes: {
        placeholder: { type: { name: 'string', required: false } },
        disabled: { type: { name: 'boolean', required: false } },
    },
};

export default meta;

export const Component: StoryObj<typeof PEPhoneNumber> = {
    args: {
        placeholder: 'Phone Number',
        disabled: undefined,
    },
    render: ({ placeholder, disabled }) => {
        const [phoneNumber, setValue] = useState('');
        const [isValid, setIsValid] = useState(true);

        return (
            <HStack style={{ justifyContent: 'flex-start', gap: 32, alignItems: 'center' }}>
                <PEPhoneNumber
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
