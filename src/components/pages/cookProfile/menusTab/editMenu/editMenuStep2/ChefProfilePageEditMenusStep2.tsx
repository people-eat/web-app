import { useMutation, useQuery } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState, type ReactElement } from 'react';
import {
    FindCookMealsDocument,
    UpdateCookMenuGreetingFromKitchenDocument,
    type MealType,
} from '../../../../../../data-source/generated/graphql';
import PEMealCard from '../../../../../cards/mealCard/PEMealCard';
import PEButton from '../../../../../standard/buttons/PEButton';
import { Icon } from '../../../../../standard/icon/Icon';
import PEIcon from '../../../../../standard/icon/PEIcon';
import PEIconButton from '../../../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../../../standard/tabItem/PETabItem';
import PETextField from '../../../../../standard/textFields/PETextField';
import HStack from '../../../../../utility/hStack/HStack';
import VStack from '../../../../../utility/vStack/VStack';
import { type MenuEntity } from '../../ChefProfilePageMenusTab';
import CreateCookMenuCourse from '../../createMenu/createMenuStep2/CreateCookMenuCourse';

export interface ChefProfilePageEditMenusStep2Props {
    menu: MenuEntity;
    cookId: string;
    onChangesApplied: () => void;
}

type TCoursesList = {
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

const INIT_COURSES: TCoursesList = [];

export default function ChefProfilePageEditMenusStep2({
    cookId,
    menu,
    onChangesApplied,
}: ChefProfilePageEditMenusStep2Props): ReactElement {
    const { t } = useTranslation('chef-profile');
    const { t: common } = useTranslation('common');

    const [editMode, setEditMode] = useState(false);

    const [greetingFromKitchen, setGreetingFromKitchen] = useState<string | undefined>(menu.greetingFromKitchen ?? undefined);
    const [courses, setCourses] = useState<TCoursesList>(menu.courses);

    const [showCreateCourseDialog, setShowCreateCourseDialog] = useState(false);

    const { data } = useQuery(FindCookMealsDocument, { variables: { cookId } });
    const meals = data?.cooks.meals.findMany ?? [];

    const [updateGreetingFromKitchen] = useMutation(UpdateCookMenuGreetingFromKitchenDocument, {
        variables: { cookId, menuId: menu.menuId, greetingFromKitchen },
    });

    function handleSaveUpdates(): void {
        if (menu.greetingFromKitchen !== greetingFromKitchen) {
            void updateGreetingFromKitchen()
                .then((result) => result.data?.cooks.menus.success && onChangesApplied())
                .catch((e) => console.error(e));
        }
    }

    useEffect(() => {
        setGreetingFromKitchen(menu.greetingFromKitchen ?? undefined);
    }, [menu]);

    useEffect(() => {
        const beforeUnloadListener = (event: BeforeUnloadEvent): void => {
            if (courses !== INIT_COURSES) {
                event.preventDefault();
                event.returnValue = common('beforeunload');
            }
        };

        const handlePopState = (): void => {
            if (courses !== INIT_COURSES) {
                if (window.confirm(common('beforeunload'))) {
                    window.removeEventListener('beforeunload', beforeUnloadListener);
                    window.history.back();
                }
            }
        };

        window.addEventListener('popstate', handlePopState);
        window.addEventListener('beforeunload', beforeUnloadListener);

        return () => {
            window.removeEventListener('popstate', handlePopState);
            window.removeEventListener('beforeunload', beforeUnloadListener);
        };
    }, [courses]);

    return (
        <VStack className="w-full gap-6" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack gap={32} className="w-full" style={{ alignItems: 'flex-start' }}>
                {editMode && (
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
                                <PETextField
                                    type={'text'}
                                    value={greetingFromKitchen ?? undefined}
                                    disabled={!editMode}
                                    onChange={setGreetingFromKitchen}
                                />
                            )}
                        </HStack>
                    </VStack>
                )}

                {!editMode && menu.greetingFromKitchen && (
                    <PETextField type={'text'} value={greetingFromKitchen} disabled={!editMode} onChange={setGreetingFromKitchen} />
                )}

                {courses.map((course, index) => (
                    <VStack key={index} className="w-full" gap={16} style={{ alignItems: 'flex-start' }}>
                        <HStack gap={16} className="w-full" style={{ alignItems: 'center' }}>
                            <PETextField
                                disabled={!editMode}
                                value={course.title}
                                onChange={(changedTitle: string): void =>
                                    setCourses(
                                        courses.map(
                                            (
                                                c,
                                                index2,
                                            ): {
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
                                            } => (index === index2 ? { ...c, title: changedTitle } : c),
                                        ),
                                    )
                                }
                                type="text"
                            />
                            {editMode && (
                                <PEIconButton
                                    icon={Icon.trash}
                                    onClick={(): void => setCourses(courses.filter((_, index2): boolean => index !== index2))}
                                />
                            )}
                        </HStack>

                        <HStack className="w-full py-4 box-border" gap={16} style={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                            {editMode && (
                                <VStack
                                    onClick={(): void => undefined}
                                    className="items-center w-[388px] h-[140px] border-orange border-[1px] border-solid hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 justify-center rounded-4"
                                >
                                    <PEIcon icon={Icon.plusOrange} />
                                    <span className="text-orange text-text-sm">Add Dish</span>
                                </VStack>
                            )}

                            {course.mealOptions.map((mealOption) => (
                                <div
                                    key={mealOption.meal.mealId}
                                    className="flex w-[390px] relative"
                                    onClick={(_event): void => {
                                        // setAnchorEl(event.currentTarget);
                                        // setSelectedMealId(mealOption.meal.mealId);
                                    }}
                                >
                                    <PEMealCard title={mealOption.meal.title} description={mealOption.meal.description} />
                                </div>
                            ))}
                        </HStack>

                        {/* {showUpdateCourseDialog && (
                            <UpdateCookMenuCourse
                                open={showUpdateCourseDialog}
                                meals={meals.filter((meal) => !course.meals.find((courseMeal) => courseMeal.mealId === meal.mealId))}
                                courseIndex={index}
                                onSuccess={(updatedCourse): void => {
                                    setCourses([...courses.slice(0, index), updatedCourse, ...courses.slice(index + 1)]);
                                    setShowUpdateCourseDialog(false);
                                }}
                                onCancel={(): void => {
                                    setShowUpdateCourseDialog(false);
                                }}
                                selectedCourseMeals={new Map(course.meals.map((item) => [item.mealId, item]))}
                            />
                        )} */}

                        {/* {open && selectedMealId && (
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
                                            ...courses.slice(0, index),
                                            { title: course.title, meals: course.meals.filter((meal) => meal.mealId !== selectedMealId) },
                                            ...courses.slice(index + 1),
                                        ]);
                                    }}
                                >
                                    Delete
                                </MenuItem>
                            </Menu>
                        )} */}
                    </VStack>
                ))}

                {editMode && (
                    <PEButton
                        type="secondary"
                        className="max-w-[250px]"
                        onClick={(): void => setShowCreateCourseDialog(true)}
                        title={t('create-menu-courses-add-course')}
                    />
                )}

                {showCreateCourseDialog && (
                    <CreateCookMenuCourse
                        open={showCreateCourseDialog}
                        meals={meals}
                        onSuccess={(_course): void => {
                            // setCourses([...courses, course]);
                            // setShowCreateCourseDialog(false);
                        }}
                        onCancel={(): void => setShowCreateCourseDialog(false)}
                    />
                )}

                <HStack className="w-full" gap={16} style={{ marginTop: 32 }}>
                    {!editMode && <PEButton title="Edit" onClick={(): void => setEditMode(true)} type="secondary" />}
                    {editMode && (
                        <>
                            <PEButton title="Cancel" onClick={(): void => setEditMode(false)} type="secondary" />
                            <PEButton
                                title="Save"
                                onClick={handleSaveUpdates}
                                disabled={(menu.greetingFromKitchen ?? undefined) === greetingFromKitchen}
                            />
                        </>
                    )}
                </HStack>
            </VStack>
        </VStack>
    );
}
