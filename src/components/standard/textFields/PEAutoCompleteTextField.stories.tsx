/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import PEAutoCompleteTextField from './PEAutoCompleteTextField';

const meta: Meta<typeof PEAutoCompleteTextField> = {
    title: 'Standard Components/Text Fields/PEAutoCompleteTextField',
    component: PEAutoCompleteTextField,
    argTypes: {
        placeholder: { type: { name: 'string', required: false } },
        disabled: { type: { name: 'boolean', required: false } },
        startContent: { type: { name: 'string', required: false } },
        endContent: { type: { name: 'string', required: false } },
    },
};

export default meta;

export const Component: StoryObj<typeof PEAutoCompleteTextField> = {
    args: {
        options: ['A', 'B', 'C'],
        placeholder: 'Auto Complete',
        disabled: false,
    },
    render: ({ options, placeholder, disabled }) => {
        const [searchText, setSearchText] = useState('');

        return (
            <PEAutoCompleteTextField
                searchText={searchText}
                onSearchTextChange={setSearchText}
                options={options}
                onOptionSelect={(selectedOption): void => {
                    // eslint-disable-next-line no-alert
                    alert(selectedOption);
                }}
                placeholder={placeholder}
                disabled={disabled}
            />
        );
    },
};

export const ComponentWithComplexInput: StoryObj<typeof PEAutoCompleteTextField> = {
    args: {
        options: [{ label: 'D' }, { label: 'E' }, { label: 'F' }],
        placeholder: 'Auto Complete',
        disabled: false,
    },
    render: ({ options, placeholder, disabled }) => {
        const [searchText, setSearchText] = useState('');

        return (
            <PEAutoCompleteTextField
                searchText={searchText}
                onSearchTextChange={setSearchText}
                options={options}
                onOptionSelect={(selectedOption): void => {
                    // eslint-disable-next-line no-alert
                    alert(selectedOption);
                }}
                placeholder={placeholder}
                disabled={disabled}
            />
        );
    },
};
