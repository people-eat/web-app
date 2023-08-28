import { useMutation, useQuery } from '@apollo/client';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type ReactElement } from 'react';
import {
    CreateOneFollowingDocument,
    DeleteOneFollowingDocument,
    FindManyFollowingsDocument,
    type CookRank,
    type CurrencyCode,
} from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';
import { type Category } from '../../../shared-domain/Category';
import { type Kitchen } from '../../../shared-domain/Kitchen';
import { type Language } from '../../../shared-domain/Language';
import { type Location } from '../../../shared-domain/Location';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEMenuCard from '../../cards/menuCard/PEMenuCard';
import PEMenuCardMobile from '../../cards/menuCard/PEMenuCardMobile';
import PEReviewCardMenu from '../../cards/reviewCard/PEReviewCardMenu';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEButton from '../../standard/buttons/PEButton';
import PEFavorite from '../../standard/favorite/PEFavorite';
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
    const { isMobile } = useResponsive();
    const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | undefined>();
    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>();
    const [liked, setLike] = useState(false);
    const { data } = useQuery(FindManyFollowingsDocument);
    const followings = data?.users.me?.followings;

    useEffect(() => {
        if (followings) {
            const foundFollowing = followings.find((following) => following.cook.user.firstName === publicCook?.user.firstName);
            if (foundFollowing) setLike(true);
            else setLike(false);
        }
    }, []);

    const [createFollowing] = useMutation(CreateOneFollowingDocument);
    const [deleteFollowing] = useMutation(DeleteOneFollowingDocument);

    return (
        <VStack gap={40} className="w-full h-full">
            <PEHeader signedInUser={signedInUser} />

            <VStack className="relative lg:w-[calc(100%-32px)] w-[calc(100%-64px)] max-w-screen-xl mx-8 lg:mx-4" gap={16}>
                {publicCook && (
                    <>
                        <HStack
                            className="w-full bg-white shadow-primary box-border p-8 rounded-4"
                            style={{ flexDirection: isMobile ? 'column' : 'row' }}
                            gap={16}
                        >
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
                                <VStack
                                    gap={8}
                                    style={{
                                        alignItems: 'flex-start',
                                        position: isMobile ? 'absolute' : 'static',
                                        top: '30px',
                                        left: '165px',
                                    }}
                                >
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

                            <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
                                <PEFavorite
                                    isFavorite={liked}
                                    onIsFavoriteChange={(): void => {
                                        if (!signedInUser) return;
                                        if (liked) {
                                            void deleteFollowing({
                                                variables: { userId: signedInUser.userId, cookId: publicCook.cookId },
                                            }).then((result) => result.data?.users.followings.success && setLike(!liked));
                                            return;
                                        }
                                        if (!liked) {
                                            void createFollowing({
                                                variables: { userId: signedInUser.userId, cookId: publicCook.cookId },
                                            }).then((result) => result.data?.users.followings.success && setLike(!liked));
                                        }
                                    }}
                                />
                            </div>
                        </HStack>
                        <HStack className="w-full bg-white shadow-primary box-border p-8 rounded-4">
                            <VStack gap={20} className="w-full" style={{ alignItems: 'flex-start' }}>
                                <p className="text-heading-m my-0">Video</p>
                                <video style={{ margin: '0 auto' }} controls>
                                    <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                                </video>
                            </VStack>
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
                            <HStack className="w-full overflow-x-auto gap-2" style={{ justifyContent: 'flex-start' }}>
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
                            <HStack className="w-full overflow-x-auto gap-2" style={{ justifyContent: 'flex-start' }}>
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
                                .filter((_menu, index) => {
                                    if (selectedKitchen && selectedKitchen.kitchenId !== _menu.kitchen?.kitchenId) return false;

                                    if (selectedCategory && !_menu.categories.some((cat) => cat.title === selectedCategory.title))
                                        return false;
                                    if (isMobile ? index > 4 : index > 3) return false;

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
                                        {!isMobile && (
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
                                        )}
                                        {isMobile && (
                                            <PEMenuCardMobile
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
                                        )}
                                    </Link>
                                ))}

                            {/* {publicCook.menus.length > 3 && (
                                <Link href={`/menus?chefId=${publicCook.user.firstName}`} style={{ textDecoration: 'none', width: '93vw' }}>
                                    <PEButton title="All menus" onClick={(): void => undefined} />
                                </Link>
                            )} */}
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
                                className="no-underline w-[93vw]"
                            >
                                <PEButton
                                    title={bookingTranslations('send-request-label')}
                                    type="primary"
                                    onClick={(): void => undefined}
                                />
                            </Link>
                        </HStack>
                        <>
                            <HStack
                                className="w-full items-center  bg-white shadow-primary box-border rounded-4 p-[2rem]"
                                style={{ justifyContent: 'space-between' }}
                            >
                                <h2> Overall rating</h2>
                                <div className="flex">
                                    <PEIcon icon={Icon.star} edgeLength={20} />
                                    <span className="text-preBlack mr-2">{4.9}</span>
                                    <span className="text-preBlack"> (5 Reviews)</span>
                                </div>
                            </HStack>
                            <VStack
                                gap={6}
                                style={{
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    marginTop: '2rem',
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                }}
                            >
                                <div className="w-[48.5%] sm:w-full p-2">
                                    <PEReviewCardMenu
                                        chefFirstName={publicCook.user.firstName}
                                        chefProfilePictureUrl={publicCook.user.profilePictureUrl}
                                        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam tincidunt, nisl libero"
                                        customerFirstName="Anna"
                                        occasion="Birthday"
                                        createdAt="August, 20, 2023"
                                        ratingValue="4.8"
                                        chefRank="HOBBY"
                                    />
                                </div>
                                <div className="w-[48.5%] sm:w-full p-2">
                                    <PEReviewCardMenu
                                        chefFirstName={publicCook.user.firstName}
                                        chefProfilePictureUrl={publicCook.user.profilePictureUrl}
                                        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam tincidunt, nisl libero"
                                        customerFirstName="Anna"
                                        occasion="Birthday"
                                        createdAt="August, 20, 2023"
                                        ratingValue="4.8"
                                        chefRank="HOBBY"
                                    />
                                </div>
                                <div className="w-[48.5%] sm:w-full p-2">
                                    <PEReviewCardMenu
                                        chefFirstName={publicCook.user.firstName}
                                        chefProfilePictureUrl={publicCook.user.profilePictureUrl}
                                        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam tincidunt, nisl libero"
                                        customerFirstName="Anna"
                                        occasion="Birthday"
                                        createdAt="August, 20, 2023"
                                        ratingValue="4.8"
                                        chefRank="HOBBY"
                                    />
                                </div>
                                <div className="w-[48.5%] sm:w-full p-2">
                                    <PEReviewCardMenu
                                        chefFirstName={publicCook.user.firstName}
                                        chefProfilePictureUrl={publicCook.user.profilePictureUrl}
                                        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam tincidunt, nisl libero"
                                        customerFirstName="Anna"
                                        occasion="Birthday"
                                        createdAt="August, 20, 2023"
                                        ratingValue="4.8"
                                        chefRank="HOBBY"
                                    />
                                </div>
                                <div className="w-[48.5%] sm:w-full p-2">
                                    <PEReviewCardMenu
                                        chefFirstName={publicCook.user.firstName}
                                        chefProfilePictureUrl={publicCook.user.profilePictureUrl}
                                        comment="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam tincidunt, nisl libero"
                                        customerFirstName="Anna"
                                        occasion="Birthday"
                                        createdAt="August, 20, 2023"
                                        ratingValue="4.8"
                                        chefRank="HOBBY"
                                    />
                                </div>
                            </VStack>
                        </>
                    </>
                )}
            </VStack>
            <PEFooter />
        </VStack>
    );
}
