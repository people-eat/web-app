import Image from 'next/image';
import { useEffect, type ReactElement } from 'react';
import { useFilePicker } from 'use-file-picker';
import VStack from '../../utility/vStack/VStack';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';

interface PEImagePickerProps {
    onDownloaded?: () => void;
}

export default function PEImagePicker({ onDownloaded }: PEImagePickerProps): ReactElement {
    const [openFileSelector, { filesContent }] = useFilePicker({
        readAs: 'DataURL',
        accept: 'image/*',
        multiple: true,
        limitFilesConfig: { max: 1 },
        // in megabytes
        maxFileSize: 12,
    });

    function handleSelectFiles(): void {
        openFileSelector();
    }

    useEffect(() => {
        if (filesContent.length) onDownloaded?.();
    }, [filesContent]);

    return (
        <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
            <div
                onClick={handleSelectFiles}
                className="flex overflow-hidden items-center w-[200px] h-[200px] hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition border-solid border-[1px] border-disabled justify-center rounded-4"
            >
                {filesContent.length && filesContent[0] ? (
                    <Image
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={filesContent[0].content ?? ''}
                        alt={filesContent[0].name ?? ''}
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
