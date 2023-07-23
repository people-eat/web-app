import { useMutation } from '@apollo/client';
import { Button, DialogActions, DialogTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import {
    CreateOneUserBookingRequestDocument,
    CreateOneUserByEmailAddressDocument,
    type CookRank,
    type CreateBookingRequestRequest,
    type CurrencyCode,
} from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';
import { type Allergy } from '../../../shared-domain/Allergy';
import { type Category } from '../../../shared-domain/Category';
import { type Kitchen } from '../../../shared-domain/Kitchen';
import { type Location } from '../../../shared-domain/Location';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEMealCard from '../../cards/mealCard/PEMealCard';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEBulletPoint from '../../standard/bulletPoint/PEBulletPoint';
import { Icon } from '../../standard/icon/Icon';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import { calculateMenuPrice } from '../cookProfile/menusTab/createMenu/createMenuStep3/ChefProfilePageCreateMenuStep3';
import Payment from './Payment';
import MenuBookingRequestPageStep1 from './step1/MenuBookingRequestPageStep1';
import MenuBookingRequestPageStep2 from './step2/MenuBookingRequestPageStep2';
import MenuBookingRequestPageStep3 from './step3/MenuBookingRequestPageStep3';

export interface MenuBookingRequestPageProps {
    signedInUser?: SignedInUser;
    menu: {
        menuId: string;
        title: string;
        description: string;
        kitchen?: Kitchen;
        cook: {
            cookId: string;
            rank: CookRank;
            user: { firstName: string; profilePictureUrl?: string };
            location: Location;
            city: string;
            travelExpenses: number;
            maximumTravelDistance?: number;
        };
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
        categories: Category[];
        imageUrls: string[];
        basePrice: number;
        basePriceCustomers: number;
        pricePerAdult: number;
        pricePerChild?: number;
        currencyCode: CurrencyCode;
    };
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
    stripePublishableKey: string;
}

// eslint-disable-next-line max-statements
export default function MenuBookingRequestPage({
    signedInUser,
    menu,
    searchParameters,
    allergies,
    stripePublishableKey,
}: MenuBookingRequestPageProps): ReactElement {
    const { t } = useTranslation('global-booking-request');
    const { t: homeTranslations } = useTranslation('home');
    const { t: commonTranslate } = useTranslation('common');
    const { isDesktop } = useResponsive();

    const router = useRouter();
    const { courseSelections: courseSelectionsArray } = router.query;
    const courseSelections = new Map<string, string>(JSON.parse(courseSelectionsArray as string) as unknown as [string, string][]);

    const [step, setStep] = useState(0);

    const [addressSearchText, setAddressSearchText] = useState<string>(searchParameters.location.address);
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

    const [adults, setAdults] = useState(searchParameters.adults);
    const [children, setChildren] = useState(searchParameters.children);
    const [dateTime, setDateTime] = useState(moment(searchParameters.date).set('hours', 12).set('minutes', 0));

    const [occasion, setOccasion] = useState('');
    const [message, setMessage] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>([]);

    const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false);
    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);

    const [stripeClientSecret, setStripeClientSecret] = useState<string | undefined>();

    const price = calculateMenuPrice(adults, children, menu.basePrice, menu.basePriceCustomers, menu.pricePerAdult, menu.pricePerChild);

    const [loading, setLoading] = useState(false);
    const [completionState, setCompletionState] = useState<undefined | 'SUCCESSFUL' | 'FAILED'>(undefined);

    const menuBookingRequest: CreateBookingRequestRequest = {
        adultParticipants: adults,
        children,
        dateTime: dateTime.toDate(),
        duration: 120,
        location: {
            latitude: selectedLocation?.latitude ?? 0,
            longitude: selectedLocation?.latitude ?? 0,
            text: addressSearchText,
        },
        occasion,
        price: {
            // TODO actually not required here
            amount: price,
            currencyCode: 'EUR',
        },
        // allergyIds: selectedAllergies.map(({ allergyId }) => allergyId),
        message,
        cookId: menu.cook.cookId,
        preparationTime: 120,
        configuredMenu: {
            menuId: menu.menuId,
            courses: Array.from(courseSelections.entries()).map(([courseId, mealId]) => ({ courseId, mealId })),
        },
    };

    const [createMenuBookingRequest] = useMutation(CreateOneUserBookingRequestDocument, {
        variables: {
            userId: signedInUser?.userId ?? '',
            request: menuBookingRequest,
        },
    });

    const [createUserWithMenuBookingRequest] = useMutation(CreateOneUserByEmailAddressDocument, {
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
    });

    return (
        <VStack gap={32} className="w-full min-h-screen">
            <PEHeader signedInUser={signedInUser} />

            <HStack gap={64} className="w-full max-w-screen-xl" style={{ justifyContent: 'space-between' }}>
                <VStack
                    gap={32}
                    className="w-full relative max-w-[48%] lg:max-w-full lg:p-4 lg:box-border"
                    style={{ alignItems: 'flex-start' }}
                >
                    <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg lg:text-heading-s">{'Menü Buchungsanfrage'}</h1>

                    <Stepper activeStep={step}>
                        <Step>
                            <StepLabel onClick={(): void => setStep(0)}>{t('step-1-label')}</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel onClick={(): void => setStep(1)}>{t('step-2-label')}</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel onClick={(): void => setStep(2)}>{t('step-3-label')}</StepLabel>
                        </Step>
                    </Stepper>

                    {step === 0 && (
                        <MenuBookingRequestPageStep1
                            price={price}
                            adultCount={adults}
                            setAdultCount={setAdults}
                            childrenCount={children}
                            setChildrenCount={setChildren}
                            addressSearchText={addressSearchText}
                            setAddressSearchText={setAddressSearchText}
                            selectedLocation={selectedLocation}
                            setSelectedLocation={setSelectedLocation}
                            dateTime={dateTime}
                            setDateTime={setDateTime}
                            occasion={occasion}
                            setOccasion={setOccasion}
                            cookLocation={menu.cook.location}
                            cookTravelExpenses={menu.cook.travelExpenses}
                            onContinue={(): void => setStep(1)}
                        />
                    )}

                    {step === 1 && (
                        <MenuBookingRequestPageStep2
                            allergies={allergies}
                            selectedAllergies={selectedAllergies}
                            setSelectedAllergies={setSelectedAllergies}
                            onContinue={(): void => setStep(2)}
                        />
                    )}

                    {step === 2 && (
                        <MenuBookingRequestPageStep3
                            signedInUser={signedInUser}
                            firstName={firstName}
                            setFirstName={setFirstName}
                            lastName={lastName}
                            setLastName={setLastName}
                            email={email}
                            setEmail={setEmail}
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            acceptedPrivacyPolicy={acceptedPrivacyPolicy}
                            setAcceptedPrivacyPolicy={setAcceptedPrivacyPolicy}
                            acceptedTermsAndConditions={acceptedTermsAndConditions}
                            setAcceptedTermsAndConditions={setAcceptedTermsAndConditions}
                            message={message}
                            setMessage={setMessage}
                            onContinue={(): void => {
                                setLoading(true);
                                signedInUser
                                    ? void createMenuBookingRequest()
                                          .then(({ data }) => {
                                              if (data?.users.bookingRequests.createOne.success) {
                                                  setCompletionState('SUCCESSFUL');
                                                  setStripeClientSecret(data.users.bookingRequests.createOne.clientSecret);
                                              } else setCompletionState('FAILED');
                                          })
                                          .catch(() => setCompletionState('FAILED'))
                                          .finally(() => setLoading(false))
                                    : void createUserWithMenuBookingRequest()
                                          .then(({ data }) => setCompletionState(data?.users.success ? 'SUCCESSFUL' : 'FAILED'))
                                          .catch(() => setCompletionState('FAILED'))
                                          .finally(() => setLoading(false));
                            }}
                        />
                    )}
                </VStack>

                {isDesktop && (
                    <VStack gap={32} className="w-full" style={{ alignItems: 'flex-start' }}>
                        <VStack gap={32} style={{ flex: 1 }}>
                            {menu.courses.map((course) => (
                                <VStack key={course.courseId} className="w-full" gap={32}>
                                    <HStack className="w-full">
                                        <span className="text-heading-m">{course.title}</span>
                                        <Spacer />
                                    </HStack>

                                    <HStack gap={16} className="w-full" style={{ justifyContent: 'flex-start' }}>
                                        {course.mealOptions.map(
                                            (mealOption) =>
                                                mealOption.meal.mealId === courseSelections.get(course.courseId) && (
                                                    <PEMealCard
                                                        key={mealOption.index}
                                                        title={mealOption.meal.title}
                                                        description={mealOption.meal.description}
                                                        imageUrl={mealOption.meal.imageUrl ?? undefined}
                                                    />
                                                ),
                                        )}
                                    </HStack>
                                </VStack>
                            ))}
                        </VStack>

                        <HStack gap={16}>
                            <Image
                                className="w-full"
                                src={menu.cook.user.profilePictureUrl ?? '/picture-1.png'}
                                alt=""
                                width={128}
                                height={128}
                                style={{
                                    height: '100%',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    borderRadius: '16px',
                                    alignItems: 'flex-start',
                                    objectFit: 'cover',
                                    boxSizing: 'border-box',
                                    maxHeight: '128px',
                                    maxWidth: '128px',
                                }}
                            />

                            <VStack style={{ alignItems: 'flex-start' }}>
                                <h3>
                                    {menu.cook.user.firstName} - {menu.cook.rank}
                                </h3>
                                <h3>{menu.title}</h3>
                            </VStack>
                        </HStack>
                        <VStack gap={32} style={{ alignItems: 'flex-start' }}>
                            <PEBulletPoint
                                icon={Icon.foodBasket}
                                title={homeTranslations('section-3-bullet-point-1-title')}
                                text=""
                                maxWidth={'530px'}
                            />
                            <PEBulletPoint
                                icon={Icon.dinner}
                                title={homeTranslations('section-3-bullet-point-2-title')}
                                text=""
                                maxWidth={'530px'}
                            />
                            <PEBulletPoint
                                icon={Icon.cleanKitchen}
                                title={homeTranslations('section-3-bullet-point-3-title')}
                                text=""
                                maxWidth={'530px'}
                            />
                        </VStack>
                    </VStack>
                )}
            </HStack>

            {completionState === 'SUCCESSFUL' && stripeClientSecret && (
                <Dialog open>
                    <DialogTitle>{'Jetzt bezahlen'}</DialogTitle>
                    <DialogContent>
                        <Elements stripe={loadStripe(`${stripePublishableKey}`)} options={{ clientSecret: stripeClientSecret }}>
                            <Payment />
                        </Elements>
                    </DialogContent>
                    <DialogActions>
                        <Link href="/" className="no-underline">
                            <Button autoFocus>{commonTranslate('back')}</Button>
                        </Link>
                    </DialogActions>
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
                    <DialogContent>{commonTranslate('error')}</DialogContent>
                </Dialog>
            )}

            <Spacer />

            <PEFooter />
        </VStack>
    );
}
