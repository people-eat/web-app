import useTranslation from 'next-translate/useTranslation';
import { useRef, useState, type ReactElement, type SyntheticEvent } from 'react';
import { ReactCrop, centerCrop, makeAspectCrop, type Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import VStack from '../../utility/vStack/VStack';
import PEButton from '../buttons/PEButton';

export interface PEImageClipperProps {
    imagePath: string;
    onSuccess: (croppedImage: File, croppedBase64Image: string) => void;
}

export default function PEImageClipper({ imagePath, onSuccess }: PEImageClipperProps): ReactElement {
    const [crop, setCrop] = useState<Crop | undefined>();
    const imgRef = useRef<HTMLImageElement | null>(null);
    const { t } = useTranslation('common');

    function onImageLoad(e: SyntheticEvent<HTMLImageElement, Event>): void {
        const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
        setCrop(centerCrop(makeAspectCrop({ unit: '%', width: 95 }, 1, width, height), width, height));
    }

    return (
        <VStack gap={32} className="w-full">
            <ReactCrop crop={crop} onChange={setCrop} onComplete={setCrop} keepSelection aspect={1}>
                {
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagePath} alt="" onLoad={onImageLoad} ref={imgRef} />
                }
            </ReactCrop>

            <PEButton
                // eslint-disable-next-line max-statements
                onClick={(): void => {
                    if (!crop) return;

                    // create a canvas element to draw the cropped image
                    const canvas = document.createElement('canvas');

                    // get the image element
                    const image = imgRef.current;

                    // draw the image on the canvas

                    if (image) {
                        const scaleX = image.naturalWidth / image.width;
                        const scaleY = image.naturalHeight / image.height;
                        const ctx = canvas.getContext('2d');
                        const pixelRatio = window.devicePixelRatio;
                        canvas.width = crop.width * pixelRatio * scaleX;
                        canvas.height = crop.height * pixelRatio * scaleY;

                        if (ctx) {
                            ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
                            ctx.imageSmoothingQuality = 'high';

                            ctx.drawImage(
                                image,
                                crop.x * scaleX,
                                crop.y * scaleY,
                                crop.width * scaleX,
                                crop.height * scaleY,
                                0,
                                0,
                                crop.width * scaleX,
                                crop.height * scaleY,
                            );
                        }

                        // can be changed to jpeg/jpg etc
                        const base64Image: string = canvas.toDataURL('image/png');

                        if (base64Image) {
                            const fileType = base64Image.split(';')[0]?.split(':')[1];

                            const buffer = Buffer.from(base64Image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
                            const file = new File([buffer], 'image', { type: fileType });

                            onSuccess(file, base64Image);
                        }
                    }
                }}
                title={t('done')}
            />
        </VStack>
    );
}
