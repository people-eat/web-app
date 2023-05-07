import { TextField } from '@mui/material';
import { type ReactElement } from 'react';
import { type PEMultiLineTextFieldProps } from './PEMultiLineTextFieldProps';

export default function PEMultiLineTextField({
    value,
    onChange,
    validationRule,
    placeholder,
    disabled,
    style,
    className,
}: PEMultiLineTextFieldProps): ReactElement {
    return (
        <TextField
            multiline
            value={value}
            onChange={({ target }): void => onChange?.(target.value, validationRule ? validationRule(target.value) : true)}
            placeholder={placeholder}
            disabled={disabled}
            type="text"
            InputProps={{
                sx: {
                    '&.Mui-focused': {
                        '.MuiOutlinedInput-notchedOutline': {
                            border: '1px solid black',
                            borderColor: 'black',
                        },
                    },
                    borderRadius: '12px',
                    minHeight: 128,
                    alignItems: 'flex-start',
                },
            }}
            style={style}
            className={'w-full' + (className ? ' ' + className : '')}
        />
    );
}
