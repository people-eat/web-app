import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useState, type ReactElement } from 'react';
import {
    CreateOneUserBookingRequestDocument,
    CreateOneUserByEmailAddressDocument,
    type CookRank,
    type CreateBookingRequestRequest,
    type CurrencyCode,
    type Price,
} from '../../../data-source/generated/graphql';
import { type GoogleMapsPlacesResult } from '../../../data-source/searchAddress';
import useResponsive from '../../../hooks/useResponsive';
import { type Allergy } from '../../../shared-domain/Allergy';
import { type Category } from '../../../shared-domain/Category';
import { type Kitchen } from '../../../shared-domain/Kitchen';
import { type Language } from '../../../shared-domain/Language';
import { type Location } from '../../../shared-domain/Location';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import { geoDistance } from '../../../utils/geoDistance';
import BookingRequestForm from '../../BookingRequestForm';
import PEMealCard from '../../cards/mealCard/PEMealCard';
import PEMealCardMobile from '../../cards/mealCard/PEMealCardMobile';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEButton from '../../standard/buttons/PEButton';
import PECarousel from '../../standard/carousel/PECarousel';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import { calculateMenuPrice } from '../cookProfile/menusTab/createMenu/createMenuStep3/ChefProfilePageCreateMenuStep3';
import Payment from '../menuBookingRequest/Payment';
export interface PublicMenuPageProps {
    signedInUser?: SignedInUser;
    searchParameters: {
        location: {
            address: string;
            latitude: number;
            longitude: number;
        };
        adults: number;
        children: number;
        date: string;
    };
    allergies: Allergy[];
    publicMenu: {
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
                    mealId: string;
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
    stripePublishableKey: string;
}

export interface Meal {
    mealId: string;
    title: string;
    description: string;
    imageUrl?: string | null;
}

// eslint-disable-next-line max-statements
export default function PublicMenuPage({
    signedInUser,
    publicMenu,
    searchParameters,
    allergies,
    stripePublishableKey,
}: PublicMenuPageProps): ReactElement {
    const { isMobile } = useResponsive();

    const { t } = useTranslation('common');

    const [address, setAddress] = useState<string>(searchParameters.location.address);
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);
    const [addressSearchResults, setAddressSearchResults] = useState<GoogleMapsPlacesResult[]>([]);

    const [adults, setAdults] = useState(searchParameters.adults);
    const [children, setChildren] = useState(searchParameters.children);
    const [dateTime, setDateTime] = useState(moment(searchParameters.date).set('hours', 12).set('minutes', 0));

    const [occasion, setOccasion] = useState('');
    const [message, setMessage] = useState<string>('');

    const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>([]);

    // for new users
    const [firstName, _setFirstName] = useState('');
    const [lastName, _setLastName] = useState('');
    const [email, _setEmail] = useState('');
    const [_phoneNumber, _setPhoneNumber] = useState('');
    const [areMealsOnMenuSelected, setAreMealsOnMenuSelected] = useState(false);

    const [stripeClientSecret, setStripeClientSecret] = useState<string | undefined>();

    const [completionState, setCompletionState] = useState<undefined | 'SUCCESSFUL' | 'FAILED'>(undefined);
    const [loading, setLoading] = useState(false);
    const [courseSelections, setCourseSelections] = useState<Map<{ courseId: string; title: string }, Meal | undefined>>(
        new Map(publicMenu.courses.map((course) => [course, undefined])),
    );

    const disabled = Array.from(courseSelections.entries()).findIndex(([_courseId, mealId]) => mealId === undefined) !== -1;

    const formatPrice = (price: Price): string => (price.amount / 100).toFixed(2) + ' ' + price.currencyCode;

    const travelExpenses: number | undefined =
        selectedLocation &&
        geoDistance({ location1: selectedLocation, location2: publicMenu.cook.location }) * publicMenu.cook.travelExpenses;

    const menuPrice = calculateMenuPrice(
        adults,
        children,
        publicMenu.basePrice,
        publicMenu.basePriceCustomers,
        publicMenu.pricePerAdult,
        publicMenu.pricePerChild,
    );

    const serviceFee = menuPrice * 0.18;

    const total = (travelExpenses ?? 0) + menuPrice + serviceFee;

    const costs:
        | {
              lineItems: {
                  title: string;
                  price: Price;
              }[];
              total: Price;
          }
        | undefined = travelExpenses
        ? {
              lineItems: [
                  {
                      title: 'Menüpreis',
                      price: { amount: menuPrice, currencyCode: 'EUR' },
                  },
                  {
                      title: 'Reisekosten',
                      price: { amount: travelExpenses, currencyCode: 'EUR' },
                  },
                  {
                      title: 'Service Gebühren',
                      price: { amount: menuPrice * 0.18, currencyCode: 'EUR' },
                  },
              ],
              total: {
                  amount: total,
                  currencyCode: 'EUR',
              },
          }
        : undefined;

    // const disabledForSignedInUser = !acceptedTermsAndConditions || !acceptedPrivacyPolicy;

    // const disabledForNewUser =
    //     firstName.length < 1 ||
    //     lastName.length < 1 ||
    //     !emailIsValid ||
    //     !phoneNumberIsValid ||
    //     !acceptedTermsAndConditions ||
    //     !acceptedPrivacyPolicy;

    // signedInUser ? disabledForSignedInUser : disabledForNewUser

    const [createMenuBookingRequest] = useMutation(CreateOneUserBookingRequestDocument);

    const [createUserWithMenuBookingRequest] = useMutation(CreateOneUserByEmailAddressDocument);

    function onBook(): void {
        const menuBookingRequest: CreateBookingRequestRequest = {
            adultParticipants: adults,
            children,
            dateTime: dateTime.toDate(),
            duration: 120,
            location: {
                latitude: selectedLocation?.latitude ?? 0,
                longitude: selectedLocation?.latitude ?? 0,
                text: address,
            },
            occasion,
            price: {
                // TODO actually not required here
                amount: menuPrice,
                currencyCode: 'EUR',
            },
            // allergyIds: selectedAllergies.map(({ allergyId }) => allergyId),
            message,
            cookId: publicMenu.cook.cookId,
            preparationTime: 120,
            configuredMenu: {
                menuId: publicMenu.menuId,
                courses: [],
                // Array.from(courseSelections.entries()).map(([courseId, mealId]) => ({ courseId, mealId })),
            },
        };

        setLoading(true);
        signedInUser
            ? void createMenuBookingRequest({
                  variables: {
                      userId: signedInUser?.userId ?? '',
                      request: menuBookingRequest,
                  },
              })
                  .then(({ data }) => {
                      if (data?.users.bookingRequests.createOne.success) {
                          setCompletionState('SUCCESSFUL');
                          setStripeClientSecret(data.users.bookingRequests.createOne.clientSecret);
                      } else setCompletionState('FAILED');
                  })
                  .catch(() => setCompletionState('FAILED'))
                  .finally(() => setLoading(false))
            : void createUserWithMenuBookingRequest({
                  variables: {
                      profilePicture: undefined,
                      request: {
                          firstName: firstName,
                          lastName: lastName,
                          emailAddress: email,
                          gender: 'NO_INFORMATION',
                          language: 'GERMAN',
                          password: '',
                          globalBookingRequest: menuBookingRequest,
                      },
                  },
              })
                  .then(({ data }) => setCompletionState(data?.users.success ? 'SUCCESSFUL' : 'FAILED'))
                  .catch(() => setCompletionState('FAILED'))
                  .finally(() => setLoading(false));
    }

    return (
        <VStack gap={82} className="w-full h-full overflow-x-hidden">
            <PEHeader signedInUser={signedInUser} />

            <VStack className="relative lg:w-[calc(100%-32px)] w-[calc(100%-64px)] max-w-screen-xl mx-8 lg:mx-4" gap={16}>
                {publicMenu && (
                    <>
                        <HStack
                            className="w-full bg-white shadow-primary box-border p-8 rounded-4"
                            gap={16}
                            style={{
                                flexDirection: isMobile ? 'column' : 'row',
                            }}
                        >
                            <div className="flex justify-center items-center rounded-3  overflow-hidden w-[220px] min-w-[220px] max-w-[220px] h-[220px] max-h-[220px] bg-base">
                                {publicMenu.imageUrls.length < 1 && <PEIcon icon={Icon.food} edgeLength={52} />}

                                {publicMenu.imageUrls.length === 1 && (
                                    <Image
                                        draggable={false}
                                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                        src={publicMenu.imageUrls[0] as string}
                                        alt={'Menu image'}
                                        width={220}
                                        height={220}
                                    />
                                )}

                                {publicMenu.imageUrls.length > 1 && !isMobile && (
                                    <PECarousel
                                        images={publicMenu.imageUrls.map((picture, index) => (
                                            <Image
                                                draggable={false}
                                                key={index}
                                                style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                                src={picture}
                                                alt={`Menu image ${index + 1}`}
                                                width={220}
                                                height={220}
                                            />
                                        ))}
                                    />
                                )}
                                {publicMenu.imageUrls.length > 1 && isMobile && (
                                    <Image
                                        draggable={false}
                                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                        src={publicMenu.imageUrls[0] as string}
                                        alt={'Menu image'}
                                        width={220}
                                        height={220}
                                    />
                                )}
                            </div>
                            {publicMenu.imageUrls.length > 1 && isMobile && (
                                <div className="flex overflow-x-auto  gap-3 mt-2" style={{ overflow: 'scroll' }}>
                                    {publicMenu.imageUrls.slice(1).map((_img, i) => (
                                        <div key={i} className="flex-none rounded-3 w-28">
                                            <Image
                                                draggable={false}
                                                style={{ width: '100%', objectPosition: 'center', objectFit: 'fill', borderRadius: '12px' }}
                                                src={_img}
                                                alt={'Menu image'}
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <VStack gap={16} style={{ alignItems: 'flex-start' }}>
                                <VStack gap={0} style={{ alignItems: 'flex-start' }}>
                                    <p style={{ lineHeight: 0, textAlign: 'start' }} className="text-heading-m">
                                        {publicMenu.title}
                                    </p>
                                    <p style={{ lineHeight: 0, textAlign: 'start' }} className="text-orange">
                                        {(menuPrice / 100 / (adults + children)).toFixed(2)} EUR pro Person
                                    </p>
                                    <p style={{ lineHeight: 0 }} className="text-gray">
                                        (Bei einer Anzahl von {adults + children} Personen)
                                    </p>

                                    <HStack gap={8} className="w-full">
                                        {publicMenu.cook.user.profilePictureUrl && (
                                            <Image
                                                width={48}
                                                height={48}
                                                src={publicMenu.cook.user.profilePictureUrl}
                                                alt={'Profile picture of the chef owning the menu'}
                                                className="object-cover"
                                                style={{ borderRadius: '50%' }}
                                            />
                                        )}

                                        {!publicMenu.cook.user.profilePictureUrl && <PEIcon edgeLength={48} icon={Icon.profileLight} />}

                                        <VStack style={{ alignItems: 'flex-start' }}>
                                            <span className="text-preBlack">{publicMenu.cook.user.firstName}</span>
                                            <HStack gap={4}>
                                                <PEIcon icon={Icon.markerPin} />
                                                <span className="text-preBlack">{publicMenu.cook.city}</span>
                                            </HStack>
                                        </VStack>

                                        <Spacer />
                                    </HStack>

                                    <p style={{ lineHeight: 0 }} className="text-gray">
                                        Menübeschreibung
                                    </p>
                                    <span>{publicMenu.description}</span>
                                </VStack>
                                {publicMenu.categories.map((category) => (
                                    <div key={category.categoryId}>{category.title}</div>
                                ))}
                                {/* {publicMenu.kitchen && <>{publicMenu.kitchen.title}</>}

                                {publicMenu.cook.languages?.length > 0 && (
                                    <HStack gap={16}>
                                        <PEIcon icon={Icon.messageChat} />
                                        <span>{publicMenu.cook.languages.map(({ title }) => title).join(', ')}</span>
                                    </HStack>
                                )} */}
                            </VStack>

                            <Spacer />
                        </HStack>
                        <Divider flexItem className="py-3" />
                        <HStack gap={32} className="w-full" style={{ minWidth: '500px', flexWrap: 'wrap' }}>
                            <VStack gap={32} style={{ flex: isMobile ? 'none' : 1 }}>
                                {publicMenu.courses.map((course) => (
                                    <VStack key={course.courseId} style={{ width: isMobile ? '93vw' : '100%' }} gap={32}>
                                        <HStack className="w-full">
                                            <span className="text-heading-m">{course.title}</span>
                                            <Spacer />
                                        </HStack>
                                        <HStack
                                            gap={isMobile ? 16 : 24}
                                            className="w-full overflow-x-auto p-3"
                                            style={{ justifyContent: 'flex-start' }}
                                        >
                                            {course.mealOptions.map(
                                                (mealOption) =>
                                                    (isMobile && (
                                                        <PEMealCardMobile
                                                            key={mealOption.index}
                                                            title={mealOption.meal.title}
                                                            description={mealOption.meal.description}
                                                            imageUrl={mealOption.meal.imageUrl ?? undefined}
                                                            active={courseSelections.get(course)?.mealId === mealOption.meal.mealId}
                                                            onClick={(): void =>
                                                                setCourseSelections(new Map(courseSelections.set(course, mealOption.meal)))
                                                            }
                                                        />
                                                    )) ||
                                                    (!isMobile && (
                                                        <PEMealCard
                                                            key={mealOption.index}
                                                            title={mealOption.meal.title}
                                                            description={mealOption.meal.description}
                                                            imageUrl={mealOption.meal.imageUrl ?? undefined}
                                                            active={courseSelections.get(course)?.mealId === mealOption.meal.mealId}
                                                            onClick={(): void =>
                                                                setCourseSelections(new Map(courseSelections.set(course, mealOption.meal)))
                                                            }
                                                        />
                                                    )),
                                            )}
                                        </HStack>
                                    </VStack>
                                ))}
                            </VStack>
                            {!isMobile && (
                                <BookingRequestForm
                                    signedInUser={signedInUser}
                                    externalDisabled={disabled}
                                    allergies={allergies}
                                    costs={costs}
                                    onComplete={(): void => onBook()}
                                    address={address}
                                    setAddress={setAddress}
                                    location={selectedLocation}
                                    setLocation={setSelectedLocation}
                                    addressSearchResults={addressSearchResults}
                                    setAddressSearchResults={setAddressSearchResults}
                                    adults={adults}
                                    setAdults={setAdults}
                                    // eslint-disable-next-line react/no-children-prop
                                    children={children}
                                    setChildren={setChildren}
                                    dateTime={dateTime}
                                    setDateTime={setDateTime}
                                    occasion={occasion}
                                    setOccasion={setOccasion}
                                    message={message}
                                    setMessage={setMessage}
                                    selectedAllergies={selectedAllergies}
                                    setSelectedAllergies={setSelectedAllergies}
                                />
                            )}
                        </HStack>
                        {isMobile && <PEButton title="Weiter" onClick={(): void => setAreMealsOnMenuSelected(true)} />}

                        {isMobile && areMealsOnMenuSelected && (
                            <div
                                className="fixed inset-0 z-50 bg-white pt-[80px] flex flex-col justify-center items-center"
                                style={{ overflowY: 'auto' }}
                            >
                                <button
                                    onClick={(): void => setAreMealsOnMenuSelected(false)}
                                    className="bg-transparent absolute top-1 left-2 border-none flex justify-center items-center gap-2 text-orange text-lg"
                                >
                                    <PEIcon icon={Icon.arrowPrev} edgeLength={20} /> Back
                                </button>

                                <BookingRequestForm
                                    signedInUser={signedInUser}
                                    externalDisabled={disabled}
                                    allergies={allergies}
                                    costs={costs}
                                    onComplete={(): void => onBook()}
                                    address={address}
                                    setAddress={setAddress}
                                    location={selectedLocation}
                                    setLocation={setSelectedLocation}
                                    addressSearchResults={addressSearchResults}
                                    setAddressSearchResults={setAddressSearchResults}
                                    adults={adults}
                                    setAdults={setAdults}
                                    // eslint-disable-next-line react/no-children-prop
                                    children={children}
                                    setChildren={setChildren}
                                    dateTime={dateTime}
                                    setDateTime={setDateTime}
                                    occasion={occasion}
                                    setOccasion={setOccasion}
                                    message={message}
                                    setMessage={setMessage}
                                    selectedAllergies={selectedAllergies}
                                    setSelectedAllergies={setSelectedAllergies}
                                />
                            </div>
                        )}
                    </>
                )}
            </VStack>

            {completionState === 'SUCCESSFUL' && stripeClientSecret && (
                <Dialog open maxWidth="md">
                    <DialogTitle>{'Zahlungsmittel hinterlegen'}</DialogTitle>

                    <Elements stripe={loadStripe(`${stripePublishableKey}`)} options={{ clientSecret: stripeClientSecret }}>
                        <Payment>
                            {costs && (
                                <VStack gap={16} style={{ width: '100%', flex: 1 }}>
                                    <h3 style={{ lineHeight: 0 }}>{publicMenu.title}</h3>

                                    {Array.from(courseSelections.entries()).map(([course, meal]) => (
                                        <VStack key={course.courseId}>
                                            <b>{course.title}</b>
                                            <div>{meal?.title}</div>
                                        </VStack>
                                    ))}

                                    <Spacer />

                                    <Divider flexItem />

                                    {costs.lineItems.map((lineItem, index) => (
                                        <HStack className="w-full" key={index}>
                                            <span>{lineItem.title}</span>
                                            <Spacer />
                                            <span>{formatPrice(lineItem.price)}</span>
                                        </HStack>
                                    ))}

                                    <HStack className="w-full">
                                        <span>
                                            <b>Gesamtsumme</b>
                                        </span>
                                        <Spacer />
                                        <span>
                                            <b>{formatPrice(costs.total)}</b>
                                        </span>
                                    </HStack>
                                </VStack>
                            )}
                        </Payment>
                    </Elements>
                </Dialog>
            )}

            {loading && (
                <Dialog open>
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}

            {completionState === 'FAILED' && (
                <Dialog open>
                    <DialogContent>{t('error')}</DialogContent>
                </Dialog>
            )}

            <PEFooter />
        </VStack>
    );
}
