import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEChefCard from '../../../cards/chefCard/PEChefCard';
import PEChefCardMobile from '../../../cards/chefCard/PEChefCardMobile';
import VStack from '../../../utility/vStack/VStack';
// todo: delete these mock cooks
// import { mockPublicChefs } from './chefs.mock';
import { type GetHomePageDataDocumentQuery } from '../../../../data-source/generated/graphql';

export interface HomePageCookSectionProps {
    heroCooks: NonNullable<GetHomePageDataDocumentQuery['publicCooks']['findHeroes']>;
}

export default function HomePageCookSection({ heroCooks }: HomePageCookSectionProps): ReactElement | null {
    const { t } = useTranslation('home');

    if (heroCooks.length < 1) return null;

    return (
        <VStack className="w-full">
            <VStack className="relative w-full pt-[140px] pb-15 lg:py-15 rounded-4 gap-4 max-w-[1190px]">
                <div className="flex justify-center w-full">
                    <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">{t('chefs-section-header')}</h2>
                </div>
                <div className="flex flex-wrap gap-5 mt-10 sm:hidden">
                    {heroCooks.map(({ cookId, rank, user, city }) => (
                        <PEChefCard
                            key={cookId}
                            firstName={user.firstName}
                            profilePictureUrl={user.profilePictureUrl ?? undefined}
                            rank={rank}
                            location={city}
                            rating={{ average: 10, count: 0 }}
                            categories={[]}
                            kitchens={[]}
                        />
                    ))}
                </div>
                <div className="flex justify-center w-full flex-wrap gap-5 mt-10 hidden sm:flex">
                    {heroCooks.map(({ cookId, rank, user, city }) => (
                        <PEChefCardMobile
                            key={cookId}
                            firstName={user.firstName}
                            profilePictureUrl={user.profilePictureUrl ?? undefined}
                            rank={rank}
                            location={city}
                            rating={{ average: 10, count: 0 }}
                            categories={[]}
                            kitchens={[]}
                        />
                    ))}
                </div>
            </VStack>
        </VStack>
    );
}
