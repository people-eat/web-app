import { useMutation, useQuery } from '@apollo/client';
import { Menu, MenuItem } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState, type ReactElement } from 'react';
import {
    CreateOneCookMenuCourseDocument,
    DeleteOneCookMenuCourseDocument,
    DeleteOneCookMenuCourseMealOptionDocument,
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
import UpdateCookMenuCourse from '../../createMenu/createMenuStep2/UpdateCookMenuCourse';

export interface ChefProfilePageEditMenusStep2Props {
    menu: MenuEntity;
    cookId: string;
    onChangesApplied: () => void;
}

// eslint-disable-next-line max-statements
export default function ChefProfilePageEditMenusStep2({
    cookId,
    menu,
    onChangesApplied,
}: ChefProfilePageEditMenusStep2Props): ReactElement {
    const { t } = useTranslation('chef-profile');
    const { t: commonTranslations } = useTranslation('common');

    const [editMode, setEditMode] = useState(false);

    const [greetingFromKitchen, setGreetingFromKitchen] = useState<string | undefined>(menu.greetingFromKitchen ?? undefined);
    const [courses, setCourses] = useState<
        {
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
        }[]
    >(menu.courses);

    const [showCreateCourseDialog, setShowCreateCourseDialog] = useState(false);
    const [showUpdateCourseDialog, setShowUpdateCourseDialog] = useState(false);

    const { data } = useQuery(FindCookMealsDocument, { variables: { cookId } });
    const meals = data?.cooks.meals.findMany ?? [];

    const [updateGreetingFromKitchen] = useMutation(UpdateCookMenuGreetingFromKitchenDocument, {
        variables: { cookId, menuId: menu.menuId, greetingFromKitchen },
    });

    const [createCourse] = useMutation(CreateOneCookMenuCourseDocument);
    const [deleteCourse] = useMutation(DeleteOneCookMenuCourseDocument);
    const [deleteMealOption] = useMutation(DeleteOneCookMenuCourseMealOptionDocument);

    const [selectedMealOption, setSelectedMealOption] = useState<{ courseId: string; mealId: string } | undefined>();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    function handleSaveUpdates(): void {
        if (menu.greetingFromKitchen !== greetingFromKitchen) {
            void updateGreetingFromKitchen()
                .then((result) => result.data?.cooks.menus.success && onChangesApplied())
                .catch((e) => console.error(e));
        }
    }

    useEffect(() => {
        setGreetingFromKitchen(menu.greetingFromKitchen ?? undefined);
        setCourses(menu.courses);
    }, [menu]);

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
                    <VStack className="w-full">
                        <p className="w-full mb-4 text-text-m-bold my-0">{t('greeting-from-kitchen')}</p>
                        <PETextField type={'text'} value={greetingFromKitchen} disabled={!editMode} onChange={setGreetingFromKitchen} />
                    </VStack>
                )}

                {courses.map((course, index) => (
                    <VStack key={index} className="w-full" gap={16} style={{ alignItems: 'flex-start' }}>
                        <HStack gap={16} className="w-full" style={{ alignItems: 'center' }}>
                            {!editMode && <p className="w-full mb-4 text-text-m-bold my-0">{course.title}</p>}
                            {editMode && (
                                <>
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
                                    <PEIconButton
                                        icon={Icon.trash}
                                        onClick={(): void =>
                                            void deleteCourse({
                                                variables: { cookId, menuId: menu.menuId, courseId: course.courseId },
                                            }).then((result) => result.data?.cooks.menus.courses.success && onChangesApplied())
                                        }
                                    />
                                </>
                            )}
                        </HStack>

                        <HStack className="w-full py-4 box-border" gap={16} style={{ flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                            {editMode && (
                                <VStack
                                    onClick={(): void => undefined}
                                    className="items-center w-[388px] h-[140px] border-orange border-[1px] border-solid hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 justify-center rounded-4"
                                >
                                    <PEIcon icon={Icon.plusOrange} />
                                    <span className="text-orange text-text-sm">{t('create-menu-courses-add-meal')}</span>
                                </VStack>
                            )}

                            {course.mealOptions.map((mealOption) => (
                                <div
                                    key={mealOption.meal.mealId}
                                    className="flex w-[390px] relative"
                                    onClick={(event): void => {
                                        setAnchorEl(event.currentTarget);
                                        setSelectedMealOption({ courseId: course.courseId, mealId: mealOption.meal.mealId });
                                    }}
                                >
                                    <PEMealCard
                                        imageUrl={mealOption.meal.imageUrl ?? undefined}
                                        title={mealOption.meal.title}
                                        description={mealOption.meal.description}
                                    />
                                </div>
                            ))}
                        </HStack>

                        {showUpdateCourseDialog && (
                            <UpdateCookMenuCourse
                                open={showUpdateCourseDialog}
                                meals={meals.filter(
                                    (meal) => !course.mealOptions.find((mealOption) => mealOption.meal.mealId === meal.mealId),
                                )}
                                onSuccess={(_updatedCourse): void => {
                                    // setCourses([...courses.slice(0, index), updatedCourse, ...courses.slice(index + 1)]);
                                    setShowUpdateCourseDialog(false);
                                }}
                                onCancel={(): void => {
                                    setShowUpdateCourseDialog(false);
                                }}
                                // course.mealOptions.map((mealOption) => [mealOption.meal.mealId, mealOption.meal])
                                selectedCourseMeals={new Map()}
                            />
                        )}

                        {open && selectedMealOption && (
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
                                        void deleteMealOption({
                                            variables: {
                                                cookId,
                                                mealId: selectedMealOption.mealId,
                                                courseId: selectedMealOption.courseId,
                                                menuId: menu.menuId,
                                            },
                                        }).then(({ data: successData }) => {
                                            if (!successData?.cooks.menus.courses.mealOptions.deleteOne) return;
                                            onChangesApplied();
                                        });
                                    }}
                                >
                                    {t('create-menu-courses-remove-meal')}
                                </MenuItem>
                            </Menu>
                        )}
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
                        onSuccess={(course): void => {
                            void createCourse({
                                variables: {
                                    cookId,
                                    menuId: menu.menuId,
                                    request: {
                                        index: 0,
                                        title: course.title,
                                        mealOptions: course.mealOptions.map(({ mealId }, mealIndex) => ({ index: mealIndex, mealId })),
                                    },
                                },
                            }).then((result) => result.data?.cooks.menus.courses.success && onChangesApplied());
                            setShowCreateCourseDialog(false);
                        }}
                        onCancel={(): void => setShowCreateCourseDialog(false)}
                    />
                )}

                <HStack className="w-full" gap={16} style={{ marginTop: 32 }}>
                    {!editMode && <PEButton title={commonTranslations('edit')} onClick={(): void => setEditMode(true)} type="secondary" />}
                    {editMode && (
                        <>
                            <PEButton title={commonTranslations('cancel')} onClick={(): void => setEditMode(false)} type="secondary" />
                            <PEButton
                                title={commonTranslations('booking-global-requests')}
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
