export interface PEInputProps {
    value?: string;
    onChange?: (changedValue: string) => void;

    placeholder?: string;
    disabled?: boolean;

    type: 'text' | 'email' | 'password';
}
