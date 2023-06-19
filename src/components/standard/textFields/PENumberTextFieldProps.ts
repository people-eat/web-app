import { type CSSProperties, type ReactElement } from 'react';

export interface PENumberTextFieldProps {
    value: number;
    onChange: (changedValue: number, changedIsValid: boolean) => void;
    validationRule?: (value: number) => boolean;
    placeholder?: string;
    disabled?: boolean;
    startContent?: ReactElement;
    endContent?: ReactElement;
    style?: CSSProperties;
    className?: string;

    min: number;
    max: number;
    step: number;
}
