import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useEffect, useState, type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import { cookProfileTabs } from '../../../shared-domain/profileTabs/cookProfileTabs';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PETabItem from '../../standard/tabItem/PETabItem';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import CookProfilePagePersonalTab from './personalTab/CookProfilePagePersonalTab';

export interface CookProfilePageProps {
    signedInUser?: SignedInUser;
}

export default function CookProfilePage({ signedInUser }: CookProfilePageProps): ReactElement {
    const router = useRouter();
    const { t: translateCommon } = useTranslation('common');
    const { isMobile } = useResponsive();

    const queryParamTabIndex: string | undefined = typeof router.query.tab !== 'string' ? undefined : router.query.tab;

    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => setSelectedTab(queryParamTabIndex ? Number(queryParamTabIndex) : 0), [queryParamTabIndex]);

    return (
        <VStack className="w-full min-h-screen justify-between gap-[64px] md:gap-4 big:px-4 lg:px-4 large:px-4 box-border overflow-hidden">
            <VStack className="w-full gap-[64px] md:gap-4">
                <PEHeader signedInUser={signedInUser} />
                {isMobile && (
                    <HStack className="w-full px-8 box-border" style={{ justifyContent: 'flex-start' }}>
                        <p className="text-orange text-text-s">
                            Menu &gt; <span className="text-black">{translateCommon(cookProfileTabs[selectedTab]!.translationKey)}</span>
                        </p>
                    </HStack>
                )}

                {!isMobile && (
                    <HStack
                        gap={8}
                        className="w-full max-w-screen-xl overflow-x-scroll"
                        style={{ overflowY: 'initial', justifyContent: 'flex-start' }}
                    >
                        {cookProfileTabs.map(({ translationKey, path, tabIndex }) => (
                            <PETabItem
                                key={tabIndex}
                                active={selectedTab === tabIndex}
                                title={translateCommon(translationKey)}
                                onClick={(): void => void router.push(path)}
                            />
                        ))}
                    </HStack>
                )}

                {selectedTab === 0 && signedInUser && <CookProfilePagePersonalTab cookId={signedInUser.userId} />}
            </VStack>

            <PEFooter />
        </VStack>
    );
}
