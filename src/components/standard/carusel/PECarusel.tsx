import { type ReactElement } from 'react';
import Carousel from 'react-material-ui-carousel';

export interface PECaruselProps {
    images: ReactElement[];
}

export default function PECarusel({ images }: PECaruselProps): ReactElement {
    return (
        <Carousel
            // sx={{
            //     next: {
            //         right: 0,
            //         backgroundColor: 'white',
            //     },
            //     // Applies to the "prev" button wrapper
            //     '& .MuiButtonBase-root': {
            //         '&:hover': {
            //             backgroundColor: 'rgba(255, 255, 255, 0.2)',
            //         },
            //     },
            // }}
            // NextIcon={<div className="w-6 h-6 flex justify-center items-center"><PEIcon icon={Icon.arrowNext} edgeLength={8} /></div>}
            // PrevIcon={<PEIcon icon={Icon.arrowPrev} edgeLength={8} />}
            indicators={false}
            autoPlay={false}
            navButtonsAlwaysInvisible={false}
            className={'w-full h-full object-cover'}
        >
            {images.map((Item, i) => (
                <div key={i}>{Item}</div>
            ))}
        </Carousel>
    );
}
