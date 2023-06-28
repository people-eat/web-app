import { type CSSProperties, type HTMLInputTypeAttribute, type ReactElement } from 'react';

export interface PETextFieldProps {
    value?: string;
    onChange?: (changedValue: string, changedIsValid: boolean) => void;
    validationRule?: (value: string) => boolean;
    placeholder?: string;
    disabled?: boolean;
    type: HTMLInputTypeAttribute;
    autocomplete?: string;
    startContent?: ReactElement;
    endContent?: ReactElement;
    style?: CSSProperties;
    className?: string;
    inputProps?: {
        [name: string]: number;
    };
}
