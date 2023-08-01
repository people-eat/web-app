import { useQuery } from '@apollo/client';
import { Menu, MenuItem } from '@mui/material';
import Divider from '@mui/material/Divider';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { FindCookMealsDocument } from '../../../../../../data-source/generated/graphql';
import PEMealCard from '../../../../../cards/mealCard/PEMealCard';
import PEButton from '../../../../../standard/buttons/PEButton';
import { Icon } from '../../../../../standard/icon/Icon';
import PEIcon from '../../../../../standard/icon/PEIcon';
import PEIconButton from '../../../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../../../standard/tabItem/PETabItem';
import PEMultiLineTextField from '../../../../../standard/textFields/PEMultiLineTextField';
import PETextField from '../../../../../standard/textFields/PETextField';
import HStack from '../../../../../utility/hStack/HStack';
import VStack from '../../../../../utility/vStack/VStack';
import CreateCookMenuCourse, { type CreateCookMenuCourseDto } from './CreateCookMenuCourse';
import UpdateCookMenuCourse from './UpdateCookMenuCourse';

export interface ChefProfilePageCreateMenusStep2Props {
    cookId: string;

    description: string;
    setDescription: (changedDescription: string) => void;

    greetingFromKitchen?: string;
    setGreetingFromKitchen: (changedGreetingFromKitchen?: string) => void;

    courses: CreateCookMenuCourseDto[];
    setCourses: (changedCourses: CreateCookMenuCourseDto[]) => void;

    onContinue: () => void;
}

export default function ChefProfilePageCreateMenusStep2({
    cookId,
    description,
    setDescription,
    greetingFromKitchen,
    setGreetingFromKitchen,
    courses,
    setCourses,
    onContinue,
}: ChefProfilePageCreateMenusStep2Props): ReactElement {
    const { t } = useTranslation('chef-profile');

    const [showCreateCourseDialog, setShowCreateCourseDialog] = useState(false);
    const [showUpdateCourseDialog, setShowUpdateCourseDialog] = useState(false);

    const [selectedMealId, setSelectedMealId] = useState<string | undefined>(undefined);
    const [activeCourse, setActiveCourse] = useState<CreateCookMenuCourseDto | null>(null);
    const [activeCourseIndex, setActiveCourseIndex] = useState<number | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const { data } = useQuery(FindCookMealsDocument, { variables: { cookId } });
    const meals = data?.cooks.meals.findMany ?? [];

    let disabled = false;

    for (const course of courses) {
        if (course.title === '') {
            disabled = true;
            break;
        }
    }

    return (
        <VStack gap={16} className="w-full" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack gap={32} className="w-full" style={{ alignItems: 'flex-start' }}>
                <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                    <p className="text-text-m-bold">{t('create-menu-greeting-form-kitchen-label')}</p>

                    <HStack className="gap-4 w-full h-14" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                        <PETabItem
                            title={t('create-menu-yes')}
                            onClick={(): void => setGreetingFromKitchen('')}
                            active={greetingFromKitchen !== undefined && greetingFromKitchen !== null}
                        />
                        <PETabItem
                            title={t('create-menu-no')}
                            onClick={(): void => setGreetingFromKitchen(undefined)}
                            active={greetingFromKitchen === undefined || greetingFromKitchen === null}
                        />
                        {greetingFromKitchen !== undefined && (
                            <PETextField type={'text'} value={greetingFromKitchen ?? undefined} onChange={setGreetingFromKitchen} />
                        )}
                    </HStack>
                </VStack>

                <VStack className="w-full gap-2" style={{ alignItems: 'flex-start' }}>
                    <span className="text-text-m-bold">{t('create-menu-courses')}</span>
                </VStack>

                {courses.map((course, index) => (
                    <VStack key={index} className="w-full" gap={16} style={{ alignItems: 'flex-start' }}>
                        <HStack gap={16} className="w-full" style={{ alignItems: 'center' }}>
                            <PETextField
                                placeholder={t('create-menu-course-name')}
                                value={course.title}
                                onChange={(changedTitle: string): void =>
                                    setCourses(
                                        courses.map(
                                            (c, index2): CreateCookMenuCourseDto =>
                                                index === index2 ? { title: changedTitle, mealOptions: c.mealOptions } : c,
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

                        <HStack className="w-full py-4 box-border" gap={16} style={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                            <VStack
                                onClick={(): void => {
                                    setShowUpdateCourseDialog(true);
                                    setActiveCourse(course);
                                    setActiveCourseIndex(index);
                                }}
                                className="items-center w-[388px] h-[140px] border-orange border-[1px] border-solid hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 justify-center rounded-4"
                            >
                                <PEIcon icon={Icon.plusOrange} />
                                <span className="text-orange text-text-sm">{t('create-menu-courses-add-meal')}</span>
                            </VStack>

                            {course.mealOptions.map((meal) => (
                                <div
                                    key={meal.mealId}
                                    className="flex w-[390px] relative"
                                    onClick={(event): void => {
                                        setAnchorEl(event.currentTarget);
                                        setSelectedMealId(meal.mealId);
                                        setActiveCourseIndex(index);
                                        setActiveCourse(course);
                                    }}
                                >
                                    <PEMealCard imageUrl={meal.imageUrl ?? undefined} title={meal.title} description={meal.description} />
                                </div>
                            ))}
                        </HStack>

                        {showUpdateCourseDialog && activeCourse && activeCourseIndex !== null && (
                            <UpdateCookMenuCourse
                                open={showUpdateCourseDialog}
                                meals={meals.filter(
                                    (meal) => !activeCourse.mealOptions.find((courseMeal) => courseMeal.mealId === meal.mealId),
                                )}
                                onSuccess={(updatedCourse): void => {
                                    setCourses([
                                        ...courses.slice(0, activeCourseIndex),
                                        updatedCourse,
                                        ...courses.slice(activeCourseIndex + 1),
                                    ]);
                                    setShowUpdateCourseDialog(false);
                                }}
                                onCancel={(): void => {
                                    setShowUpdateCourseDialog(false);
                                }}
                                selectedCourseMeals={new Map(activeCourse.mealOptions.map((item) => [item.mealId, item]))}
                            />
                        )}

                        {open && selectedMealId && activeCourseIndex !== null && activeCourse && (
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={(): void => setAnchorEl(null)}
                                onClick={(): void => setAnchorEl(null)}
                                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                sx={{ borderRadius: '12px', overflow: 'hidden' }}
                            >
                                <MenuItem
                                    sx={{ width: '200px' }}
                                    onClick={(): void => {
                                        setCourses([
                                            ...courses.slice(0, activeCourseIndex),
                                            {
                                                title: activeCourse.title,
                                                mealOptions: activeCourse.mealOptions.filter((meal) => meal.mealId !== selectedMealId),
                                            },
                                            ...courses.slice(activeCourseIndex + 1),
                                        ]);
                                    }}
                                >
                                    {t('create-menu-courses-remove-meal')}
                                </MenuItem>
                            </Menu>
                        )}
                    </VStack>
                ))}

                <PEButton
                    type="secondary"
                    className="max-w-[250px]"
                    onClick={(): void => setShowCreateCourseDialog(true)}
                    title={t('create-menu-courses-add-course')}
                />

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

                <Divider className="w-full" />

                <VStack style={{ alignItems: 'flex-start' }} className="w-full">
                    <p className="text-text-m-bold">{t('create-menu-description')}</p>

                    <PEMultiLineTextField value={description} onChange={setDescription} />
                </VStack>

                <PEButton title={t('create-menu-continue')} onClick={onContinue} disabled={disabled} />
            </VStack>
        </VStack>
    );
}
