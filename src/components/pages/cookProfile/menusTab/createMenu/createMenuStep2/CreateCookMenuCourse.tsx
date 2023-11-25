import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { type CurrencyCode, type MealType } from '../../../../../../data-source/generated/graphql';
import useResponsive from '../../../../../../hooks/useResponsive';
import { type Category } from '../../../../../../shared-domain/Category';
import { type Kitchen } from '../../../../../../shared-domain/Kitchen';
import { mealTypeTranslations } from '../../../../../../shared-domain/mealTypeTranslations';
import { mealTypes } from '../../../../../../shared-domain/mealTypes';
import PEMEalCard from '../../../../../cards/mealCard/PEMealCard';
import PEMealCardDesktop from '../../../../../cards/mealCard/PEMealCardDesktop';
import PEButton from '../../../../../standard/buttons/PEButton';
import { Icon } from '../../../../../standard/icon/Icon';
import PEIconButton from '../../../../../standard/iconButton/PEIconButton';
import PEMobileBottomSheet from '../../../../../standard/modal/PEMobileBottomSheet';
import PETabItem from '../../../../../standard/tabItem/PETabItem';
import PETextField from '../../../../../standard/textFields/PETextField';
import HStack from '../../../../../utility/hStack/HStack';
import Spacer from '../../../../../utility/spacer/Spacer';
import VStack from '../../../../../utility/vStack/VStack';

export interface MealEntity {
    mealId: string;
    cookId: string;
    title: string;
    type: MealType;
    description: string;
    imageUrl?: string | null;
    createdAt: Date;
}

export interface MenuEntity {
    __typename?: 'Menu';
    menuId: string;
    isVisible: boolean;
    title: string;
    description: string;
    basePrice: number;
    basePriceCustomers: number;
    pricePerAdult: number;
    pricePerChild?: number | null;
    currencyCode: CurrencyCode;
    greetingFromKitchen?: string | null;
    preparationTime: number;
    createdAt: Date;
    kitchen?: Kitchen | null;
    categories: Category[];
    courses: {
        courseId: string;
        index: number;
        title: string;
        mealOptions: {
            index: number;
            meal: {
                mealId: string;
                title: string;
                description: string;
                imageUrl?: string | null;
                type: MealType;
                createdAt: Date;
            };
        }[];
    }[];
}

export interface CreateCookMenuCourseDto {
    title: string;
    mealOptions: MealEntity[];
}

export interface CreateCookMenuCourseProps {
    meals: MealEntity[];
    open: boolean;
    onSuccess: (course: CreateCookMenuCourseDto) => void;
    onCancel: () => void;
}

export default function CreateCookMenuCourse({ open, meals, onSuccess, onCancel }: CreateCookMenuCourseProps): ReactElement {
    const { isMobile } = useResponsive();
    const { t: translateMealType } = useTranslation('meal-types');
    const { t } = useTranslation('chef-profile');

    const [title, setTitle] = useState('');
    const [selectedMealType, setSelectedMealType] = useState<MealType | 'ALL'>('ALL');

    const [selectedMeals, setSelectedMeals] = useState<Map<string, MealEntity>>(new Map());

    const disabled = !Boolean(title);

    return (
        <>
            <Dialog
                open={open && !isMobile}
                maxWidth="md"
                sx={{ margin: 0, '& .MuiPaper-root': { margin: 0, maxWidth: '728px', minHeight: '613px', overflow: 'hidden' } }}
            >
                <DialogTitle>
                    <HStack>
                        <span style={{ fontWeight: 'bold' }}>Wähle Gerichte für den Gang aus</span>
                        <Spacer />
                        <PEIconButton withoutShadow bg="white" icon={Icon.close} onClick={onCancel} iconSize={24} />
                    </HStack>
                </DialogTitle>

                <DialogContent sx={{ margin: 0, padding: isMobile ? '8px' : '16px', boxSizing: 'border-box' }}>
                    <DialogContentText>
                        <VStack gap={32} style={{ marginTop: 8 }}>
                            <PETextField value={title} onChange={setTitle} type="text" placeholder={t('create-menu-course-name')} />

                            <HStack gap={16} className="w-full" style={{ justifyContent: 'flex-start', overflowX: 'scroll' }}>
                                <PETabItem
                                    title={translateMealType('meal-type-all')}
                                    onClick={(): void => setSelectedMealType('ALL')}
                                    active={selectedMealType === 'ALL'}
                                />

                                {mealTypes.map((mealType, index) => (
                                    <PETabItem
                                        key={index}
                                        title={translateMealType(mealTypeTranslations[mealType])}
                                        onClick={(): void => setSelectedMealType(mealType)}
                                        active={selectedMealType === mealType}
                                    />
                                ))}
                            </HStack>

                            <HStack
                                gap={16}
                                className="w-full"
                                style={{ flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}
                            >
                                {meals
                                    .filter(({ type }) => (selectedMealType === 'ALL' ? true : type === selectedMealType))
                                    .map((meal, index) => (
                                        <div key={index} className="flex basis-[330px]">
                                            <PEMEalCard
                                                onClick={(): void => {
                                                    if (selectedMeals.has(meal.mealId)) selectedMeals.delete(meal.mealId);
                                                    else selectedMeals.set(meal.mealId, meal);
                                                    setSelectedMeals(new Map(selectedMeals));
                                                }}
                                                title={meal.title}
                                                description={meal.description}
                                                imageUrl={meal.imageUrl ?? undefined}
                                                active={selectedMeals.has(meal.mealId)}
                                            />
                                        </div>
                                    ))}
                            </HStack>
                        </VStack>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <PEButton
                        title={t('create-menu-courses-add-course')}
                        disabled={disabled}
                        onClick={(): void => onSuccess({ title, mealOptions: Array.from(selectedMeals.values()) })}
                    />
                </DialogActions>
            </Dialog>

            <PEMobileBottomSheet open={open && isMobile} onClose={onCancel} title={'Wähle Gerichte für den Gang aus'}>
                <VStack gap={32} style={{ marginTop: 8 }}>
                    <PETextField value={title} onChange={setTitle} type="text" placeholder={t('create-menu-course-name')} />

                    <HStack gap={16} className="w-full" style={{ justifyContent: 'flex-start', overflowX: 'scroll' }}>
                        <PETabItem
                            title={translateMealType('meal-type-all')}
                            onClick={(): void => setSelectedMealType('ALL')}
                            active={selectedMealType === 'ALL'}
                        />

                        {mealTypes.map((mealType, index) => (
                            <PETabItem
                                key={index}
                                title={translateMealType(mealTypeTranslations[mealType])}
                                onClick={(): void => setSelectedMealType(mealType)}
                                active={selectedMealType === mealType}
                            />
                        ))}
                    </HStack>

                    <HStack gap={16} className="w-full" style={{ flexWrap: 'wrap', justifyContent: isMobile ? 'center' : 'flex-start' }}>
                        {meals
                            .filter(({ type }) => (selectedMealType === 'ALL' ? true : type === selectedMealType))
                            .map((meal, index) => (
                                <div key={index} className="flex basis-[330px]">
                                    <PEMealCardDesktop
                                        onClick={(): void => {
                                            if (selectedMeals.has(meal.mealId)) selectedMeals.delete(meal.mealId);
                                            else selectedMeals.set(meal.mealId, meal);
                                            setSelectedMeals(new Map(selectedMeals));
                                        }}
                                        title={meal.title}
                                        description={meal.description}
                                        imageUrl={meal.imageUrl ?? undefined}
                                        active={selectedMeals.has(meal.mealId)}
                                    />
                                </div>
                            ))}
                    </HStack>

                    <PEButton
                        title={t('create-menu-courses-add-course')}
                        disabled={disabled}
                        onClick={(): void => onSuccess({ title, mealOptions: Array.from(selectedMeals.values()) })}
                    />
                </VStack>
            </PEMobileBottomSheet>
        </>
    );
}
