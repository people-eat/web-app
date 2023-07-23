import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import { type CookRank, type CurrencyCode } from '../../../data-source/generated/graphql';
import { type Category } from '../../../shared-domain/Category';
import { type Kitchen } from '../../../shared-domain/Kitchen';
import { type Language } from '../../../shared-domain/Language';
import { type Location } from '../../../shared-domain/Location';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEMealCard from '../../cards/mealCard/PEMealCard';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEButton from '../../standard/buttons/PEButton';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface PublicMenuPageProps {
    signedInUser?: SignedInUser;
    publicMenu?: {
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
        courses: {
            index: number;
            courseId: string;
            title: string;
            mealOptions: {
                index: number;
                meal: {
                    title: string;
                    description: string;
                    imageUrl?: string | null;
                };
            }[];
        }[];
        cook: {
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
        };
    };
}

export default function PublicMenuPage({ signedInUser, publicMenu }: PublicMenuPageProps): ReactElement {
    // const { isMobile } = useResponsive();

    const { t } = useTranslation('common');
    const { t: bookingTranslations } = useTranslation('globalBookingRequest');

    return (
        <VStack gap={40} className="w-full h-full overflow-hidden">
            <PEHeader signedInUser={signedInUser} />

            <VStack className="relative lg:w-[calc(100%-32px)] w-[calc(100%-64px)] max-w-screen-xl mx-8 lg:mx-4" gap={16}>
                {publicMenu && (
                    <>
                        <HStack className="w-full bg-white shadow-primary box-border p-8 rounded-4" gap={16}>
                            {publicMenu.cook.user.profilePictureUrl && (
                                <Image
                                    style={{
                                        width: '120px',
                                        height: '120px',
                                        borderRadius: 4,
                                        objectPosition: 'center',
                                        objectFit: 'cover',
                                    }}
                                    src={publicMenu.cook.user.profilePictureUrl}
                                    alt={'Profile Picture'}
                                    width={120}
                                    height={120}
                                />
                            )}

                            {!publicMenu.cook.user.profilePictureUrl && (
                                <div className="bg-base rounded-2 flex justify-center items-center min-h-[120px] w-[120px]">
                                    <PEIcon edgeLength={32} icon={Icon.profileLight} />
                                </div>
                            )}

                            <VStack gap={16} style={{ alignItems: 'flex-start' }}>
                                <VStack gap={8} style={{ alignItems: 'flex-start' }}>
                                    <p className="text-heading-m my-0">{publicMenu.cook.user.firstName}</p>
                                    <span className="text-orange">{t(publicMenu.cook.rank)}</span>
                                </VStack>
                                <HStack gap={16}>
                                    <PEIcon icon={Icon.markerPin} />
                                    <span>{publicMenu.cook.city}</span>
                                </HStack>
                                {publicMenu.cook.languages?.length > 0 && (
                                    <HStack gap={16}>
                                        <PEIcon icon={Icon.messageChat} />
                                        <span>{publicMenu.cook.languages.map(({ title }) => title).join(', ')}</span>
                                    </HStack>
                                )}
                            </VStack>

                            <Spacer />

                            <Link
                                href={{
                                    pathname: '/menu-booking-request',
                                    query: {
                                        menuId: publicMenu.menuId,
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

                        <HStack className="w-full">
                            <h2>Courses</h2>
                            <Spacer />
                        </HStack>

                        {publicMenu.courses.map((course) => (
                            <VStack key={course.courseId} className="w-full" gap={32}>
                                <HStack className="w-full">
                                    <span>{course.title}</span>
                                    <Spacer />
                                </HStack>

                                <HStack gap={16} className="w-full" style={{ justifyContent: 'flex-start' }}>
                                    {course.mealOptions.map((mealOption) => (
                                        <PEMealCard
                                            key={mealOption.index}
                                            title={mealOption.meal.title}
                                            description={mealOption.meal.description}
                                            imageUrl={mealOption.meal.imageUrl ?? undefined}
                                        />
                                    ))}
                                </HStack>
                            </VStack>
                        ))}
                    </>
                )}
            </VStack>

            <Spacer />

            <PEFooter />
        </VStack>
    );
}
