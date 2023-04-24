import Slider from '@mui/material/Slider';
import { type ReactElement } from 'react';
import { type PESliderProps } from './PESliderProps';

export default function PESlider({ className, style, value, onValueChange, step, min, max }: PESliderProps): ReactElement {
    return (
        <Slider
            className={className}
            style={style}
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
            value={value}
            onChange={(_, updatedValue): void => {
                if (typeof updatedValue === 'number') onValueChange(updatedValue);
            }}
        />
    );
}
