import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState, type ReactElement } from 'react';
import {
    FindCookMealDocument,
    UpdateCookMealDescriptionDocument,
    UpdateCookMealImageDocument,
    UpdateCookMealTitleDocument,
    UpdateCookMealTypeDocument,
    type MealType,
} from '../../../../data-source/generated/graphql';
import { mealTypes } from '../../../../shared/mealTypes';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PEImagePicker from '../../../standard/imagePicker/PEImagePicker';
import PETabItem from '../../../standard/tabItem/PETabItem';
import PEMultiLineTextField from '../../../standard/textFields/PEMultiLineTextField';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';

export interface ChefProfilePageCreateMealProps {
    cookId: string;
    mealId: string;
    onCancel: () => void;
}

export default function ChefProfilePageEditMeal({ cookId, mealId, onCancel }: ChefProfilePageCreateMealProps): ReactElement {
    const { data } = useQuery(FindCookMealDocument, { variables: { cookId, mealId } });

    const [meal] = useState(data?.cooks.meals.findOne);

    const [title, setTitle] = useState(meal?.title ?? '');
    const [description, setDescription] = useState(meal?.description ?? '');
    const [type, setType] = useState<MealType>(meal?.type ?? 'MAIN_COURSE');
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState(meal?.imageUrl ?? '');

    useEffect(() => {
        setTitle(meal?.title ?? '');
        setDescription(meal?.description ?? '');
        setType(meal?.type ?? 'MAIN_COURSE');
        setImageUrl(meal?.imageUrl ?? '');
    }, [meal, data]);

    const [updateMealDescription] = useMutation(UpdateCookMealDescriptionDocument, {
        variables: { cookId, mealId: meal?.mealId ?? '', description },
    });
    const [updateMealImage] = useMutation(UpdateCookMealImageDocument, {
        variables: { cookId, mealId: meal?.mealId ?? '', image },
    });
    const [updateMealTitle] = useMutation(UpdateCookMealTitleDocument, {
        variables: { cookId, mealId: meal?.mealId ?? '', title },
    });
    const [updateMealType] = useMutation(UpdateCookMealTypeDocument, {
        variables: { cookId, mealId: meal?.mealId ?? '', type },
    });

    function handleSaveUpdates(): void {
        try {
            void updateMealDescription();
            void updateMealImage();
            void updateMealTitle();
            void updateMealType();
        } catch (e) {
            console.error(e);
        }
    }

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

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Name</p>
                <PETextField type={'text'} value={title} onChange={(value): void => setTitle(value)} />
            </VStack>

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Description</p>
                <PEMultiLineTextField value={description} onChange={(value): void => setDescription(value)} />
            </VStack>

            <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                <p className="w-full mb-4 text-text-m-bold my-0">Image</p>
                <PEImagePicker defaultImage={imageUrl} onPick={setImage} onRemoveDefaultImage={(): void => setImage(undefined)} />
            </VStack>

            <PEButton title="Save" onClick={handleSaveUpdates} />
        </VStack>
    );
}
