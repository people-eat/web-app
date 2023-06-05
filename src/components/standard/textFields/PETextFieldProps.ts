import { type CSSProperties, type HTMLInputTypeAttribute, type ReactElement } from 'react';

export interface PETextFieldProps {
    value?: string;
    onChange?: (changedValue: string, changedIsValid: boolean) => void;
    validationRule?: (value: string) => boolean;
    placeholder?: string;
    disabled?: boolean;
    type: HTMLInputTypeAttribute;
    startContent?: ReactElement;
    endContent?: ReactElement;
    sx?: { [name: string]: any };
    style?: CSSProperties;
    className?: string;
}
