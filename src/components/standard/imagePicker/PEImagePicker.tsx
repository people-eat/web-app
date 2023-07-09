import { Dialog, DialogContent } from '@mui/material';
import Compressor from 'compressorjs';
import Image from 'next/image';
import { useEffect, useState, type ReactElement } from 'react';
import { useFilePicker } from 'use-file-picker';
import VStack from '../../utility/vStack/VStack';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import PEIconButton from '../iconButton/PEIconButton';
import PEImageClipper from './PEImageClipper';

interface PEImagePickerProps {
    onPick?: (image: File) => void;
    onRemoveDefaultImage?: () => void;
    defaultImage?: string;
}

export default function PEImagePicker({ onPick, onRemoveDefaultImage, defaultImage }: PEImagePickerProps): ReactElement {
    const [base64Image, setBase64Image] = useState<string | undefined>(defaultImage);
    const [base64CroppedImage, setBase64CroppedImage] = useState<string | undefined>(defaultImage);
    const [showImageCropper, setShowImageCropper] = useState(false);

    const [openFileSelector] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: false,
        limitFilesConfig: { max: 1 },
        // in megabytes
        maxFileSize: 12,
        onFilesSuccessfulySelected: ({ plainFiles, filesContent }) => {
            const selectedImage: File | undefined = plainFiles[0];
            const selectedBase64Image: string | undefined = filesContent[0]?.content;
            if (!selectedImage || !selectedBase64Image) return;
            setBase64Image(selectedBase64Image);
            setShowImageCropper(true);
        },
    });

    useEffect(() => {
        setBase64Image(defaultImage);
        setBase64CroppedImage(defaultImage);
    }, [defaultImage]);

    function handleRemoveImage(event: React.MouseEvent<HTMLDivElement>): void {
        event.stopPropagation();
        setBase64CroppedImage(undefined);
        onRemoveDefaultImage?.();
    }

    return (
        <VStack style={{ alignItems: 'flex-start' }}>
            <div
                onClick={openFileSelector}
                className="relative flex overflow-hidden items-center w-[200px] h-[200px] hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition border-solid border-[1px] border-disabled justify-center rounded-4"
            >
                {base64CroppedImage && (
                    <>
                        <Image
                            style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                            src={base64CroppedImage}
                            alt=""
                            width={200}
                            height={200}
                        />
                        <div
                            onClick={(event): void => handleRemoveImage(event)}
                            className="flex justify-center items-center opacity-50 hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <PEIconButton icon={Icon.trash} withoutShadow />
                        </div>
                    </>
                )}
                {!base64CroppedImage && <PEIcon icon={Icon.plus} />}
            </div>

            {base64Image && showImageCropper && (
                <Dialog open>
                    <DialogContent>
                        <PEImageClipper
                            imagePath={base64Image}
                            onSuccess={(croppedImage: File, croppedBase64Image: string): void => {
                                new Compressor(croppedImage, {
                                    quality: 0.6,
                                    success: (compressedImage: File): void => onPick?.(compressedImage),
                                });
                                setBase64CroppedImage(croppedBase64Image);
                                setShowImageCropper(false);
                            }}
                        />
                    </DialogContent>
                </Dialog>
            )}
        </VStack>
    );
}
