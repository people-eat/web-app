import { type CSSProperties } from 'react';

export interface PEPhoneNumberProps {
    phoneNumber: string;
    onChange: (changedPhoneNumber: string, changedIsValid: boolean) => void;
    placeholder?: string;
    disabled?: boolean;

    style?: CSSProperties;
    className?: string;
}
