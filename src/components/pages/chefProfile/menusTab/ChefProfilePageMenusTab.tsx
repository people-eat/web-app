import { useQuery } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import { useState, type ReactElement } from 'react';
import { FindCookMenusDocument, type MealType } from '../../../../data-source/generated/graphql';
import PEMenuCard from '../../../cards/menuCard/PEMenuCard';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMenu from './ChefProfilePageCreateMenu';

export interface MealEntity {
    mealId: string;
    cookId: string;
    title: string;
    type: MealType;
    description: string;
    imageUrl?: string | null;
    createdAt: Date;
}

export interface ChefProfilePageMenusTabProps {
    cookId: string;
}

export default function ChefProfilePageMenusTab({ cookId }: ChefProfilePageMenusTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<'MENUS' | 'CREATE'>('MENUS');

    const { data, loading } = useQuery(FindCookMenusDocument, { variables: { cookId } });

    const menus = data?.cooks.menus.findMany ?? [];

    const visibleMenus = menus.filter((menu) => menu.isVisible);

    const invisibleMenus = menus.filter((menu) => !menu.isVisible);

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
                <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    {visibleMenus.map((menu, index) => (
                        <PEMenuCard
                            key={index}
                            title={menu.title}
                            description={menu.description}
                            imageUrls={[]}
                            pricePerPerson={menu.pricePerAdult}
                            chefFirstName={data?.users.me?.firstName ?? ''}
                            chefProfilePictureUrl={data?.users.me?.profilePictureUrl ?? undefined}
                            categories={menu.categories.map(({ title }) => title)}
                            kitchen={menu.kitchen?.title ?? undefined}
                            fullWidth
                        />
                    ))}

                    {Boolean(invisibleMenus.length) && (
                        <>
                            <p className="text-text-m-bold w-full">Archive</p>
                            <HStack
                                className="relative w-full gap-6 flex-wrap opacity-30"
                                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                {invisibleMenus.map((menu, index) => (
                                    <div className="relative" key={index}>
                                        <PEMenuCard
                                            title={menu.title}
                                            description={menu.description}
                                            imageUrls={[]}
                                            pricePerPerson={menu.pricePerAdult}
                                            chefFirstName={data?.users.me?.firstName ?? ''}
                                            chefProfilePictureUrl={data?.users.me?.profilePictureUrl ?? undefined}
                                            categories={menu.categories.map(({ title }) => title)}
                                            kitchen={menu.kitchen?.title ?? undefined}
                                            fullWidth
                                        />
                                    </div>
                                ))}
                            </HStack>
                        </>
                    )}
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
