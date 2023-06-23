import { useMutation, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
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
    onSaveUpdates: () => void;
}

export default function ChefProfilePageEditMeal({ cookId, mealId, onCancel, onSaveUpdates }: ChefProfilePageCreateMealProps): ReactElement {
    const { data, loading, refetch } = useQuery(FindCookMealDocument, { variables: { cookId, mealId } });

    const meal = data?.cooks.meals.findOne;

    const [title, setTitle] = useState(meal?.title ?? '');
    const [description, setDescription] = useState(meal?.description ?? '');
    const [type, setType] = useState<MealType>(meal?.type ?? 'MAIN_COURSE');
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imageUrl, setImageUrl] = useState(meal?.imageUrl ?? '');

    const [changesHaveBeenApplied, setChangesHaveBeenApplied] = useState(false);

    useEffect(() => {
        setTitle(meal?.title ?? '');
        setDescription(meal?.description ?? '');
        setType(meal?.type ?? 'MAIN_COURSE');
        setImageUrl(meal?.imageUrl ?? '');
    }, [meal, loading, data]);

    useEffect(() => setImageUrl(meal?.imageUrl ?? ''), [imageUrl, meal?.imageUrl]);

    const [updateMealDescription] = useMutation(UpdateCookMealDescriptionDocument, {
        variables: { cookId, mealId, description },
    });
    const [updateMealImage] = useMutation(UpdateCookMealImageDocument, {
        variables: { cookId, mealId, image },
    });
    const [updateMealTitle] = useMutation(UpdateCookMealTitleDocument, {
        variables: { cookId, mealId, title },
    });
    const [updateMealType] = useMutation(UpdateCookMealTypeDocument, {
        variables: { cookId, mealId, type },
    });

    function handleSaveUpdates(): void {
        if (!meal) return;

        if (meal.title !== title) {
            setChangesHaveBeenApplied(true);
            void updateMealTitle()
                .then((result) => result.data?.cooks.meals.success && void refetch())
                .catch((e) => console.error(e));
        }

        if (meal.description !== description) {
            setChangesHaveBeenApplied(true);
            void updateMealDescription()
                .then((result) => result.data?.cooks.meals.success && void refetch())
                .catch((e) => console.error(e));
        }

        if (meal.type !== type) {
            setChangesHaveBeenApplied(true);
            void updateMealType()
                .then((result) => result.data?.cooks.meals.success && void refetch())
                .catch((e) => console.error(e));
        }

        if (image) {
            setChangesHaveBeenApplied(true);
            void updateMealImage()
                .then((result) => result.data?.cooks.meals.success && void refetch())
                .catch((e) => console.error(e));
        }
    }

    return (
        <VStack
            className="w-full relative bg-white shadow-primary md:shadow-none box-border p-8 md:p-0 rounded-4 gap-6"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            {meal && (
                <>
                    <div className="absolute top-8 right-8 md:top-2 md:right-0">
                        <PEIconButton
                            icon={Icon.close}
                            onClick={changesHaveBeenApplied ? onSaveUpdates : onCancel}
                            withoutShadow
                            bg="white"
                            iconSize={24}
                        />
                    </div>

                    <p className="w-full text-heading-xl md:text-heading-s my-0 mb-6">Change the dish info</p>

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
                                    title={mealType.toLowerCase()}
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

                    <PEButton
                        title="Save"
                        onClick={handleSaveUpdates}
                        disabled={meal.title === title && meal.description === description && meal.type === type && !image}
                    />
                </>
            )}

            {loading && <CircularProgress />}
        </VStack>
    );
}
