/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import VStack from '../../utility/vStack/VStack';
import PEDropdown from './PEDropdown';

const meta: Meta<typeof PEDropdown> = {
    title: 'Standard Components/Dropdown/PEDropdown',
    component: PEDropdown,
};

export default meta;

export const Component: StoryObj<typeof PEDropdown> = {
    render: () => {
        const options = [
            { id: 'A', value: 'Hello' },
            { id: 'B', value: 'world' },
            { id: 'C', value: '!' },
        ];

        const [selectedOptions, setSelectedOptions] = useState<{ id: string; value: string }[]>([]);

        return (
            <VStack gap={16}>
                <PEDropdown
                    title="Title"
                    defaultExpanded
                    showSelectedCount
                    options={options}
                    getOptionLabel={(option): string => option.value}
                    optionsEqual={(optionA, optionB): boolean => optionA.id === optionB.id}
                    setSelectedOptions={setSelectedOptions}
                    selectedOptions={selectedOptions}
                />
                Selected options: {JSON.stringify(selectedOptions)}
            </VStack>
        );
    },
};
