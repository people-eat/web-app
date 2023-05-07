import { InputAdornment, OutlinedInput } from '@mui/material';
import { type ReactElement } from 'react';
import { type PETextFieldProps } from './PETextFieldProps';

export default function PETextField({
    value,
    onChange,
    validationRule,
    placeholder,
    disabled,
    type,
    startContent,
    endContent,
    style,
    className,
}: PETextFieldProps): ReactElement {
    return (
        <OutlinedInput
            value={value}
            onChange={({ target }): void => onChange(target.value, validationRule ? validationRule(target.value) : true)}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            startAdornment={startContent ? <InputAdornment position="start">{startContent}</InputAdornment> : undefined}
            endAdornment={endContent ? <InputAdornment position="end">{endContent}</InputAdornment> : undefined}
            sx={{
                '&.Mui-focused': {
                    '.MuiOutlinedInput-notchedOutline': {
                        border: '1px solid black',
                        borderColor: 'black',
                    },
                },
                borderRadius: '12px',
            }}
            style={style}
            className={className}
        />
    );
}
