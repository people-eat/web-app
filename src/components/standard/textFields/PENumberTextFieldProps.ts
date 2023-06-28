import { type CSSProperties, type ReactElement } from 'react';

export interface PENumberTextFieldProps {
    value: number;
    onChange: (changedValue: number, changedIsValid: boolean) => void;
    placeholder?: string;
    disabled?: boolean;
    endContent?: ReactElement;
    min?: number;
    max?: number;
    step?: number;
    style?: CSSProperties;
    className?: string;
}
