import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { CreateOneCookMealDocument, type MealType } from '../../../../data-source/generated/graphql';
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

export interface ChefProfilePageCreateMealProps {
    cookId: string;
    defaultMealType?: MealType;
    onSuccess: (mealType: MealType) => void;
    onCancel: () => void;
}

export default function ChefProfilePageCreateMeal({
    cookId,
    defaultMealType,
    onSuccess,
    onCancel,
}: ChefProfilePageCreateMealProps): ReactElement {
    const { t } = useTranslation('chef-profile');
    const { t: translateMealType } = useTranslation('meal-types');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<MealType>(defaultMealType ?? 'SPECIAL');
    const [image, setImage] = useState<File | undefined>(undefined);

    const disabled: boolean = title === '';

    const [createOneCookMeal, { data, loading }] = useMutation(CreateOneCookMealDocument, {
        variables: { cookId, meal: { title, description, type }, image },
    });

    if (data?.cooks.meals.success) onSuccess(type);

    return (
        <VStack
            className="w-full relative bg-white shadow-primary md:shadow-none box-border p-8 md:p-0 rounded-4 gap-6"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <div className="absolute top-8 right-8 md:top-2 md:right-0">
                <PEIconButton icon={Icon.close} onClick={onCancel} withoutShadow bg="white" iconSize={24} />
            </div>

            <p className="w-full text-heading-xl md:text-heading-s my-0 mb-6">{t('create-meal-headline')}</p>

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
                <PEImagePicker onPick={setImage} onRemoveDefaultImage={(): void => setImage(undefined)} />
            </VStack>

            {
                <PEButton
                    onClick={(): void => void createOneCookMeal()}
                    disabled={disabled}
                    title={t('create-meal-button')}
                    className="w-full"
                />
            }

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
