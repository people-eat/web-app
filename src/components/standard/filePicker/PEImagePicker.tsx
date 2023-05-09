import Image from 'next/image';
import { useEffect, useState, type ReactElement } from 'react';
import { useFilePicker } from 'use-file-picker';
import VStack from '../../utility/vStack/VStack';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import PEIconButton from '../iconButton/PEIconButton';

interface PEImagePickerProps {
    onDownloaded?: (file: string) => void;
    initImageFile?: string;
}

export default function PEImagePicker({ onDownloaded, initImageFile }: PEImagePickerProps): ReactElement {
    const [openFileSelector, { filesContent }] = useFilePicker({
        readAs: 'DataURL',
        accept: ['.jpg', '.jpeg', '.png'],
        multiple: true,
        limitFilesConfig: { max: 1 },
        // in megabytes
        maxFileSize: 12,
    });

    const [imageFile, setImageFile] = useState<string | undefined>(initImageFile);

    function handleSelectFiles(): void {
        openFileSelector();
    }

    function handleRemoveImage(event: React.MouseEvent<HTMLDivElement>): void {
        event.stopPropagation();
        setImageFile('');
        if (imageFile) onDownloaded?.('');
    }

    useEffect(() => {
        if (filesContent[0]) onDownloaded?.(filesContent[0].content);
        if (filesContent[0]) setImageFile(filesContent[0].content);
    }, [filesContent]);

    useEffect(() => {
        setImageFile(initImageFile);
    }, [initImageFile]);

    return (
        <VStack style={{ alignItems: 'flex-start' }}>
            <div
                onClick={handleSelectFiles}
                className="relative flex overflow-hidden items-center w-[200px] h-[200px] hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition border-solid border-[1px] border-disabled justify-center rounded-4"
            >
                {imageFile && (
                    <div
                        onClick={(event): void => handleRemoveImage(event)}
                        className="flex justify-center items-center opacity-50 hover:opacity-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        <PEIconButton icon={Icon.trash} withoutShadow />
                    </div>
                )}
                {imageFile ? (
                    <Image
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={imageFile}
                        alt={imageFile}
                        width={200}
                        height={200}
                    />
                ) : (
                    <PEIcon icon={Icon.plus} />
                )}
            </div>
        </VStack>
    );
}
