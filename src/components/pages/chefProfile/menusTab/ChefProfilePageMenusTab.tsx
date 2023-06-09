import { useState, type ReactElement } from 'react';
import PEMenuCard from '../../../cards/menuCard/PEMenuCard';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMenu from './ChefProfilePageCreateMenu';
import { ARCHIVE_MENUS, MENUS } from './meals.mock';

export interface ChefProfilePageMenusTabProps {
    cookId: string;
}

export default function ChefProfilePageMenusTab({ cookId }: ChefProfilePageMenusTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<'MENUS' | 'CREATE'>('MENUS');

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg:my-10 gap-6">
            <HStack gap={8} className="w-full bg-white shadow-primary box-border p-8 rounded-4" style={{ alignItems: 'center' }}>
                <Spacer />

                <PEIconButton icon={Icon.filtersOrange} border="1px solid rgba(255, 100, 51, 1)" bg="white" withoutShadow />

                <PEIconButton
                    onClick={(): void => setSelectedTab('CREATE')}
                    icon={Icon.plusWhite}
                    bg="rgba(255, 100, 51, 1)"
                    withoutShadow
                />
            </HStack>

            {selectedTab === 'CREATE' && (
                <ChefProfilePageCreateMenu
                    cookId={cookId}
                    onSuccess={(): void => setSelectedTab('MENUS')}
                    onCancel={(): void => setSelectedTab('MENUS')}
                />
            )}

            {selectedTab === 'MENUS' && (
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'center' }}>
                    {MENUS.map((menu, index) => (
                        <PEMenuCard
                            key={`${index}_ChefProfilePageMenu`}
                            title={menu.title}
                            description={String(menu.description)}
                            imageUrls={menu.imageUrls}
                            pricePerPerson={menu.pricePerPerson}
                            chefFirstName={menu.chefFirstName}
                            categories={menu.categories}
                            fullWidth
                        />
                    ))}

                    {ARCHIVE_MENUS.length && (
                        <>
                            <p className="text-text-m-bold w-full">Archive</p>
                            <HStack
                                className="relative w-full gap-6 flex-wrap opacity-30"
                                style={{ alignItems: 'center', justifyContent: 'center' }}
                            >
                                {ARCHIVE_MENUS.map((menu, index) => (
                                    <div className="relative" key={`${index}_archive_ChefProfilePageMenu`}>
                                        <PEMenuCard
                                            title={menu.title}
                                            description={String(menu.description)}
                                            imageUrls={menu.imageUrls}
                                            pricePerPerson={menu.pricePerPerson}
                                            chefFirstName={menu.chefFirstName}
                                            categories={menu.categories}
                                            fullWidth
                                        />
                                    </div>
                                ))}
                            </HStack>
                        </>
                    )}
                </HStack>
            )}
        </VStack>
    );
}
