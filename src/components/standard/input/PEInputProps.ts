export interface PEInputProps {
    value?: string;
    onChange?: (changedValue: string) => void;

    placeholder?: string;
    disabled?: boolean;

    // password?: boolean;
    // email?: boolean;

    type: 'text' | 'email' | 'password';
}
