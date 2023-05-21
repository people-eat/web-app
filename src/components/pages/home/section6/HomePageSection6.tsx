import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import PEMenuCard from '../../../cards/menuCard/PEMenuCard';
import PEMenuCardMobile from '../../../cards/menuCard/PEMenuCardMobile';
import PEPointsCard from '../../../cards/pointsCard/PEPointsCard';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import {mockPublicChefs, headline} from "~/components/pages/home/section6/chef.mock";

// const MENU_TABS = ['All', 'in Hesse', 'North Rhine-Westphalia', 'Bavaria', 'Berlin'];

export default function HomePageSection6(): ReactElement {
    const { t } = useTranslation('common');

    t;

    // const [tabItem, setTabItem] = useState('All');

    // function handleGoToAllMenus(): void {
    //     return;
    // }

    return (
        <VStack className="w-full">
            <VStack className="relative w-full sm:pt-0 pt-[140px] pb-15 rounded-4 gap-4 max-w-[1190px]">
                <div className="hidden sm:block w-full mb-12">
                    <PEPointsCard />
                </div>
                <HStack className="w-full">
                    <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">{headline}</h2>
                    {/* <div className="flex absolute gap-4 right-0 lg:hidden">*/}
                    {/*    <PENextButton reverse onClick={(): void => undefined} />*/}
                    {/*    <PENextButton active onClick={(): void => undefined} />*/}
                    {/* </div>*/}
                </HStack>
                {/* <div className="flex lg:justify-start justify-center gap-2 overflow-x-scroll w-full" style={{ overflowY: 'initial' }}>*/}
                {/*    {MENU_TABS.map((menu) => (*/}
                {/*        <PETabItem*/}
                {/*            key={`${menu}_PEMenuCard`}*/}
                {/*            title={menu}*/}
                {/*            onClick={(): void => setTabItem(menu)}*/}
                {/*            active={tabItem === menu}*/}
                {/*        />*/}
                {/*    ))}*/}
                {/* </div>*/}
                <div className="flex flex-wrap gap-5 justify-center mt-10 sm:hidden">
                    {mockPublicChefs.map((item) => (
                        <PEMenuCard
                            key={`${item.menuTitle}_PEMenuCard`}
                            title={item.menuTitle}
                            imageUrls={item.pictures}
                            chefProfilePictureUrl={item.chefPicture}
                            pricePerPerson={item.price}
                            chefFirstName={item.chefName}
                            description={item.description}
                            categories={item.categories.split(', ')}
                        />
                    ))}
                    <PEPointsCard />
                </div>
                <div className="flex flex-wrap justify-center gap-5 mt-10 sm:flex hidden">
                    {mockPublicChefs.map((item) => (
                        <PEMenuCardMobile
                            key={`${item.menuTitle}_PEMenuCard`}
                            title={item.menuTitle}
                            imageUrls={item.pictures}
                            chefProfilePictureUrl={item.chefPicture}
                            pricePerPerson={item.price}
                            chefFirstName={item.chefName}
                            description={item.description}
                            categories={item.categories.split(', ')}
                        />
                    ))}
                </div>
                {/* <PEButton*/}
                {/*    className="mt-10"*/}
                {/*    onClick={handleGoToAllMenus}*/}
                {/*    title={'All menus'}*/}
                {/*    iconRight={Icon.arrowNarrowWhite}*/}
                {/*    iconSize={16}*/}
                {/* />*/}
            </VStack>
        </VStack>
    );
}
