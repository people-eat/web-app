import { useState, type ReactElement } from 'react';
import PEDropdown from './PEDropdown';

export interface PESingleSelectDropdownProps<T> {
    title?: string;
    defaultExpanded?: boolean;
    options: T[];
    getOptionLabel: (option: T) => string;
    optionsEqual: (optionA: T, optionB: T) => boolean;
    setSelectedOption: (changedSelectedOptions?: T) => void;
    selectedOption?: T;
}

export default function PESingleSelectDropdown<T>({
    title,
    defaultExpanded,
    options,
    getOptionLabel,
    optionsEqual,
    setSelectedOption,
    selectedOption,
}: PESingleSelectDropdownProps<T>): ReactElement {
    const [selectedOptions, setSelectedOptions] = useState<T[]>(selectedOption ? [selectedOption] : []);

    return (
        <PEDropdown
            title={title}
            defaultExpanded={defaultExpanded}
            showSelectedCount={false}
            options={options}
            getOptionLabel={getOptionLabel}
            optionsEqual={optionsEqual}
            setSelectedOptions={([changedSelectedOption, second]): void => {
                if (!selectedOption) {
                    setSelectedOptions(changedSelectedOption ? [changedSelectedOption] : []);
                    setSelectedOption(changedSelectedOption);
                } else if (second) {
                    setSelectedOptions(second ? [second] : []);
                    setSelectedOption(second);
                } else {
                    setSelectedOptions(changedSelectedOption ? [changedSelectedOption] : []);
                    setSelectedOption(changedSelectedOption);
                }
            }}
            selectedOptions={selectedOptions}
        />
    );
}
