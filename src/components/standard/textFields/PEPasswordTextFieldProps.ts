import { type CSSProperties } from 'react';

export interface PEPasswordTextFieldProps {
    password: string;
    onChange: (changedPassword: string, changedIsValid: boolean) => void;
    placeholder?: string;
    disabled?: boolean;

    style?: CSSProperties;
    className?: string;
}
