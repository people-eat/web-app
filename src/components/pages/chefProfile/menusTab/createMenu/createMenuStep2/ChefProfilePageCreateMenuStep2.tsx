import { useQuery } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { FindCookMealsDocument } from '../../../../../../data-source/generated/graphql';
import PEMealCard from '../../../../../cards/mealCard/PEMealCard';
import PEButton from '../../../../../standard/buttons/PEButton';
import { Icon } from '../../../../../standard/icon/Icon';
import PEIcon from '../../../../../standard/icon/PEIcon';
import PEIconButton from '../../../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../../../standard/tabItem/PETabItem';
import PETextField from '../../../../../standard/textFields/PETextField';
import HStack from '../../../../../utility/hStack/HStack';
import Spacer from '../../../../../utility/spacer/Spacer';
import VStack from '../../../../../utility/vStack/VStack';
import CreateCookMenuCourse, { type CreateCookMenuCourseDto } from './CreateCookMenuCourse';

export interface ChefProfilePageCreateMenusStep2Props {
    cookId: string;

    greetingFromKitchen?: string;
    setGreetingFromKitchen: (changedGreetingFromKitchen?: string) => void;

    courses: CreateCookMenuCourseDto[];
    setCourses: (changedCourses: CreateCookMenuCourseDto[]) => void;

    onContinue: () => void;
}

export default function ChefProfilePageCreateMenusStep2({
    cookId,
    greetingFromKitchen,
    setGreetingFromKitchen,
    courses,
    setCourses,
    onContinue,
}: ChefProfilePageCreateMenusStep2Props): ReactElement {
    const { t } = useTranslation('chef-profile');

    const [showCreateCourseDialog, setShowCreateCourseDialog] = useState(false);

    const { data } = useQuery(FindCookMealsDocument, { variables: { cookId } });
    const meals = data?.cooks.meals.findMany ?? [];

    return (
        <VStack gap={16} className="w-full" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack gap={32} className="w-full" style={{ alignItems: 'flex-start' }}>
                <VStack className="w-full">
                    <p className="w-full text-text-m-bold my-0">{t('create-menu-greeting-form-kitchen-label')}</p>

                    <HStack gap={16} className="w-full my-4" style={{ alignItems: 'center' }}>
                        <PETabItem
                            title={t('create-menu-yes')}
                            onClick={(): void => setGreetingFromKitchen('')}
                            active={greetingFromKitchen !== undefined}
                        />
                        <PETabItem
                            title={t('create-menu-no')}
                            onClick={(): void => setGreetingFromKitchen(undefined)}
                            active={greetingFromKitchen === undefined}
                        />
                        {greetingFromKitchen === undefined && (
                            <PETextField type={'text'} value={greetingFromKitchen} onChange={(): void => undefined} disabled={true} />
                        )}
                        {greetingFromKitchen !== undefined && (
                            <PETextField type={'text'} value={greetingFromKitchen} onChange={setGreetingFromKitchen} />
                        )}
                    </HStack>
                </VStack>

                <HStack className="w-full">
                    <span className="text-text-m-bold">{t('create-menu-courses')}</span>
                    <Spacer />
                    <PEButton
                        className="max-w-[250px]"
                        onClick={(): void => setShowCreateCourseDialog(true)}
                        title={t('create-menu-courses-add-course')}
                    />
                </HStack>

                {courses.map((course, index) => (
                    <VStack key={index} className="w-full" gap={16} style={{ alignItems: 'flex-start' }}>
                        <HStack gap={16} className="w-full" style={{ alignItems: 'center' }}>
                            <PETextField
                                value={course.title}
                                onChange={(changedTitle: string): void =>
                                    setCourses(
                                        courses.map(
                                            (c, index2): CreateCookMenuCourseDto =>
                                                index === index2 ? { title: changedTitle, meals: c.meals } : c,
                                        ),
                                    )
                                }
                                type="text"
                            />
                            <PEIconButton
                                icon={Icon.trash}
                                onClick={(): void => setCourses(courses.filter((_, index2): boolean => index !== index2))}
                            />
                        </HStack>

                        <HStack className="w-full" gap={16} style={{ flexWrap: 'wrap', padding: '16px', justifyContent: 'flex-start' }}>
                            <VStack
                                onClick={(): void => undefined}
                                className="items-center w-[410px] h-[140px] border-orange border-[1px] border-solid hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 justify-center rounded-4"
                            >
                                <PEIcon icon={Icon.plusOrange} />
                                <span className="text-orange text-text-sm">Add Dish</span>
                            </VStack>

                            {course.meals.map((meal) => (
                                <PEMealCard key={meal.mealId} title={meal.title} description={meal.description} />
                            ))}
                        </HStack>
                    </VStack>
                ))}

                {showCreateCourseDialog && (
                    <CreateCookMenuCourse
                        open={showCreateCourseDialog}
                        meals={meals}
                        onSuccess={(course): void => {
                            setCourses([...courses, course]);
                            setShowCreateCourseDialog(false);
                        }}
                        onCancel={(): void => setShowCreateCourseDialog(false)}
                    />
                )}

                <PEButton title={t('create-menu-continue')} onClick={onContinue} />
            </VStack>
        </VStack>
    );
}
