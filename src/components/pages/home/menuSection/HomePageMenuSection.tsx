import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { type ReactElement } from 'react';
import { type GetHomePageDataDocumentQuery } from '../../../../data-source/generated/graphql';
import PEMenuCard from '../../../cards/menuCard/PEMenuCard';
import PEMenuCardMobile from '../../../cards/menuCard/PEMenuCardMobile';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import { calculateMenuPrice } from '../../cookProfile/menusTab/createMenu/createMenuStep3/ChefProfilePageCreateMenuStep3';
import PEPointsCard from './PEPointsCard';
// todo: delete these mock cooks
// import { mockPublicMenus } from './menus.mock';

export interface HomePageMenuSectionProps {
    heroMenus: NonNullable<GetHomePageDataDocumentQuery['publicMenus']['findHeroes']>;
    adults: number;
    childrenCount: number;
}

export default function HomePageMenuSection({ heroMenus, adults, childrenCount: children }: HomePageMenuSectionProps): ReactElement | null {
    const { t } = useTranslation('home');

    if (heroMenus.length < 1) return null;

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
                    {heroMenus.map((publicMenu) => (
                        <Link
                            key={publicMenu.menuId}
                            href={{
                                pathname: `menus/${publicMenu.menuId}`,
                                // query: {
                                //     address,
                                //     latitude: selectedLocation.latitude,
                                //     longitude: selectedLocation.longitude,
                                //     adults,
                                //     children,
                                //     date: date.format(moment.HTML5_FMT.DATE),
                                // },
                            }}
                            target="_blank"
                            className="no-underline"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <PEMenuCard
                                title={publicMenu.title}
                                description={publicMenu.description}
                                imageUrls={publicMenu.imageUrls}
                                pricePerPerson={
                                    calculateMenuPrice(
                                        adults,
                                        children,
                                        publicMenu.basePrice,
                                        publicMenu.basePriceCustomers,
                                        publicMenu.pricePerAdult,
                                        publicMenu.pricePerChild,
                                    ) /
                                    (adults + children)
                                }
                                currencyCode={publicMenu.currencyCode}
                                chefFirstName={publicMenu.cook.user.firstName}
                                chefProfilePictureUrl={publicMenu.cook.user.profilePictureUrl ?? undefined}
                                categories={publicMenu.categories.map(({ title }) => title)}
                                kitchen={publicMenu.kitchen?.title}
                                onClick={(): void => undefined}
                            />
                        </Link>
                    ))}
                    <PEPointsCard />
                </div>
                <div className="flex flex-wrap justify-center gap-5 mt-10 sm:flex hidden">
                    {heroMenus.map((publicMenu) => (
                        <Link
                            key={publicMenu.menuId}
                            href={{
                                pathname: `menus/${publicMenu.menuId}`,
                                // query: {
                                //     address,
                                //     latitude: selectedLocation.latitude,
                                //     longitude: selectedLocation.longitude,
                                //     adults,
                                //     children,
                                //     date: date.format(moment.HTML5_FMT.DATE),
                                // },
                            }}
                            target="_blank"
                            className="no-underline"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            <PEMenuCardMobile
                                title={publicMenu.title}
                                description={publicMenu.description}
                                imageUrls={publicMenu.imageUrls}
                                pricePerPerson={
                                    calculateMenuPrice(
                                        adults,
                                        children,
                                        publicMenu.basePrice,
                                        publicMenu.basePriceCustomers,
                                        publicMenu.pricePerAdult,
                                        publicMenu.pricePerChild,
                                    ) /
                                    (adults + children)
                                }
                                currencyCode={publicMenu.currencyCode}
                                chefFirstName={publicMenu.cook.user.firstName}
                                chefProfilePictureUrl={publicMenu.cook.user.profilePictureUrl ?? undefined}
                                categories={publicMenu.categories.map(({ title }) => title)}
                                kitchen={publicMenu.kitchen?.title}
                                onClick={(): void => undefined}
                            />
                        </Link>
                    ))}
                </div>
            </VStack>
        </VStack>
    );
}
