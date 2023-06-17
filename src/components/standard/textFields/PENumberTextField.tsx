import { type ReactElement } from 'react';
import { type PENumberTextFieldProps } from './PENumberTextFieldProps';
import PETextField from './PETextField';

export default function PENumberTextField({
    value,
    onChange,
    placeholder,
    disabled,
    endContent,
    style,
    className,
}: PENumberTextFieldProps): ReactElement {
    return (
        <PETextField
            value={String(value)}
            onChange={(changedValue: string, changedIsValid: boolean): void => {
                onChange(Number(changedValue), changedIsValid);
            }}
            validationRule={(changedValue: string): boolean => typeof Number(changedValue) === 'number'}
            placeholder={placeholder}
            disabled={disabled}
            type="number"
            startContent={undefined}
            endContent={endContent}
            style={style}
            className={className}
        />
    );
}
