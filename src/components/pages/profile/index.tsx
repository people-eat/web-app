import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEHeaderMobile from '../../header/PEHeaderMobile';
import PETabItem from '../../standard/tabItem/PETabItem';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import ProfilePagePersonalTab from './personalTab/ProfilePagePersonalTab';

const MENU_TABS = ['personal-information-label', 'bookings-label', 'ratings-label', 'favorite-chefs-label', 'chats-label'];

export default function ProfilePage(): ReactElement {
    const { isMobile } = useResponsive();
    const { t } = useTranslation('profile');
    const router = useRouter();

    const queryParamTabIndex: string | undefined = typeof router.query.tab !== 'string' ? undefined : router.query.tab;

    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => setSelectedTab(queryParamTabIndex ? Number(queryParamTabIndex) : 0), [queryParamTabIndex]);

    return (
        <VStack className="w-full" gap={64}>
            {isMobile ? <PEHeaderMobile /> : <PEHeader />}

            <HStack
                gap={8}
                className="w-full max-w-screen-xl overflow-x-scroll"
                style={{ overflowY: 'initial', justifyContent: 'flex-start' }}
            >
                {MENU_TABS.map((menu, index) => (
                    <PETabItem
                        key={`${menu}_PEChefCard`}
                        title={t(menu)}
                        onClick={(): void => {
                            setSelectedTab(index);
                            router.query.tab = String(index);
                            void router.push(router);
                        }}
                        active={selectedTab === index}
                    />
                ))}
            </HStack>

            {selectedTab === 0 && <ProfilePagePersonalTab />}

            <PEFooter />
        </VStack>
    );
}
