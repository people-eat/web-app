import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEMenuCard from '../../../cards/menuCard/PEMenuCard';
import PEMenuCardMobile from '../../../cards/menuCard/PEMenuCardMobile';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import PEPointsCard from './PEPointsCard';
import { mockPublicMenus } from './menus.mock';

export default function HomePageMenuSection(): ReactElement {
    const { t } = useTranslation('home');

    return (
        <VStack className="w-full">
            <VStack className="relative w-full sm:pt-0 pt-[140px] pb-15 rounded-4 gap-4 max-w-[1190px]">
                <div className="hidden sm:block w-full mb-12">
                    <PEPointsCard />
                </div>
                <HStack className="w-full">
                    <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">{t('menus-section-header')}</h2>
                </HStack>
                <div className="flex flex-wrap gap-5 justify-center mt-10 sm:hidden">
                    {mockPublicMenus.map((menu, index) => (
                        <PEMenuCard
                            key={index}
                            title={menu.title}
                            description={menu.description}
                            imageUrls={menu.pictures}
                            chefFirstName={menu.cook.user.firstName}
                            chefProfilePictureUrl={menu.cook.user.profilePictureUrl}
                            pricePerPerson={menu.price}
                            currencyCode="EUR"
                            kitchen={menu.kitchen}
                            categories={menu.categories.map(({ title }) => title)}
                        />
                    ))}
                    <PEPointsCard />
                </div>
                <div className="flex flex-wrap justify-center gap-5 mt-10 sm:flex hidden">
                    {mockPublicMenus.map((menu, index) => (
                        <PEMenuCardMobile
                            key={index}
                            title={menu.title}
                            description={menu.description}
                            imageUrls={menu.pictures}
                            chefProfilePictureUrl={menu.cook.user.profilePictureUrl}
                            pricePerPerson={menu.price}
                            currencyCode="EUR"
                            chefFirstName={menu.cook.user.firstName}
                            kitchen={menu.kitchen}
                            categories={menu.categories.map(({ title }) => title)}
                        />
                    ))}
                </div>
            </VStack>
        </VStack>
    );
}
