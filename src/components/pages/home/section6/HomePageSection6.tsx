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

const MENUS = [
    {
        name: 'chris',
        chefName: 'Christopher',
        chefPicture: '/menus/christopher.jpeg',
        num: '-01',
        pictures: [
            '/menus/menu-01.jpeg',
            '/menus/menu-02.jpeg',
            '/menus/menu-03.jpeg',
            '/menus/menu-04.jpeg',
            '/menus/menu-05.jpeg',
            '/menus/menu-06.jpeg',
        ],
        price: 105,
    },
    {
        name: 'carl',
        chefName: 'Carl',
        chefPicture: '/menus/Carl.jpeg',
        num: '-01',
        pictures: [
            '/menus/menu-007.jpeg',
            '/menus/menu-008.jpeg',
            '/menus/menu-009.jpeg',
            '/menus/menu-010.jpeg',
            '/menus/menu-011.jpeg',
            '/menus/menu-012.jpeg',
        ],
        price: 95,
    },
    {
        name: 'uta',
        chefName: 'Uta',
        chefPicture: '/menus/uta.jpeg',
        num: '-01',
        pictures: [
            '/menus/menu-13.jpeg',
            '/menus/menu-14.jpeg',
            '/menus/menu-15.jpeg',
            '/menus/menu-16.jpeg',
            '/menus/menu-17.jpeg',
            '/menus/menu-18.jpeg',
        ],
        price: 70,
    },
    {
        name: 'robert',
        chefName: 'Robert',
        chefPicture: '/menus/Robert.jpeg',
        num: '-01',
        pictures: ['/menus/menu-19.jpeg', '/menus/menu-20.jpeg'],
        price: 92,
    },
    {
        name: 'nadine',
        chefName: 'Nadine',
        chefPicture: '/menus/Nadine.png',
        num: '-01',
        pictures: [
            '/menus/menu-21.jpeg',
            '/menus/menu-22.jpeg',
            '/menus/menu-23.jpeg',
            '/menus/menu-24.jpeg',
            '/menus/menu-25.jpeg',
            '/menus/menu-26.jpeg',
        ],
        price: 87,
    },
];

export default function HomePageSection6(): ReactElement {
    const { t } = useTranslation('common');

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
                <div className="flex flex-wrap gap-5 justify-center mt-10 sm:hidden">
                    {MENUS.map((item) => (
                        <PEMenuCard
                            key={`${item.name}_PEMenuCard`}
                            title={t(`${item.name}-menu-title${item.num}`)}
                            imageUrls={item.pictures}
                            chefProfilePictureUrl={item.chefPicture}
                            pricePerPerson={item.price}
                            chefFirstName={item.chefName}
                            description={t(`${item.name}-menu-description${item.num}`)}
                            categories={t(`${item.name}-menu-categories${item.num}`).split(', ')}
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
