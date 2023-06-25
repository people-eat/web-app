import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { type MealType } from '../../../../../../data-source/generated/graphql';
import useResponsive from '../../../../../../hooks/useResponsive';
import { mealTypes } from '../../../../../../shared/mealTypes';
import PEMealCard from '../../../../../cards/mealCard/PEMealCard';
import PEButton from '../../../../../standard/buttons/PEButton';
import { Icon } from '../../../../../standard/icon/Icon';
import PEIconButton from '../../../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../../../standard/tabItem/PETabItem';
import PETextField from '../../../../../standard/textFields/PETextField';
import HStack from '../../../../../utility/hStack/HStack';
import Spacer from '../../../../../utility/spacer/Spacer';
import VStack from '../../../../../utility/vStack/VStack';
import { type MealEntity } from '../../ChefProfilePageMenusTab';

export interface CreateCookMenuCourseDto {
    title: string;
    meals: MealEntity[];
}

export interface CreateCookMenuCourseProps {
    meals: MealEntity[];
    open: boolean;
    onSuccess: (course: CreateCookMenuCourseDto) => void;
    onCancel: () => void;
}

export default function CreateCookMenuCourse({ open, meals, onSuccess, onCancel }: CreateCookMenuCourseProps): ReactElement {
    const { isMobile } = useResponsive();
    const { t } = useTranslation('chef-profile');

    const [title, setTitle] = useState('');
    const [selectedMealType, setSelectedMealType] = useState<MealType | 'ALL'>('ALL');

    const [selectedMeals, setSelectedMeals] = useState<Map<string, MealEntity>>(new Map());

    return (
        <Dialog open={open} maxWidth="md" sx={{ margin: 0, '& .MuiPaper-root': { margin: 0 } }}>
            <DialogTitle>
                <HStack>
                    <span>{t('create-menu-courses-add-course')}</span>
                    <Spacer />
                    <PEIconButton withoutShadow bg="white" icon={Icon.close} onClick={onCancel} iconSize={24} />
                </HStack>
            </DialogTitle>
            <DialogContent sx={{ margin: 0, padding: isMobile ? '8px' : '16px', boxSizing: 'border-box' }}>
                <DialogContentText>
                    <VStack gap={32}>
                        <PETextField value={title} onChange={setTitle} type="text" placeholder="Course Name" />

                        <HStack gap={16} className="w-full" style={{ justifyContent: 'flex-start', overflowX: 'scroll' }}>
                            <PETabItem title={'ALL'} onClick={(): void => setSelectedMealType('ALL')} active={selectedMealType === 'ALL'} />

                            {mealTypes.map((mealType, index) => (
                                <PETabItem
                                    key={index}
                                    title={mealType.toLowerCase()}
                                    onClick={(): void => setSelectedMealType(mealType)}
                                    active={selectedMealType === mealType}
                                />
                            ))}
                        </HStack>

                        <HStack gap={16} className="w-full" style={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                            {meals
                                .filter(({ type }) => (selectedMealType === 'ALL' ? true : type === selectedMealType))
                                .map((meal, index) => (
                                    <PEMealCard
                                        key={index}
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
                                ))}
                        </HStack>
                    </VStack>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <PEButton title={t('add-gear')} onClick={(): void => onSuccess({ title, meals: Array.from(selectedMeals.values()) })} />
            </DialogActions>
        </Dialog>
    );
}
