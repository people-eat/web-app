import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import { type SignedInUser } from '../../../shared/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PETabItem from '../../standard/tabItem/PETabItem';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import ProfilePagePersonalTab from './personalTab/ProfilePagePersonalTab';

const MENU_TABS = [
    {
        title: 'personal-information-label',
        link: '/profile?tab=0',
    },
    {
        title: 'bookings-label',
        link: '/profile?tab=1',
    },
    {
        title: 'ratings-label',
        link: '/profile?tab=2',
    },
    {
        title: 'favorite-chefs-label',
        link: '/profile?tab=3',
    },
    {
        title: 'chats-label',
        link: '/profile?tab=4',
    },
];

export interface ProfilePageProps {
    signedInUser?: SignedInUser;
}

export default function ProfilePage({ signedInUser }: ProfilePageProps): ReactElement {
    const { t } = useTranslation('profile');
    const { isMobile } = useResponsive();
    const router = useRouter();

    const [isMobileMenuOpen, setOpenMobileMenu] = useState(false);

    const queryParamTabIndex: string | undefined = typeof router.query.tab !== 'string' ? undefined : router.query.tab;

    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => setSelectedTab(queryParamTabIndex ? Number(queryParamTabIndex) : 0), [queryParamTabIndex]);

    return (
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
                    className="w-full max-w-screen-xl overflow-x-scroll lg:px-4 box-border"
                    style={{ overflowY: 'initial', justifyContent: 'flex-start' }}
                >
                    {MENU_TABS.map((menu, index) => (
                        <PETabItem
                            key={index}
                            title={t(menu.title)}
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

            {selectedTab === 0 && <ProfilePagePersonalTab />}

            <PEFooter />
        </VStack>
    );
}
