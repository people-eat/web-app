import { useRef, useState, type ReactElement } from 'react';
import ReactCrop, { PixelCrop, type Crop } from 'react-image-crop';
import useDebounce from '../../../hooks/useDebounce';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import { canvasPreview } from './canvasPreview';

import 'react-image-crop/dist/ReactCrop.css';
import PEButton from '../buttons/PEButton';

export interface PEImageClipperProps {
    cropParams: PixelCrop;
    pathToImage: string;
}

export default function PEImageClipper({ pathToImage, cropParams }: PEImageClipperProps): ReactElement {
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>(cropParams);
    const [imageURL, _setImageURL] = useState(pathToImage);
    const [crop, setCrop] = useState<Crop>(cropParams);

    const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const imgRef = useRef<HTMLImageElement | null>(null);
    const blobUrlRef = useRef('');

    useDebounce((): void => {
        if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
            // We use canvasPreview as it's much faster than imgPreview.
            canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, 1, 0);
        }
    }, 100);

    function onDownloadCropClick(): void {
        if (!previewCanvasRef.current) throw new Error('Crop canvas does not exist');

        if (previewCanvasRef.current) {
            previewCanvasRef.current?.toBlob((blob) => {
                if (!blob) throw new Error('Failed to create blob');

                if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);

                blobUrlRef.current = URL.createObjectURL(blob);
            });
        }
    }

    return (
        <div className="p-10 box-border w-full rounded-4 text-white text-text-s max-w-full w-6 whitespace-nowrap">
            {imageURL ? (
                <ReactCrop crop={crop} onChange={(c): void => setCrop(c)} onComplete={(c): void => setCompletedCrop(c)}>
                    <img src={imageURL} alt={imageURL} ref={imgRef} />
                </ReactCrop>
            ) : (
                <PEIcon icon={Icon.plus} />
            )}
            {!!completedCrop && (
                <div>
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            border: '1px solid black',
                            objectFit: 'contain',
                            width: completedCrop.width,
                            height: completedCrop.height,
                        }}
                    />
                    <PEButton className="max-w-[250px] mt-6" onClick={onDownloadCropClick} title={'Download'} />
                </div>
            )}
        </div>
    );
}
