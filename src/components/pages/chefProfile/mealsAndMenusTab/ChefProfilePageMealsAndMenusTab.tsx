import { useState, type ReactElement } from 'react';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import { ARCHIVE_MENUS, MENUS } from './meals.mock';
import ChefProfilePageCreateMeal from './mealsTab/ChefProfilePageCreateMeal';
import ChefProfilePageMeal from './mealsTab/ChefProfilePageMeal';
import ChefProfilePageCreateMenu from './menusTab/ChefProfilePageCreateMenu';
import ChefProfilePageMenu from './menusTab/ChefProfilePageMenu';

export interface ChefProfilePageMealsAndMenusTabProps {
    cookId: string;
}

export default function ChefProfilePageMealsAndMenusTab({ cookId }: ChefProfilePageMealsAndMenusTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<'MEALS' | 'MENUS' | 'CREATE_MEAL' | 'CREATE_MENU'>('MEALS');

    function handleAdd(): void {
        if (selectedTab === 'MEALS') setSelectedTab('CREATE_MEAL');
        if (selectedTab === 'MENUS') setSelectedTab('CREATE_MENU');
    }

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg:my-10 gap-6">
            <HStack className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-6" style={{ alignItems: 'center' }}>
                <HStack className="gap-4">
                    <PETabItem
                        title="Dishes"
                        onClick={(): void => {
                            setSelectedTab('MEALS');
                        }}
                        active={selectedTab === 'MEALS' || selectedTab === 'CREATE_MEAL'}
                    />
                    <PETabItem
                        title="Menus"
                        onClick={(): void => {
                            setSelectedTab('MENUS');
                        }}
                        active={selectedTab === 'MENUS' || selectedTab === 'CREATE_MENU'}
                    />
                </HStack>

                <Spacer />

                <HStack className="gap-4">
                    <PEIconButton icon={Icon.filtersOrange} border="1px solid rgba(255, 100, 51, 1)" bg="white" withoutShadow />
                    <PEIconButton onClick={(): void => handleAdd()} icon={Icon.plusWhite} bg="rgba(255, 100, 51, 1)" withoutShadow />
                </HStack>
            </HStack>

            {selectedTab === 'MEALS' && <ChefProfilePageMeal cookId={cookId} />}

            {selectedTab === 'CREATE_MEAL' && (
                <ChefProfilePageCreateMeal
                    cookId={cookId}
                    onSuccess={(): void => setSelectedTab('MEALS')}
                    onCancel={(): void => setSelectedTab('MEALS')}
                />
            )}

            {selectedTab === 'MENUS' && <ChefProfilePageMenu menus={MENUS} archive={ARCHIVE_MENUS} />}

            {selectedTab === 'CREATE_MENU' && (
                <ChefProfilePageCreateMenu
                    cookId={cookId}
                    onSuccess={(): void => setSelectedTab('MENUS')}
                    onCancel={(): void => setSelectedTab('MENUS')}
                />
            )}
        </VStack>
    );
}
