import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { type ReactElement } from 'react';
import { type PETextFieldProps } from './PETextFieldProps';

export default function PETextField({
    value,
    onChange,
    validationRule,
    placeholder,
    disabled,
    type,
    autocomplete,
    startContent,
    endContent,
    style,
    className,
    ...params
}: PETextFieldProps): ReactElement {
    return (
        <TextField
            {...params}
            value={value}
            onChange={({ target }): void => onChange?.(target.value, validationRule ? validationRule(target.value) : true)}
            placeholder={placeholder}
            disabled={disabled}
            type={type}
            autoComplete={autocomplete}
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            InputProps={{
                // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
                ...(params as any).InputProps,
                startAdornment: startContent ? <InputAdornment position="start">{startContent}</InputAdornment> : undefined,
                endAdornment: endContent ? <InputAdornment position="end">{endContent}</InputAdornment> : undefined,
                sx: {
                    '&.Mui-focused': {
                        '.MuiOutlinedInput-notchedOutline': {
                            border: '1px solid black',
                            borderColor: 'black',
                        },
                    },
                    borderRadius: '12px',
                },
            }}
            style={style}
            className={'w-full' + (className ? ' ' + className : '')}
        />
    );
}
