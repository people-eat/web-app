import { InputAdornment, TextField } from '@mui/material';
import { type ReactElement } from 'react';
import { type PENumberTextFieldProps } from './PENumberTextFieldProps';

export default function PENumberTextField({
    value,
    onChange,
    validationRule,
    placeholder,
    disabled,
    startContent,
    endContent,
    min,
    max,
    step,
    style,
    className,
    ...params
}: PENumberTextFieldProps): ReactElement {
    return (
        <TextField
            {...params}
            value={value}
            onChange={({ target }): void => onChange?.(Number(target.value), validationRule ? validationRule(Number(target.value)) : true)}
            placeholder={placeholder}
            disabled={disabled}
            type="number"
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
                inputProps: { min, max, step },
            }}
            style={style}
            className={'w-full' + (className ? ' ' + className : '')}
            onWheel={(event): void => {
                (event.target as HTMLElement)?.blur();
            }}
        />
    );
}
