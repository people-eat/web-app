import { Slider } from '@mui/material';
import { useState, type ReactElement } from 'react';

interface IPeopleEatSlider {
    onProgress: (progress: number) => void;
    step?: number;
    min?: number;
    max?: number;
}

export default function PeopleEatSlider({ onProgress, step, min, max }: IPeopleEatSlider): ReactElement {
    const [_sliderProgress, setSliderProgress] = useState('0');

    function handleOnChange(value: number | number[]): void {
        setSliderProgress(String(value));
        onProgress(Number(value));
    }

    return (
        <div>
            <Slider
                valueLabelDisplay="auto"
                step={step ?? 1}
                min={min ?? 0}
                max={max ?? 100}
                sx={{
                    color: 'rgba(255, 100, 51, 1)',
                    height: 2,
                    '& .MuiSlider-track': {
                        border: 'none',
                    },
                    '& .MuiSlider-thumb': {
                        height: 24,
                        width: 24,
                        backgroundColor: '#fff',
                        border: '2px solid rgba(255, 100, 51, 1)',
                        '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
                            boxShadow: 'inherit',
                        },
                        '&:before': {
                            display: 'none',
                        },
                    },
                    '& .MuiSlider-valueLabel': {
                        lineHeight: 1.2,
                        fontSize: 12,
                        background: 'unset',
                        padding: 0,
                        width: 32,
                        height: 32,
                        borderRadius: '50% 50% 50% 0',
                        backgroundColor: 'rgba(255, 100, 51, 1)',
                        transformOrigin: 'bottom left',
                        transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
                        '&:before': { display: 'none' },
                        '&.MuiSlider-valueLabelOpen': {
                            transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
                        },
                        '& > *': {
                            transform: 'rotate(45deg)',
                        },
                    },
                }}
                onChange={(_, value): void => handleOnChange(value)}
            />
        </div>
    );
}
