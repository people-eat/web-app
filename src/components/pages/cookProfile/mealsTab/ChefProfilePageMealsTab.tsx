import { useQuery } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { FindCookMealsDocument, type MealType } from '../../../../data-source/generated/graphql';
import { mealTypeTranslations } from '../../../../shared-domain/mealTypeTranslations';
import { mealTypes } from '../../../../shared-domain/mealTypes';
import PEMealCard from '../../../cards/mealCard/PEMealCard';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMeal from './ChefProfilePageCreateMeal';
import ChefProfilePageEditMeal from './ChefProfilePageEditMeal';

export interface CookProfilePageMealsTabProps {
    cookId: string;
}

export default function CookProfilePageMealsTab({ cookId }: CookProfilePageMealsTabProps): ReactElement {
    const { t } = useTranslation('meal-types');
    const [selectedMealType, setSelectedMealType] = useState<MealType | undefined>();
    const [selectedTab, setSelectedTab] = useState<'MEALS' | 'CREATE' | string>('MEALS');

    const { data, loading, refetch } = useQuery(FindCookMealsDocument, { variables: { cookId } });

    const meals = data?.cooks.meals.findMany ?? [];

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg_min:my-10 box-border gap-6">
            {selectedTab === 'MEALS' && (
                <HStack
                    gap={8}
                    className="w-full bg-white shadow-primary md:shadow-none box-border p-8 md:p-0 rounded-4"
                    style={{ alignItems: 'center' }}
                >
                    <HStack className="overflow-x-auto w-[100%-80px] gap-2" style={{ justifyContent: 'flex-start' }}>
                        <PETabItem
                            title={t('meal-type-all')}
                            onClick={(): void => setSelectedMealType(undefined)}
                            active={selectedMealType === undefined}
                        />

                        {mealTypes.map((mealType, index) => (
                            <PETabItem
                                key={index}
                                title={t(mealTypeTranslations[mealType])}
                                onClick={(): void => setSelectedMealType(mealType)}
                                active={selectedMealType === mealType}
                            />
                        ))}
                    </HStack>

                    <Spacer />

                    {/* <PEIconButton icon={Icon.filtersOrange} border="1px solid rgba(255, 100, 51, 1)" bg="white" withoutShadow /> */}

                    <PEIconButton
                        onClick={(): void => setSelectedTab('CREATE')}
                        icon={Icon.plusWhite}
                        bg="rgba(255, 100, 51, 1)"
                        withoutShadow
                    />
                </HStack>
            )}

            {selectedTab !== 'MEALS' && selectedTab !== 'CREATE' && (
                <ChefProfilePageEditMeal
                    cookId={cookId}
                    mealId={selectedTab}
                    onCancel={(): void => setSelectedTab('MEALS')}
                    onSaveUpdates={(): void => {
                        setSelectedTab('MEALS');
                        void refetch();
                    }}
                />
            )}

            {selectedTab === 'CREATE' && (
                <ChefProfilePageCreateMeal
                    cookId={cookId}
                    defaultMealType={selectedMealType}
                    onCancel={(): void => setSelectedTab('MEALS')}
                    onSuccess={(mealType: MealType): void => {
                        setSelectedTab('MEALS');
                        setSelectedMealType(mealType);
                        void refetch();
                    }}
                />
            )}

            {selectedTab === 'MEALS' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {selectedMealType !== undefined &&
                        meals
                            .filter(({ type }) => type === selectedMealType)
                            .map(({ title, description, imageUrl, mealId }, index) => (
                                <PEMealCard
                                    key={index}
                                    title={title}
                                    description={description}
                                    imageUrl={imageUrl ?? undefined}
                                    onClick={(): void => setSelectedTab(mealId)}
                                />
                            ))}
                    {selectedMealType === undefined &&
                        meals.map(({ title, description, imageUrl, mealId }, index) => (
                            <PEMealCard
                                key={index}
                                title={title}
                                description={description}
                                imageUrl={imageUrl ?? undefined}
                                onClick={(): void => setSelectedTab(mealId)}
                            />
                        ))}
                </HStack>
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
