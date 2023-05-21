import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import { chrisCategory, headline, pinoCategory, ruthCategory, salvatoreCategory } from '~/components/pages/home/section8/chefs.mock';
import PEChefCard from '../../../cards/chefCard/PEChefCard';
import PEChefCardMobile from '../../../cards/chefCard/PEChefCardMobile';
import VStack from '../../../utility/vStack/VStack';
import {CookRank} from "~/data-source/generated/graphql";

// const MENU_TABS = ['All', 'in Hesse', 'North Rhine-Westphalia', 'Bavaria', 'Berlin'];

const CHEFS = [
    {
        name: 'chris',
        chefName: 'Christopher',
        chefPicture: '/team/chris.png',
        chefRank: 'MASTER' as CookRank,
        location: 'München',
        rating: 5.0,
        category: chrisCategory,
    },
    {
        name: 'pino',
        chefName: 'Pino',
        chefPicture: '/menus/Pino.jpg',
        chefRank: 'PROFESSIONAL' as CookRank,
        location: 'Köln',
        rating: 5.0,
        category: pinoCategory,
    },
    {
        name: 'salvatore',
        chefName: 'Salvatore',
        chefPicture: '/menus/Salvatore.jpg',
        chefRank: 'PROFESSIONAL' as CookRank,
        location: 'Köln',
        rating: 5.0,
        category: salvatoreCategory,
    },
    {
        name: 'ruth',
        chefName: 'Ruth',
        chefPicture: '/menus/Ruth.jpg',
        chefRank: 'PROFESSIONAL' as CookRank,
        location: 'Köln',
        rating: 5.0,
        category: ruthCategory,
    },
];

export default function HomePageSection8(): ReactElement {
    const { t } = useTranslation('home');

    t;

    // const [tabItem, setTabItem] = useState('All');
    //
    // function handleGoToAllChefs(): void {
    //     return;
    // }

    return (
        <VStack className="w-full">
            <VStack className="relative w-full pt-[140px] pb-15 lg:py-15 rounded-4 gap-4 max-w-[1190px]">
                <div className="flex justify-center w-full">
                    <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">{headline}</h2>
                    {/* <div className="flex absolute gap-4 right-0 lg:hidden">*/}
                    {/*    <PENextButton reverse onClick={(): void => undefined} />*/}
                    {/*    <PENextButton active onClick={(): void => undefined} />*/}
                    {/* </div>*/}
                </div>
                {/* <div className="flex lg:justify-start justify-center gap-2 overflow-x-scroll w-full" style={{ overflowY: 'initial' }}>*/}
                {/*    {MENU_TABS.map((menu) => (*/}
                {/*        <PETabItem*/}
                {/*            key={`${menu}_PEChefCard`}*/}
                {/*            title={menu}*/}
                {/*            onClick={(): void => setTabItem(menu)}*/}
                {/*            active={tabItem === menu}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/* </div>*/}
                <div className="flex flex-wrap gap-5 mt-10 sm:hidden">
                    {CHEFS.map((item) => (
                        <PEChefCard
                            picturePosition="center top"
                            key={`${item.chefName}_PEChefCard`}
                            firstName={item.chefName}
                            profilePictureUrl={item.chefPicture}
                            rank={item.chefRank}
                            location={item.location}
                            rating={{ average: item.rating, count: 25 }}
                            categories={item.category.split(', ')}
                            kitchens={[]}
                        />
                    ))}
                </div>
                <div className="flex justify-center w-full flex-wrap gap-5 mt-10 hidden sm:flex">
                    {CHEFS.map((item) => (
                        <PEChefCardMobile
                            picturePosition="center top"
                            key={`${item.chefName}_PEChefCard`}
                            firstName={item.chefName}
                            profilePictureUrl={item.chefPicture}
                            rank={item.chefRank}
                            location={item.location}
                            rating={{ average: item.rating, count: 25 }}
                            categories={item.category.split(', ')}
                            kitchens={[]}
                        />
                    ))}
                </div>
                {/* <PEButton*/}
                {/*    className="mt-10"*/}
                {/*    onClick={handleGoToAllChefs}*/}
                {/*    title={'All chefs'}*/}
                {/*    iconRight={Icon.arrowNarrowWhite}*/}
                {/*    iconSize={16}*/}
                {/* />*/}
            </VStack>
        </VStack>
    );
}
