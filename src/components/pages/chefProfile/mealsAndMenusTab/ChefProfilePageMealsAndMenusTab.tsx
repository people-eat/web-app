import { useRouter } from 'next/router';
import { useEffect, useState, type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMeal from './mealsTab/ChefProfilePageCreateMeal';
import ChefProfilePageCreateMenu from './menusTab/ChefProfilePageCreateMenu';

export interface ChefProfilePageMealsAndMenusTabProps {
    cookId: string;
}

export default function ChefProfilePageMealsAndMenusTab({}: ChefProfilePageMealsAndMenusTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<'MEALS' | 'MENUS'>('MEALS');
    const router = useRouter();

    const queryParamMode: string | undefined = typeof router.query.editMode !== 'string' ? undefined : router.query.editMode;

    const [editMode, setEditMode] = useState('');

    useEffect(() => {
        setEditMode(queryParamMode ?? '');
    }, [queryParamMode]);

    useEffect(() => {
        if (editMode) handleAddNewMenuOrDish(selectedTab);
    }, [selectedTab]);

    function handleAddNewMenuOrDish(actualTabValue: string): void {
        setEditMode(actualTabValue);

        router.query.editMode = actualTabValue;
        void router.push(router);
    }

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg:my-10 gap-6">
            <HStack
                className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-6"
                style={{ alignItems: 'center', justifyContent: 'space-between' }}
            >
                <HStack className="gap-4">
                    <PETabItem
                        title="Dishes"
                        onClick={(): void => {
                            setSelectedTab('MEALS');
                        }}
                        active={selectedTab === 'MEALS'}
                    />
                    <PETabItem
                        title="Menus"
                        onClick={(): void => {
                            setSelectedTab('MENUS');
                        }}
                        active={selectedTab === 'MENUS'}
                    />
                </HStack>
                <HStack className="gap-4">
                    <PEIconButton icon={Icon.filtersOrange} border="1px solid rgba(255, 100, 51, 1)" bg="white" withoutShadow />
                    <PEIconButton
                        onClick={(): void => handleAddNewMenuOrDish(selectedTab)}
                        icon={Icon.plusWhite}
                        bg="rgba(255, 100, 51, 1)"
                        withoutShadow
                    />
                </HStack>
            </HStack>

            {selectedTab === 'MEALS' && editMode && <ChefProfilePageCreateMeal />}

            {selectedTab === 'MENUS' && editMode && <ChefProfilePageCreateMenu />}

            {editMode && <PEButton onClick={(): void => undefined} title="Add" className="w-full" />}
        </VStack>
    );
}
