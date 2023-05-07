import { type CSSProperties } from 'react';

export interface PEEmailTextFieldProps {
    email: string;
    onChange: (changedEmail: string, changedIsValid: boolean) => void;
    placeholder?: string;
    disabled?: boolean;

    style?: CSSProperties;
    className?: string;
}
