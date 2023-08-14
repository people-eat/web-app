import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PETabItem from '../../standard/tabItem/PETabItem';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import CookProfilePageBookingsTab from './bookingsTab/CookProfilePageBookingsTab';
import ChefProfilePageGlobalBookingsTab from './globalBookingsTab/ChefProfilePageGlobalBookingsTab';
import CookProfilePageMealsTab from './mealsTab/ChefProfilePageMealsTab';
import CookProfilePageMenusTab from './menusTab/ChefProfilePageMenusTab';
import CookProfilePagePersonalTab from './personalTab/CookProfilePagePersonalTab';

export interface CookProfilePageProps {
    signedInUser?: SignedInUser;
}

export default function CookProfilePage({ signedInUser }: CookProfilePageProps): ReactElement {
    const { t } = useTranslation('chef-profile');

    const MENU_TABS = [
        {
            title: t('tab-personal-info'),
            link: '/chef-profile?tab=0',
        },
        {
            title: t('tab-meals'),
            link: '/chef-profile?tab=1',
        },
        {
            title: t('tab-menus'),
            link: '/chef-profile?tab=2',
        },
        {
            title: t('tab-bookings'),
            link: '/chef-profile?tab=3',
        },
        {
            title: t('tab-global-bookings'),
            link: '/chef-profile?tab=6',
        },
        {
            title: t('tab-ratings'),
            link: '/chef-profile?tab=4',
        },
        {
            title: t('tab-statistic'),
            link: '/chef-profile?tab=5',
        },
        {
            title: t('tab-show-profile'),
            link: '/chef-profile?tab=7',
        },
    ];

    const { isMobile } = useResponsive();
    const router = useRouter();

    const [isMobileMenuOpen, setOpenMobileMenu] = useState(false);

    const queryParamTabIndex: string | undefined = typeof router.query.tab !== 'string' ? undefined : router.query.tab;

    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => setSelectedTab(queryParamTabIndex ? Number(queryParamTabIndex) : 0), [queryParamTabIndex]);

    return (
        <VStack className="w-full min-h-screen justify-between gap-[64px] md:gap-4 big:px-4 lg:px-4 large:px-4 box-border overflow-hidden">
            <VStack className="w-full gap-[64px] md:gap-4">
                <PEHeader
                    signedInUser={signedInUser}
                    mobileMenuTabs={MENU_TABS}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setOpenMobileMenu={setOpenMobileMenu}
                    menuButtonLink="/profile"
                    menuButtonText={t('role-switch-button-customer')}
                />

                {isMobile ? (
                    <HStack className="w-full px-8 box-border" style={{ justifyContent: 'flex-start' }}>
                        <p onClick={(): void => setOpenMobileMenu(true)} className="text-orange text-text-s">
                            Menu &gt; <span className="text-black">{MENU_TABS[selectedTab]?.title}</span>
                        </p>
                    </HStack>
                ) : (
                    <HStack
                        gap={8}
                        className="w-full max-w-screen-xl overflow-x-scroll"
                        style={{ overflowY: 'initial', justifyContent: 'flex-start' }}
                    >
                        {MENU_TABS.map(({ title }, index) => (
                            <PETabItem
                                key={index}
                                title={title}
                                onClick={(): void => {
                                    setSelectedTab(index);
                                    router.query.tab = String(index);
                                    void router.push(router);
                                }}
                                active={selectedTab === index}
                            />
                        ))}
                    </HStack>
                )}

                {selectedTab === 0 && signedInUser && <CookProfilePagePersonalTab cookId={signedInUser.userId} />}

                {selectedTab === 1 && signedInUser && <CookProfilePageMealsTab cookId={signedInUser.userId} />}

                {selectedTab === 2 && signedInUser && <CookProfilePageMenusTab cookId={signedInUser.userId} />}

                {selectedTab === 3 && signedInUser && <CookProfilePageBookingsTab cookId={signedInUser.userId} />}

                {selectedTab === 4 && signedInUser && <ChefProfilePageGlobalBookingsTab cookId={signedInUser.userId} />}
            </VStack>

            <PEFooter />
        </VStack>
    );
}
