import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { type CookRank, type CurrencyCode } from '../../../data-source/generated/graphql';
import { type Category } from '../../../shared-domain/Category';
import { type Kitchen } from '../../../shared-domain/Kitchen';
import { type Language } from '../../../shared-domain/Language';
import { type Location } from '../../../shared-domain/Location';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEMenuCard from '../../cards/menuCard/PEMenuCard';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEButton from '../../standard/buttons/PEButton';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import PETabItem from '../../standard/tabItem/PETabItem';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface PublicCookPageProps {
    signedInUser?: SignedInUser;
    publicCook?: {
        cookId: string;
        rank: CookRank;
        city: string;
        biography: string;
        maximumParticipants?: number | null;
        maximumPrice?: number | null;
        maximumTravelDistance?: number | null;
        minimumParticipants?: number | null;
        minimumPrice?: number | null;
        travelExpenses: number;
        user: { firstName: string; profilePictureUrl?: string };
        location: Location;
        languages: Language[];
        menus: {
            menuId: string;
            title: string;
            description: string;
            pricePerAdult: number;
            pricePerChild?: number;
            preparationTime: number;
            basePrice: number;
            basePriceCustomers: number;
            currencyCode: CurrencyCode;
            greetingFromKitchen: boolean;
            kitchen?: Kitchen;
            categories: Category[];
            imageUrls: string[];
            createdAt: Date;
        }[];
    };
    categories: Category[];
    kitchens: Kitchen[];
}

export default function PublicCookPage({ signedInUser, publicCook, categories, kitchens }: PublicCookPageProps): ReactElement {
    const { t } = useTranslation('common');
    const { t: bookingTranslations } = useTranslation('global-booking-request');

    const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();

    return (
        <VStack gap={40} className="w-full h-full">
            <PEHeader signedInUser={signedInUser} />

            <VStack className="relative lg:w-[calc(100%-32px)] w-[calc(100%-64px)] max-w-screen-xl mx-8 lg:mx-4" gap={16}>
                {publicCook && (
                    <>
                        <HStack className="w-full bg-white shadow-primary box-border p-8 rounded-4" gap={16}>
                            {publicCook.user.profilePictureUrl && (
                                <Image
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: 4,
                                        objectPosition: 'center',
                                        objectFit: 'cover',
                                    }}
                                    src={publicCook.user.profilePictureUrl}
                                    alt={'Profile Picture'}
                                    width={120}
                                    height={120}
                                />
                            )}

                            {!publicCook.user.profilePictureUrl && (
                                <div className="bg-base rounded-2 flex justify-center items-center min-h-[120px] w-[120px]">
                                    <PEIcon edgeLength={32} icon={Icon.profileLight} />
                                </div>
                            )}

                            <VStack gap={16} style={{ alignItems: 'flex-start' }}>
                                <VStack gap={8} style={{ alignItems: 'flex-start' }}>
                                    <p className="text-heading-m my-0">{publicCook.user.firstName}</p>
                                    <span className="text-orange">{t(publicCook.rank)}</span>
                                </VStack>
                                <HStack gap={16}>
                                    <PEIcon icon={Icon.markerPin} />
                                    <span>{publicCook.city}</span>
                                </HStack>
                                {publicCook.languages?.length > 0 && (
                                    <HStack gap={16}>
                                        <PEIcon icon={Icon.messageChat} />
                                        <span>{publicCook.languages.map(({ title }) => title).join(', ')}</span>
                                    </HStack>
                                )}
                            </VStack>

                            <Spacer />

                            <Link
                                href={{
                                    pathname: '/cook-booking-request',
                                    query: {
                                        cookId: publicCook.cookId,
                                        address: '',
                                        latitude: 0,
                                        longitude: 0,
                                        adults: 3,
                                        children: 1,
                                        date: moment().format(moment.HTML5_FMT.DATE),
                                    },
                                }}
                                className="no-underline"
                            >
                                <PEButton title={bookingTranslations('send-request-label')} onClick={(): void => undefined} />
                            </Link>
                        </HStack>

                        <HStack
                            gap={16}
                            className="w-full bg-white shadow-primary box-border p-8 rounded-4"
                            style={{ justifyContent: 'flex-start' }}
                        >
                            <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start' }}>
                                <p className="text-heading-m my-0">Bio</p>
                                {publicCook.biography}
                            </VStack>
                        </HStack>

                        <HStack className="w-full">
                            <h2>Menu Portfolio</h2>
                            <Spacer />
                        </HStack>

                        {categories.length > 0 && (
                            <HStack className="w-full overflow-x-auto w-[100%-80px] gap-2" style={{ justifyContent: 'flex-start' }}>
                                <PETabItem
                                    title={'All'}
                                    onClick={(): void => setSelectedCategory(undefined)}
                                    active={selectedCategory === undefined}
                                />
                                {categories.map((category) => (
                                    <PETabItem
                                        key={category.categoryId}
                                        title={category.title}
                                        onClick={(): void => setSelectedCategory(category)}
                                        active={selectedCategory?.categoryId === category.categoryId}
                                    />
                                ))}
                            </HStack>
                        )}

                        {kitchens.length > 0 && (
                            <HStack className="w-full overflow-x-auto w-[100%-80px] gap-2" style={{ justifyContent: 'flex-start' }}>
                                <PETabItem
                                    title={'All'}
                                    onClick={(): void => setSelectedKitchen(undefined)}
                                    active={selectedKitchen === undefined}
                                />
                                {kitchens.map((kitchen) => (
                                    <PETabItem
                                        key={kitchen.kitchenId}
                                        title={kitchen.title}
                                        onClick={(): void => setSelectedKitchen(kitchen)}
                                        active={selectedKitchen?.kitchenId === kitchen.kitchenId}
                                    />
                                ))}
                            </HStack>
                        )}

                        <HStack gap={16} style={{ flexWrap: 'wrap', justifyContent: 'flex-start' }} className="w-full">
                            {publicCook.menus
                                .filter((_menu) => {
                                    // if (!selectedKitchen) return true;
                                    // return menu.kitchen?.kitchenId !== selectedKitchen?.kitchenId;
                                    return true;
                                })
                                .map((menu) => (
                                    <Link
                                        key={menu.menuId}
                                        href={{
                                            pathname: '/menus/' + menu.menuId,
                                            query: {
                                                address: '',
                                                latitude: 0,
                                                longitude: 0,
                                                adults: 3,
                                                children: 1,
                                                date: moment().format(moment.HTML5_FMT.DATE),
                                            },
                                        }}
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <PEMenuCard
                                            title={menu.title}
                                            description={menu.description}
                                            imageUrls={menu.imageUrls}
                                            pricePerPerson={100}
                                            currencyCode={menu.currencyCode}
                                            chefFirstName={publicCook.user.firstName}
                                            chefProfilePictureUrl={publicCook.user.profilePictureUrl}
                                            categories={menu.categories.map(({ title }) => title)}
                                            kitchen={menu.kitchen?.title}
                                            onClick={(): void => undefined}
                                            fullWidth
                                        />
                                    </Link>
                                ))}
                        </HStack>
                    </>
                )}
            </VStack>

            <PEFooter />
        </VStack>
    );
}
