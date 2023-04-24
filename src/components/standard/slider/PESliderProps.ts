import { type CSSProperties } from 'react';

export interface PESliderProps {
    className?: string;
    style?: CSSProperties;

    value: number;
    onValueChange: (progress: number) => void;
    step?: number;
    min?: number;
    max?: number;
}
