import { type CSSProperties } from 'react';

export interface PEPhoneNumberTextFieldProps {
    phoneNumber: string;
    onChange: (changedPhoneNumber: string, changedIsValid: boolean) => void;
    placeholder?: string;
    disabled?: boolean;

    style?: CSSProperties;
    className?: string;
}
