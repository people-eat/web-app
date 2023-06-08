import { useQuery } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import { useState, type ReactElement } from 'react';
import { FindCookMealsDocument, type MealType } from '../../../../data-source/generated/graphql';
import { mealTypes } from '../../../../shared/mealTypes';
import PEMealCard from '../../../cards/mealCard/PEMealCard';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMeal from './ChefProfilePageCreateMeal';

export interface ChefProfilePageMealsTabProps {
    cookId: string;
}

export default function ChefProfilePageMealsTab({ cookId }: ChefProfilePageMealsTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<MealType | 'ALL' | 'CREATE'>('ALL');

    const { data, loading, refetch } = useQuery(FindCookMealsDocument, { variables: { cookId } });

    const meals = data?.cooks.meals.findMany ?? [];

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg:my-10 gap-6">
            <HStack className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-6" style={{ alignItems: 'center' }}>
                <HStack className="gap-4">
                    <PETabItem title="All" onClick={(): void => setSelectedTab('ALL')} active={selectedTab === 'ALL'} />
                    {mealTypes.map((mealType, index) => (
                        <PETabItem
                            key={index}
                            title={mealType}
                            onClick={(): void => setSelectedTab(mealType)}
                            active={selectedTab === mealType}
                        />
                    ))}
                </HStack>

                <Spacer />

                <HStack className="gap-4">
                    <PEIconButton icon={Icon.filtersOrange} border="1px solid rgba(255, 100, 51, 1)" bg="white" withoutShadow />
                    <PEIconButton
                        onClick={(): void => setSelectedTab('CREATE')}
                        icon={Icon.plusWhite}
                        bg="rgba(255, 100, 51, 1)"
                        withoutShadow
                    />
                </HStack>
            </HStack>

            {selectedTab === 'ALL' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {meals.map(({ title, description, imageUrl }, index) => (
                        <PEMealCard key={index} title={title} description={description} imageUrl={imageUrl ?? undefined} />
                    ))}
                </HStack>
            )}

            {selectedTab === 'STARTER' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {meals
                        .filter(({ type }) => type === 'STARTER')
                        .map(({ title, description, imageUrl }, index) => (
                            <PEMealCard key={index} title={title} description={description} imageUrl={imageUrl ?? undefined} />
                        ))}
                </HStack>
            )}

            {selectedTab === 'MAIN_COURSE' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {meals
                        .filter(({ type }) => type === 'MAIN_COURSE')
                        .map(({ title, description, imageUrl }, index) => (
                            <PEMealCard key={index} title={title} description={description} imageUrl={imageUrl ?? undefined} />
                        ))}
                </HStack>
            )}

            {selectedTab === 'DESSERT' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {meals
                        .filter(({ type }) => type === 'DESSERT')
                        .map(({ title, description, imageUrl }, index) => (
                            <PEMealCard key={index} title={title} description={description} imageUrl={imageUrl ?? undefined} />
                        ))}
                </HStack>
            )}

            {selectedTab === 'CREATE' && (
                <ChefProfilePageCreateMeal
                    cookId={cookId}
                    onSuccess={(): void => {
                        setSelectedTab('ALL');
                        void refetch();
                    }}
                    onCancel={(): void => setSelectedTab('ALL')}
                />
            )}

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
