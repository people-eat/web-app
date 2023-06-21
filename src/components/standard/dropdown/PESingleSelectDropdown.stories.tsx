/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import VStack from '../../utility/vStack/VStack';
import PESingleSelectDropdown from './PESingleSelectDropdown';

const meta: Meta<typeof PESingleSelectDropdown> = {
    title: 'Standard Components/Dropdown/PESingleSelectDropdown',
    component: PESingleSelectDropdown,
};

export default meta;

export const Component: StoryObj<typeof PESingleSelectDropdown> = {
    render: () => {
        const options = [
            { id: 'A', value: 'Hello' },
            { id: 'B', value: 'world' },
            { id: 'C', value: '!' },
        ];

        const [selectedOption, setSelectedOption] = useState<{ id: string; value: string } | undefined>();

        return (
            <VStack gap={16}>
                <PESingleSelectDropdown
                    title="Title"
                    defaultExpanded
                    options={options}
                    getOptionLabel={(option): string => option.value}
                    optionsEqual={(optionA, optionB): boolean => optionA.id === optionB.id}
                    setSelectedOption={setSelectedOption}
                    selectedOption={selectedOption}
                />
                Selected option: {JSON.stringify(selectedOption)}
            </VStack>
        );
    },
};
