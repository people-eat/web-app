export interface PECounterProps {
    value: number;
    onValueChange: (changedValue: number) => void;
    boundaries?: {
        min?: number;
        max?: number;
    };
}
