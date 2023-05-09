import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEChefCard from '../../../cards/chefCard/PEChefCard';
import PEChefCardMobile from '../../../cards/chefCard/PEChefCardMobile';
import VStack from '../../../utility/vStack/VStack';
import { mockPublicChefs } from './chefs.mock';

export default function HomePageCookSection(): ReactElement {
    const { t } = useTranslation('home');

    return (
        <VStack className="w-full">
            <VStack className="relative w-full pt-[140px] pb-15 lg:py-15 rounded-4 gap-4 max-w-[1190px]">
                <div className="flex justify-center w-full">
                    <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">{t('chefs-section-header')}</h2>
                </div>
                <div className="flex flex-wrap gap-5 mt-10 sm:hidden">
                    {mockPublicChefs.map(({ rank, rating, user, location, categories, kitchens }, index) => (
                        <PEChefCard
                            key={index}
                            firstName={user.firstName}
                            profilePictureUrl={user.profilePictureUrl}
                            rank={rank}
                            location={location.city}
                            rating={rating}
                            categories={categories.map(({ title }) => title)}
                            kitchens={kitchens.map(({ title }) => title)}
                        />
                    ))}
                </div>
                <div className="flex justify-center w-full flex-wrap gap-5 mt-10 hidden sm:flex">
                    {mockPublicChefs.map(({ rank, rating, user, location, categories, kitchens }, index) => (
                        <PEChefCardMobile
                            key={index}
                            firstName={user.firstName}
                            profilePictureUrl={user.profilePictureUrl}
                            rank={rank}
                            location={location.city}
                            rating={rating}
                            categories={categories.map(({ title }) => title)}
                            kitchens={kitchens.map(({ title }) => title)}
                        />
                    ))}
                </div>
            </VStack>
        </VStack>
    );
}
