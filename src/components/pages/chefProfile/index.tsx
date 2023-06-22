import { useRouter } from 'next/router';
import { useEffect, useState, type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import { type SignedInUser } from '../../../shared/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PETabItem from '../../standard/tabItem/PETabItem';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import ChefProfilePageBookingTab from './bookingTab/ChefProfilePageBookingTab';
import ChefProfilePageMealsTab from './mealsTab/ChefProfilePageMealsTab';
import ChefProfilePageMenusTab from './menusTab/ChefProfilePageMenusTab';
import ChefProfilePagePersonalTab from './personalTab/ChefProfilePagePersonalTab';

const MENU_TABS = [
    {
        title: 'Personal details',
        link: '/chef-profile?tab=0',
    },
    {
        title: 'Meals',
        link: '/chef-profile?tab=1',
    },
    {
        title: 'Menus',
        link: '/chef-profile?tab=2',
    },
    {
        title: 'Bookings',
        link: '/chef-profile?tab=3',
    },
    {
        title: 'Ratings',
        link: '/chef-profile?tab=4',
    },
    {
        title: 'Statistic',
        link: '/chef-profile?tab=5',
    },
    {
        title: 'Chats',
        link: '/chef-profile?tab=6',
    },
    {
        title: 'Show public profile',
        link: '/chef-profile?tab=7',
    },
];

export interface ChefProfilePageProps {
    signedInUser?: SignedInUser;
}

export default function ChefProfilePage({ signedInUser }: ChefProfilePageProps): ReactElement {
    // const { t } = useTranslation('chef-profile');

    const { isMobile } = useResponsive();
    const router = useRouter();

    const [isMobileMenuOpen, setOpenMobileMenu] = useState(false);

    const queryParamTabIndex: string | undefined = typeof router.query.tab !== 'string' ? undefined : router.query.tab;

    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => setSelectedTab(queryParamTabIndex ? Number(queryParamTabIndex) : 0), [queryParamTabIndex]);

    return (
        <VStack className="w-full min-h-screen justify-between gap-[64px] md:gap-4 overflow-hidden">
            <VStack className="w-full gap-[64px] md:gap-4">
                <PEHeader
                    signedInUser={signedInUser}
                    mobileMenuTabs={MENU_TABS}
                    isMobileMenuOpen={isMobileMenuOpen}
                    setOpenMobileMenu={setOpenMobileMenu}
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
                                title={title.toLowerCase()}
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

                {selectedTab === 0 && signedInUser && <ChefProfilePagePersonalTab cookId={signedInUser.userId} />}

                {selectedTab === 1 && signedInUser && <ChefProfilePageMealsTab cookId={signedInUser.userId} />}

                {selectedTab === 2 && signedInUser && <ChefProfilePageMenusTab cookId={signedInUser.userId} />}

                {selectedTab === 3 && signedInUser && <ChefProfilePageBookingTab cookId={signedInUser.userId} />}
            </VStack>

            <PEFooter />
        </VStack>
    );
}
