export interface StringBackingData {
    value: string;
    setValue: (changedValue: string, isValid: boolean) => void;
    isValid: () => boolean;
    triedToValidate: boolean;
}
