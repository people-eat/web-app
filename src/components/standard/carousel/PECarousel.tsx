import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from '@mui/material';
import { useState, type ReactElement } from 'react';

export interface PECarouselProps {
    images: ReactElement[];
}

export default function PECarousel({ images }: PECarouselProps): ReactElement {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // todo
    // 1. buttons nur on hover zeigen

    return (
        <div style={{ position: 'relative' }}>
            {images[selectedImageIndex]}
            <IconButton
                onClick={(event): void => {
                    event.preventDefault();
                    setSelectedImageIndex((images.length + selectedImageIndex - 1) % images.length);
                }}
                style={{ position: 'absolute', top: '50%', left: '10%', transform: 'translate(-50%, -50%)' }}
            >
                <ArrowBackIosIcon />
            </IconButton>
            <IconButton
                onClick={(event): void => {
                    event.preventDefault();
                    setSelectedImageIndex((selectedImageIndex + 1) % images.length);
                }}
                style={{ position: 'absolute', top: '50%', right: '10%', transform: 'translate(+50%, -50%)' }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </div>
    );
}
