import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import PEMenuCard from '../../../cards/menuCard/PEMenuCard';
import PEMenuCardMobile from '../../../cards/menuCard/PEMenuCardMobile';
import PEPointsCard from '../../../cards/pointsCard/PEPointsCard';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PENextButton from '../../../standard/nextButton/PENextButton';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';

const MENU_TABS = ['All', 'in Hesse', 'North Rhine-Westphalia', 'Bavaria', 'Berlin'];

export default function HomePageSection6(): ReactElement {
    const { t } = useTranslation('home');

    t;

    const [tabItem, setTabItem] = useState('All');

    function handleGoToAllMenus(): void {
        return;
    }

    return (
        <VStack className="w-full">
            <VStack className="relative w-full sm:pt-0 pt-[140px] pb-15 rounded-4 gap-4 max-w-[1190px]">
                <div className="hidden sm:block w-full mb-12">
                    <PEPointsCard />
                </div>
                <HStack className="w-full">
                    <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">Most requested menus</h2>
                    <div className="flex absolute gap-4 right-0 lg:hidden">
                        <PENextButton reverse onClick={(): void => undefined} />
                        <PENextButton active onClick={(): void => undefined} />
                    </div>
                </HStack>
                <div className="flex lg:justify-start justify-center gap-2 overflow-x-scroll w-full" style={{ overflowY: 'initial' }}>
                    {MENU_TABS.map((menu) => (
                        <PETabItem
                            key={`${menu}_PEMenuCard`}
                            title={menu}
                            onClick={(): void => setTabItem(menu)}
                            active={tabItem === menu}
                        />
                    ))}
                </div>
                <div className="flex flex-wrap gap-5 mt-10 sm:hidden">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <PEMenuCard
                            key={`${item}_PEMenuCard`}
                            title={'Menu title placeholder'}
                            imageUrls={['/dishes_02.png', '/dishes.png', '/dishes_02.png', '/dishes.png']}
                            chefProfilePictureUrl={'/picture-1.png'}
                            pricePerPerson={120}
                            chefFirstName={'Locale'}
                            description={'PEMenuCard description'}
                            categories={['Vegetarian', 'Meat', 'Vegetarian']}
                        />
                    ))}
                    <PEPointsCard />
                </div>
                <div className="flex flex-wrap justify-center gap-5 mt-10 sm:flex hidden">
                    {[1, 2, 3].map((item) => (
                        <PEMenuCardMobile
                            key={`${item}_PEMenuCardMobile`}
                            title={'Menu title placeholder'}
                            imageUrls={['/dishes_02.png']}
                            chefProfilePictureUrl={'/picture-1.png'}
                            pricePerPerson={120}
                            chefFirstName={'Locale'}
                            categories={['Vegetarian', 'Meat', 'Vegetarian']}
                            kitchen={'Europe'}
                        />
                    ))}
                </div>
                <PEButton
                    className="mt-10"
                    onClick={handleGoToAllMenus}
                    title={'All menus'}
                    iconRight={Icon.arrowNarrowWhite}
                    iconSize={16}
                />
            </VStack>
        </VStack>
    );
}
