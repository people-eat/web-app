import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import { useState, type ReactElement } from 'react';
import { CreateOneCookMealDocument, type MealType } from '../../../../data-source/generated/graphql';
import { mealTypes } from '../../../../shared/mealTypes';
import PEButton from '../../../standard/buttons/PEButton';
import PEImagePicker from '../../../standard/filePicker/PEImagePicker';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PEImageClipper from '../../../standard/imageClipper/PEImageClipper';
import PEModalPopUp from '../../../standard/modal/PEModalPopUp';
import PETabItem from '../../../standard/tabItem/PETabItem';
import PEMultiLineTextField from '../../../standard/textFields/PEMultiLineTextField';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';

export interface ChefProfilePageCreateMealProps {
    cookId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ChefProfilePageCreateMeal({ cookId, onSuccess, onCancel }: ChefProfilePageCreateMealProps): ReactElement {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<MealType>('MAIN_COURSE');
    const [image, setImage] = useState<File | undefined>(undefined);

    const [imageFile, setImageFile] = useState('');
    const [editImageFile, setEditImageFile] = useState('');

    function handleOnDownloadImage(imageContent: string): void {
        setEditImageFile(imageContent);
    }

    function handleOnCropDownloadImage(imageContent: string): void {
        setImageFile(imageContent);
        setEditImageFile('');
    }

    const disabled: boolean = title === '';

    const [createOneCookMeal, { data, loading }] = useMutation(CreateOneCookMealDocument, {
        variables: {
            cookId,
            meal: {
                title,
                description,
                type,
                imageUrl: undefined,
            },
            image,
        },
    });

    if (data?.cooks.meals.success) onSuccess();

    return (
        <VStack
            className="w-full relative bg-white shadow-primary box-border p-8 rounded-4 gap-6"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <div className="absolute top-8 right-8">
                <PEIconButton icon={Icon.close} onClick={onCancel} withoutShadow bg="white" iconSize={24} />
            </div>

            <p className="w-full text-heading-xl my-0 mb-6">Adding a new dish</p>

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Gang</p>
                <HStack
                    gap={8}
                    className="w-full max-w-screen-xl overflow-x-scroll"
                    style={{ overflowY: 'initial', justifyContent: 'flex-start' }}
                >
                    {mealTypes.map((mealType, index) => (
                        <PETabItem
                            key={index}
                            title={mealType}
                            onClick={(): void => {
                                setType(mealType);
                            }}
                            active={mealType === type}
                        />
                    ))}
                </HStack>
            </VStack>

            <input
                type="file"
                required
                onChange={({ target: { files } }): void => {
                    if (!files) return;
                    const [file] = files;
                    if (!file) return;
                    setImage(file);
                }}
            />

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Name</p>
                <PETextField type={'text'} value={title} onChange={(value): void => setTitle(value)} />
            </VStack>

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Description</p>
                <PEMultiLineTextField value={description} onChange={(value): void => setDescription(value)} />
            </VStack>

            <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                <p className="w-full mb-4 text-text-m-bold my-0">Description</p>
                <PEImagePicker onDownloaded={handleOnDownloadImage} initImageFile={imageFile ?? ''} />
                <PEModalPopUp openMenu={!!editImageFile} handleOpenMenu={(): void => setEditImageFile('')}>
                    <PEImageClipper
                        onDownloadCropImage={handleOnCropDownloadImage}
                        pathToImage={editImageFile}
                        cropParams={{
                            x: 0,
                            y: 0,
                            width: 200,
                            height: 100,
                            unit: 'px',
                        }}
                    />
                </PEModalPopUp>
            </VStack>

            {<PEButton onClick={(): void => void createOneCookMeal()} disabled={disabled} title="Add" className="w-full" />}

            {loading && (
                <Dialog open>
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}
        </VStack>
    );
}