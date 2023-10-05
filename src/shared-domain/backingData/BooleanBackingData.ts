export interface BooleanBackingData {
    value: boolean;
    setValue: (changedValue: boolean, isValid: boolean) => void;
    isValid: () => boolean;
    triedToValidate: boolean;
}
