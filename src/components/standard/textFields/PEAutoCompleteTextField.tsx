import { Autocomplete } from '@mui/material';
import { type ReactElement } from 'react';
import { type PEAutoCompleteTextFieldProps } from './PEAutoCompleteTextFieldProps';
import PETextField from './PETextField';

export default function PEAutoCompleteTextField<T>({
    searchText,
    onSearchTextChange,
    options,
    getOptionLabel,
    onOptionSelect,
    placeholder,
    disabled,
    startContent,
    endContent,
    style,
    className,
}: PEAutoCompleteTextFieldProps<T>): ReactElement {
    return (
        <Autocomplete
            freeSolo
            disableClearable
            disabled={disabled}
            options={options}
            getOptionLabel={(option): string => {
                if (typeof option === 'string') return option;
                if (getOptionLabel) return getOptionLabel(option);
                return '';
            }}
            onChange={(_event, selectedOption): void => {
                if (typeof selectedOption === 'string') return;
                onOptionSelect(selectedOption);
            }}
            inputValue={searchText}
            onInputChange={(_event, value): void => onSearchTextChange(value)}
            filterOptions={(optionToFilter): T[] => optionToFilter}
            className={'w-full' + (className ? ' ' + className : '')}
            renderInput={(params): ReactElement => (
                <PETextField
                    {...params}
                    value={undefined}
                    onChange={undefined}
                    validationRule={undefined}
                    placeholder={placeholder}
                    type="email"
                    startContent={startContent}
                    endContent={endContent}
                    style={style}
                />
            )}
        />
    );
}
