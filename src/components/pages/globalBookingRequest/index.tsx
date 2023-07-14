import { useMutation } from '@apollo/client';
import { Button, DialogActions, DialogContentText, DialogTitle } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import {
    CreateOneUserByEmailAddressDocument,
    CreateOneUserGlobalBookingRequestDocument,
    type CreateOneGlobalBookingRequestRequest,
} from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';
import { type Allergy } from '../../../shared-domain/Allergy';
import { type Category } from '../../../shared-domain/Category';
import { type Kitchen } from '../../../shared-domain/Kitchen';
import { type Location } from '../../../shared-domain/Location';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEBulletPoint from '../../standard/bulletPoint/PEBulletPoint';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import { header, header02, header03 } from './points.mock';
import GlobalBookingRequestPageStep1 from './step1/GlobalBookingRequestPageStep1';
import GlobalBookingRequestPageStep2 from './step2/GlobalBookingRequestPageStep2';
import GlobalBookingRequestPageStep3 from './step3/GlobalBookingRequestPageStep3';

export interface GlobalBookingRequestPageProps {
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
    categories: Category[];
    allergies: Allergy[];
    kitchens: Kitchen[];
}

// eslint-disable-next-line max-statements
export default function GlobalBookingRequestPage({
    signedInUser,
    searchParameters,
    categories,
    allergies,
    kitchens,
}: GlobalBookingRequestPageProps): ReactElement {
    const { t } = useTranslation('global-booking-request');
    const { t: homeTranslations } = useTranslation('home');
    const { t: commonTranslate } = useTranslation('common');
    const { isDesktop } = useResponsive();

    const [step, setStep] = useState(0);

    const [addressSearchText, setAddressSearchText] = useState<string>(searchParameters.location.address);
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);

    const [adults, setAdults] = useState(searchParameters.adults);
    const [children, setChildren] = useState(searchParameters.children);
    const [dateTime, setDateTime] = useState(moment(searchParameters.date).set('hours', 12).set('minutes', 0));

    const [occasion, setOccasion] = useState('');
    const [budget, setBudget] = useState('');
    const [message, setMessage] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | undefined>(undefined);
    const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>([]);

    const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false);
    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);

    const [loading, setLoading] = useState(false);
    const [completionState, setCompletionState] = useState<undefined | 'SUCCESSFUL' | 'FAILED'>(undefined);

    const globalBookingRequest: CreateOneGlobalBookingRequestRequest = {
        adultParticipants: adults,
        children,
        dateTime: dateTime.toDate(),
        duration: 120,
        location: {
            latitude: selectedLocation?.latitude ?? 0,
            longitude: selectedLocation?.latitude ?? 0,
            text: selectedLocation?.text,
        },
        occasion,
        price: {
            amount: Number(budget),
            currencyCode: 'EUR',
        },
        allergyIds: selectedAllergies.map(({ allergyId }) => allergyId),
        categoryIds: selectedCategories.map(({ categoryId }) => categoryId),
        kitchenId: selectedKitchen?.kitchenId,
        message,
        phoneNumber: phoneNumber === '' ? undefined : phoneNumber.replaceAll(' ', ''),
    };

    const [createGlobalBookingRequest] = useMutation(CreateOneUserGlobalBookingRequestDocument, {
        variables: {
            userId: signedInUser?.userId ?? '',
            request: globalBookingRequest,
        },
    });

    const [createUserWithGlobalBookingRequest] = useMutation(CreateOneUserByEmailAddressDocument, {
        variables: {
            profilePicture: undefined,
            request: {
                firstName: firstName,
                lastName: lastName,
                emailAddress: email,
                phoneNumber: phoneNumber.replaceAll(' ', ''),
                gender: 'NO_INFORMATION',
                language: 'GERMAN',
                password: '',
                globalBookingRequest: globalBookingRequest,
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
                    <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg lg:text-heading-s">
                        {header} <span className="text-orange">{header02}</span> {header03}
                    </h1>

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
                        <GlobalBookingRequestPageStep1
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
                            budget={budget}
                            setBudget={setBudget}
                            onContinue={(): void => setStep(1)}
                        />
                    )}

                    {step === 1 && (
                        <GlobalBookingRequestPageStep2
                            categories={categories}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            kitchens={kitchens}
                            selectedKitchen={selectedKitchen}
                            setSelectedKitchen={setSelectedKitchen}
                            allergies={allergies}
                            selectedAllergies={selectedAllergies}
                            setSelectedAllergies={setSelectedAllergies}
                            onContinue={(): void => setStep(2)}
                        />
                    )}

                    {step === 2 && (
                        <GlobalBookingRequestPageStep3
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
                                    ? void createGlobalBookingRequest()
                                          .then(({ data }) =>
                                              setCompletionState(data?.users.globalBookingRequests.success ? 'SUCCESSFUL' : 'FAILED'),
                                          )
                                          .catch(() => setCompletionState('FAILED'))
                                          .finally(() => setLoading(false))
                                    : void createUserWithGlobalBookingRequest()
                                          .then(({ data }) => setCompletionState(data?.users.success ? 'SUCCESSFUL' : 'FAILED'))
                                          .catch(() => setCompletionState('FAILED'))
                                          .finally(() => setLoading(false));
                            }}
                        />
                    )}
                </VStack>

                {isDesktop && (
                    <VStack gap={32} className="w-full" style={{ alignItems: 'flex-start' }}>
                        <Image
                            className="w-full"
                            src={'/picture-1.png'}
                            alt=""
                            width={512}
                            height={512}
                            style={{
                                height: '100%',
                                backgroundPosition: 'center',
                                backgroundSize: 'cover',
                                borderRadius: '16px',
                                alignItems: 'flex-start',
                                boxSizing: 'border-box',
                                maxHeight: '660px',
                            }}
                        />
                        <VStack gap={32} style={{ alignItems: 'flex-start' }}>
                            <h3>{t('booking-global-request-in-price')}</h3>
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

            {completionState === 'SUCCESSFUL' && (
                <Dialog open>
                    <DialogTitle>{t('booking-global-request-pop-up')}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <HStack>
                                <PEIcon icon={Icon.confetti} edgeLength={64} />
                            </HStack>
                        </DialogContentText>
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
