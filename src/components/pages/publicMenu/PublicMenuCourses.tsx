import classNames from 'classnames';
import { useEffect, useState, type ReactElement } from 'react';
import { type CreateConfiguredMenuCourseRequest, type GetPublicMenuPageDataQuery } from '../../../data-source/generated/graphql';
import PEMEalCard from '../../cards/mealCard/PEMealCard';
import styles from './PublicMenuCourses.module.css';

interface Meal {
    mealId: string;
    title: string;
    description: string;
    imageUrl?: string | null;
}

interface MenuCourse {
    index: number;
    courseId: string;
    title: string;
    mealOptions: { index: number; meal: Meal }[];
}

export interface PublicMenuCoursesProps {
    className?: string;
    publicMenu: NonNullable<GetPublicMenuPageDataQuery['publicMenus']['findOne']>;
    onCourseSelectionChange: (
        configuredMenuCourses: CreateConfiguredMenuCourseRequest[],
        configuredMenuCoursesForPreview: { courseId: string; courseTitle: string; mealTitle: string }[],
    ) => void;
}

export default function PublicMenuCourses({ className, publicMenu, onCourseSelectionChange }: PublicMenuCoursesProps): ReactElement {
    const [courses, setCourses] = useState<MenuCourse[]>([]);

    const [courseSelections, setCourseSelections] = useState<Map<{ courseId: string; title: string; index: number }, Meal | undefined>>(
        new Map(publicMenu.courses.map((course) => [course, course.mealOptions[0]?.meal ?? undefined])),
    );

    useEffect(() => {
        const courseSelectionsArray = Array.from(courseSelections.entries());
        courseSelectionsArray.sort(([courseA], [courseB]) => courseA.index - courseB.index);
        onCourseSelectionChange(
            courseSelectionsArray.map(([{ courseId }, meal]) => ({ courseId, mealId: meal!.mealId })),
            courseSelectionsArray.map(([{ courseId, title }, meal]) => ({ courseId, courseTitle: title, mealTitle: meal!.title })),
        );
        // adding the setter to the dependencies array results in an endless loop. Investigate
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseSelections]);

    useEffect(() => {
        const sortedCourses = publicMenu.courses;
        sortedCourses.sort((courseA, courseB) => courseA.index - courseB.index);

        setCourses(sortedCourses);
    }, [publicMenu]);

    return (
        <div className={classNames(styles.container, className)}>
            {publicMenu.greetingFromKitchen && (
                <div className={styles.greetingFromKitchen}>
                    <span className="text-heading-m">Gruß aus der Küche</span>
                    <span style={{ color: 'gray' }}>
                        Der Gruß aus der Küche regt den Apetit an und steigert die Vorfreude auf das Menü.
                    </span>
                </div>
            )}
            {courses.map((course) => (
                <div key={course.courseId} className={styles.course}>
                    <span className="text-heading-m">{course.title}</span>
                    <div className={styles.mealOptions}>
                        {course.mealOptions.map((mealOption) => (
                            <PEMEalCard
                                key={mealOption.index}
                                title={mealOption.meal.title}
                                description={mealOption.meal.description}
                                imageUrl={mealOption.meal.imageUrl ?? undefined}
                                active={courseSelections.get(course)?.mealId === mealOption.meal.mealId}
                                onClick={(): void => setCourseSelections(new Map(courseSelections.set(course, mealOption.meal)))}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
