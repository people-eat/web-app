import { useRouter } from 'next/router';
import { useEffect, useState, type ReactElement } from 'react';
import { type SignedInUser } from '../../../shared/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PETabItem from '../../standard/tabItem/PETabItem';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import ChefProfilePagePersonalTab from './personalTab/ChefProfilePagePersonalTab';
import ChefProfilePageUploadDishesTab from './uploadDishesOrMenus/ChefProfilePageUploadDishesTab';

const MENU_TABS = ['Personal details', 'Bookings', 'Ratings', 'Dishes/Menus', 'Statistic', 'Chats', 'Show public profile'];

export interface ChefProfilePageProps {
    signedInUser?: SignedInUser;
}

export default function ChefProfilePage({ signedInUser }: ChefProfilePageProps): ReactElement {
    // const { t } = useTranslation('chef-profile');
    const router = useRouter();

    const queryParamTabIndex: string | undefined = typeof router.query.tab !== 'string' ? undefined : router.query.tab;

    const [selectedTab, setSelectedTab] = useState(0);

    useEffect(() => setSelectedTab(queryParamTabIndex ? Number(queryParamTabIndex) : 0), [queryParamTabIndex]);

    return (
        <VStack className="w-full" gap={64}>
            <PEHeader signedInUser={signedInUser} />

            <HStack
                gap={8}
                className="w-full max-w-screen-xl overflow-x-scroll"
                style={{ overflowY: 'initial', justifyContent: 'flex-start' }}
            >
                {MENU_TABS.map((menu, index) => (
                    <PETabItem
                        key={`${menu}_PEChefCard`}
                        title={menu}
                        onClick={(): void => {
                            setSelectedTab(index);
                            router.query.tab = String(index);
                            void router.push(router);
                        }}
                        active={selectedTab === index}
                    />
                ))}
            </HStack>

            {selectedTab === 0 && signedInUser && <ChefProfilePagePersonalTab cookId={signedInUser.userId} />}

            {selectedTab === 3 && <ChefProfilePageUploadDishesTab />}

            <PEFooter />
        </VStack>
    );
}
