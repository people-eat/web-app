import { useMutation, useQuery } from '@apollo/client';
import { Dialog, DialogContent } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState, type ReactElement } from 'react';
import {
    DeleteOneCookMealDocument,
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

// eslint-disable-next-line max-statements
export default function ChefProfilePageEditMeal({ cookId, mealId, onCancel, onSaveUpdates }: ChefProfilePageCreateMealProps): ReactElement {
    const { data, loading, refetch } = useQuery(FindCookMealDocument, { variables: { cookId, mealId } });
    const meal = data?.cooks.meals.findOne;

    const [title, setTitle] = useState(meal?.title ?? '');
    const [description, setDescription] = useState(meal?.description ?? '');
    const [type, setType] = useState<MealType>(meal?.type ?? 'MAIN_COURSE');
    const [image, setImage] = useState<File | undefined>(undefined);
    const [imageNotChanged, setImageNotChanged] = useState(true);
    const [imageUrl, setImageUrl] = useState(meal?.imageUrl ?? '');

    const [changesHaveBeenApplied, setChangesHaveBeenApplied] = useState(false);

    const [deleteMeal] = useMutation(DeleteOneCookMealDocument, { variables: { cookId, mealId } });
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        setTitle(meal?.title ?? '');
        setDescription(meal?.description ?? '');
        setType(meal?.type ?? 'MAIN_COURSE');
        setImageUrl(meal?.imageUrl ?? '');
    }, [meal]);

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

        if (!imageNotChanged || image) {
            setImageNotChanged(false);
            setChangesHaveBeenApplied(true);
            void updateMealImage()
                .then((result) => {
                    if (result.data?.cooks.meals.success) {
                        setImage(undefined);
                        void refetch();
                    }
                })
                .catch((e) => console.error(e));
        }
    }

    function handleRemoveImage(): void {
        setImage(undefined);
        setImageNotChanged(false);

        setChangesHaveBeenApplied(true);
        void updateMealImage()
            .then((result) => {
                if (result.data?.cooks.meals.success) {
                    setImage(undefined);
                    void refetch();
                }
            })
            .catch((e) => console.error(e));
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
                                    onClick={(): void => setType(mealType)}
                                    active={mealType === type}
                                />
                            ))}
                        </HStack>
                    </VStack>

                    <VStack className="w-full">
                        <p className="w-full mb-4 text-text-m-bold my-0">Name</p>
                        <PETextField type={'text'} value={title} onChange={setTitle} />
                    </VStack>

                    <VStack className="w-full">
                        <p className="w-full mb-4 text-text-m-bold my-0">Description</p>
                        <PEMultiLineTextField value={description} onChange={setDescription} />
                    </VStack>

                    <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                        <p className="w-full mb-4 text-text-m-bold my-0">Image</p>
                        <PEImagePicker defaultImage={imageUrl} onPick={setImage} onRemoveDefaultImage={handleRemoveImage} />
                    </VStack>

                    <HStack gap={16} className="w-full">
                        <PEButton title="Delete" onClick={(): void => setShowDeleteDialog(true)} type="secondary" />
                        <PEButton
                            title="Save Changes"
                            onClick={handleSaveUpdates}
                            disabled={
                                meal.title === title && meal.description === description && meal.type === type && imageNotChanged && !image
                            }
                        />
                    </HStack>

                    <Dialog open={showDeleteDialog} onClose={(): void => setShowDeleteDialog(false)}>
                        <DialogContent>
                            <VStack className="gap-8 relative box-border">
                                <VStack className="absolute top-0 right-0">
                                    <PEIconButton
                                        iconSize={24}
                                        icon={Icon.close}
                                        onClick={(): void => setShowDeleteDialog(false)}
                                        withoutShadow
                                        bg="white"
                                    />
                                </VStack>

                                <p className="m-0 mt-2 text-text-m-bold w-full text-start">Delete &ldquo;{meal.title}&ldquo;</p>

                                <p className="m-0 w-full text-start">Do you really want to delete your dish &ldquo;{meal.title}&ldquo;?</p>

                                <HStack className="w-full gap-4">
                                    <PEButton onClick={(): void => setShowDeleteDialog(false)} title="Cancel" type="secondary" />
                                    <PEButton
                                        onClick={(): void =>
                                            void deleteMeal().then((result) => result.data?.cooks.meals.success && onSaveUpdates())
                                        }
                                        title="Delete"
                                    />
                                </HStack>
                            </VStack>
                        </DialogContent>
                    </Dialog>
                </>
            )}

            {loading && <CircularProgress />}
        </VStack>
    );
}
