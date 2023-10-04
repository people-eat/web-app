import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import { userProfileTabs } from '../../../shared-domain/profileTabs/userProfileTabs';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PETabItem from '../../standard/tabItem/PETabItem';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import PEMobileChat from './PEMobileChat';
import ProfilePageBookingsTab from './bookingsTab/ProfilePageBookingsTab';
import ProfilePageFollowingsTab from './followingsTab/ProfilePageFollowingsTab';
import ProfilePageGlobalBookingRequestsTab from './globalBookingRequestsTab/ProfilePageGlobalBookingRequestsTab';
import ProfilePagePersonalTab from './personalTab/ProfilePagePersonalTab';

export interface ProfilePageProps {
    signedInUser?: SignedInUser;
}

export default function ProfilePage({ signedInUser }: ProfilePageProps): ReactElement {
    const { t: translateCommon } = useTranslation('common');
    const { isMobile } = useResponsive();
    const router = useRouter();

    const queryParamTabIndex: string | undefined = typeof router.query.tab !== 'string' ? undefined : router.query.tab;

    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => setSelectedTab(queryParamTabIndex ? Number(queryParamTabIndex) : 0), [queryParamTabIndex]);

    return (
        <VStack className="w-full min-h-full gap-[64px] md:gap-4">
            <PEHeader signedInUser={signedInUser} />

            {isMobile && (
                <HStack className="w-full px-8 box-border" style={{ justifyContent: 'flex-start' }}>
                    <p className="text-orange text-text-s">
                        Menu &gt; <span className="text-black">{translateCommon(userProfileTabs[selectedTab]!.translationKey)}</span>
                    </p>
                </HStack>
            )}

            {!isMobile && (
                <HStack
                    gap={8}
                    className="w-full max-w-screen-xl overflow-x-scroll lg:px-4 box-border"
                    style={{ overflowY: 'initial', justifyContent: 'flex-start' }}
                >
                    {userProfileTabs.map(({ translationKey, path }, index) => (
                        <PETabItem
                            key={index}
                            active={selectedTab === index}
                            title={translateCommon(translationKey)}
                            onClick={(): void => void router.push(path)}
                        />
                    ))}
                </HStack>
            )}

            {selectedTab === 0 && signedInUser && <ProfilePagePersonalTab userId={signedInUser.userId} />}

            {selectedTab === 1 && signedInUser && !isMobile && <ProfilePageBookingsTab userId={signedInUser.userId} />}

            {selectedTab === 1 && signedInUser && isMobile && <PEMobileChat userId={signedInUser.userId} />}

            {selectedTab === 2 && signedInUser && <ProfilePageGlobalBookingRequestsTab userId={signedInUser.userId} />}

            {selectedTab === 4 && signedInUser && <ProfilePageFollowingsTab userId={signedInUser.userId} />}

            <Spacer />

            <PEFooter />
        </VStack>
    );
}
