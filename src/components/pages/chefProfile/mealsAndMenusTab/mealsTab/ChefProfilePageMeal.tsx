import { useQuery } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import { type ReactElement } from 'react';
import { FindCookMealsDocument } from '../../../../../data-source/generated/graphql';
import PEMealCard from '../../../../cards/mealCard/PEMealCard';
import HStack from '../../../../utility/hStack/HStack';

export interface ChefProfilePageMealProps {
    cookId: string;
}

export default function ChefProfilePageMeal({ cookId }: ChefProfilePageMealProps): ReactElement {
    const { data, loading } = useQuery(FindCookMealsDocument, { variables: { cookId } });

    const meals = data?.cooks.meals.findMany ?? [];

    return (
        <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            {meals.map(({ title, description, imageUrl }, index) => (
                <PEMealCard key={index} title={title} description={description} imageUrl={imageUrl ?? undefined} />
            ))}
            {/* {archive.length && (
                <>
                    <p className="text-text-m-bold w-full">Archive</p>
                    <HStack
                        className="relative w-full gap-6 flex-wrap opacity-30"
                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        {archive.map((meal, index) => (
                            <PEMealCard
                                key={`${index}_archive_ChefProfilePageMeal`}
                                title={meal.title}
                                description={meal.description}
                                imageUrl={meal.imageUrl}
                            />
                        ))}
                    </HStack>
                </>
            )} */}
            {loading && (
                <Dialog open>
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}
        </HStack>
    );
}
