export interface PESliderProps {
    onProgress: (progress: number) => void;
    step?: number;
    min?: number;
    max?: number;
}
