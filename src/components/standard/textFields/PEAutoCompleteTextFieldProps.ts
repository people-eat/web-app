import { type CSSProperties, type ReactElement } from 'react';

export interface PEAutoCompleteTextFieldProps<T> {
    searchText: string;
    onSearchTextChange: (changedSearchText: string) => void;
    options: T[];
    getOptionLabel?: (option: T) => string;
    onOptionSelect: (selectedOption: T) => void;
    placeholder?: string;
    disabled?: boolean;
    startContent?: ReactElement;
    endContent?: ReactElement;

    style?: CSSProperties;
    className?: string;
}
