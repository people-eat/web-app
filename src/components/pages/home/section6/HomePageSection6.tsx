import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEMenuCard from '../../../cards/menuCard/PEMenuCard';
import PEMenuCardMobile from '../../../cards/menuCard/PEMenuCardMobile';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import PEPointsCard from './PEPointsCard';
import { mockPublicMenus } from './menus.mock';

export default function HomePageSection6(): ReactElement {
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
                    {mockPublicMenus.map((item, index) => (
                        <PEMenuCard
                            key={index}
                            title={item.title}
                            description={item.description}
                            imageUrls={item.pictures}
                            chefFirstName={item.cook.user.firstName}
                            chefProfilePictureUrl={item.cook.user.profilePictureUrl}
                            pricePerPerson={item.price}
                            kitchen={item.kitchen}
                            categories={item.categories.map(({ title }) => title)}
                        />
                    ))}
                    <PEPointsCard />
                </div>
                <div className="flex flex-wrap justify-center gap-5 mt-10 sm:flex hidden">
                    {mockPublicMenus.map((item, index) => (
                        <PEMenuCardMobile
                            key={index}
                            title={item.title}
                            description={item.description}
                            imageUrls={item.pictures}
                            chefProfilePictureUrl={item.cook.user.profilePictureUrl}
                            pricePerPerson={item.price}
                            chefFirstName={item.cook.user.firstName}
                            kitchen={item.kitchen}
                            categories={item.categories.map(({ title }) => title)}
                        />
                    ))}
                </div>
            </VStack>
        </VStack>
    );
}
