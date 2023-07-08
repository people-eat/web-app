import { useMutation, useQuery } from '@apollo/client';
import { Dialog, DialogContent } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import useTranslation from 'next-translate/useTranslation';
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
import { mealTypeTranslations } from '../../../../shared-domain/mealTypeTranslations';
import { mealTypes } from '../../../../shared-domain/mealTypes';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PEImagePicker from '../../../standard/imagePicker/PEImagePicker';
import PETabItem from '../../../standard/tabItem/PETabItem';
import PEMultiLineTextField from '../../../standard/textFields/PEMultiLineTextField';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';

export interface ChefProfilePageEditMealProps {
    cookId: string;
    mealId: string;
    onCancel: () => void;
    onSaveUpdates: () => void;
}

// eslint-disable-next-line max-statements
export default function ChefProfilePageEditMeal({ cookId, mealId, onCancel, onSaveUpdates }: ChefProfilePageEditMealProps): ReactElement {
    const { t } = useTranslation('chef-profile');
    const { t: translateMealType } = useTranslation('meal-types');

    const { data, loading, refetch } = useQuery(FindCookMealDocument, { variables: { cookId, mealId } });
    const meal = data?.cooks.meals.findOne;

    const [title, setTitle] = useState(meal?.title ?? '');
    const [description, setDescription] = useState(meal?.description ?? '');
    const [type, setType] = useState<MealType>(meal?.type ?? 'VEGETARIAN');
    const [image, setImage] = useState<File | undefined | null>(null);
    const [imageUrl, setImageUrl] = useState(meal?.imageUrl ?? '');

    const [changesHaveBeenApplied, setChangesHaveBeenApplied] = useState(false);

    const [deleteMeal] = useMutation(DeleteOneCookMealDocument, { variables: { cookId, mealId } });
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        setTitle(meal?.title ?? '');
        setDescription(meal?.description ?? '');
        setType(meal?.type ?? 'VEGETARIAN');
        setImageUrl(meal?.imageUrl ?? '');
    }, [meal]);

    const [updateMealDescription] = useMutation(UpdateCookMealDescriptionDocument, {
        variables: { cookId, mealId, description },
    });
    const [updateMealImage] = useMutation(UpdateCookMealImageDocument, {
        variables: { cookId, mealId, image: image ?? undefined },
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

        if (image !== null) {
            setChangesHaveBeenApplied(true);
            void updateMealImage()
                .then((result) => {
                    if (result.data?.cooks.meals.success) {
                        setImage(null);
                        void refetch();
                    }
                })
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

                    <p className="w-full text-heading-xl md:text-heading-s my-0 mb-6">{t('change-dish-info')}</p>

                    <VStack className="w-full">
                        <p className="w-full mb-4 text-text-m-bold my-0">{t('create-meal-course')}</p>

                        <HStack
                            gap={8}
                            className="w-full max-w-screen-xl overflow-x-scroll"
                            style={{ overflowY: 'initial', justifyContent: 'flex-start' }}
                        >
                            {mealTypes.map((mealType, index) => (
                                <PETabItem
                                    key={index}
                                    title={translateMealType(mealTypeTranslations[mealType])}
                                    onClick={(): void => setType(mealType)}
                                    active={mealType === type}
                                />
                            ))}
                        </HStack>
                    </VStack>

                    <VStack className="w-full">
                        <p className="w-full mb-4 text-text-m-bold my-0">{t('create-meal-title')}</p>
                        <PETextField type={'text'} value={title} onChange={(value): void => setTitle(value)} />
                    </VStack>

                    <VStack className="w-full">
                        <p className="w-full mb-4 text-text-m-bold my-0">{t('create-meal-description')}</p>
                        <PEMultiLineTextField value={description} onChange={(value): void => setDescription(value)} />
                    </VStack>

                    <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                        <p className="w-full mb-4 text-text-m-bold my-0">{t('create-meal-image')}</p>
                        <PEImagePicker defaultImage={imageUrl} onPick={setImage} onRemoveDefaultImage={(): void => setImage(undefined)} />
                    </VStack>

                    <HStack gap={16} className="w-full">
                        <PEButton
                            title={t('create-meal-dropdown-delete')}
                            onClick={(): void => setShowDeleteDialog(true)}
                            type="secondary"
                        />
                        <PEButton
                            title={t('save-changes')}
                            onClick={handleSaveUpdates}
                            disabled={meal.title === title && meal.description === description && meal.type === type && image === null}
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

                                <p className="m-0 mt-2 text-text-m-bold w-full text-start">
                                    {t('create-meal-dropdown-delete')} &ldquo;{meal.title}&ldquo;
                                </p>

                                <p className="m-0 w-full text-start">{t('remove-dish-warning', { title: meal.title })}</p>

                                <HStack className="w-full gap-4">
                                    <PEButton
                                        onClick={(): void => setShowDeleteDialog(false)}
                                        title={t('cancel-button')}
                                        type="secondary"
                                    />
                                    <PEButton
                                        onClick={(): void =>
                                            void deleteMeal().then((result) => result.data?.cooks.meals.success && onSaveUpdates())
                                        }
                                        title={t('create-meal-dropdown-delete')}
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
