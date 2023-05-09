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
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { CreateOneAnonymousGlobalBookingRequestDocument } from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';
import { type SignedInUser } from '../../../shared/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import { header, header02, header03 } from './points.mock';
import IndividualRequestPageStep1 from './step1/IndividualRequestPageStep1';
import IndividualRequestPageStep2 from './step2/IndividualRequestPageStep2';
import IndividualRequestPageStep3 from './step3/IndividualRequestPageStep3';

export interface IndividualRequestPageProps {
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
    categories: { categoryId: string; title: string }[];
    allergies: { allergyId: string; title: string }[];
    kitchens: { kitchenId: string; title: string }[];
}

// eslint-disable-next-line max-statements
export default function IndividualRequestPage({
    signedInUser,
    searchParameters,
    categories,
    allergies,
    kitchens,
}: IndividualRequestPageProps): ReactElement {
    const { t } = useTranslation('individual-request');
    const { isDesktop } = useResponsive();

    const [step, setStep] = useState(0);

    const [addressSearchText, setAddressSearchText] = useState<string>(searchParameters.location.address);

    const [adults, setAdults] = useState(searchParameters.adults);
    const [children, setChildren] = useState(searchParameters.children);
    const [dateTime, setDateTime] = useState(moment(searchParameters.date).set('hours', 12).set('minutes', 0));

    const [occasion, setOccasion] = useState('');
    const [budget, setBudget] = useState('');
    const [message, setMessage] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);

    const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false);
    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);

    const [createOneAnonymousGlobalBookingRequest, { data, loading, error }] = useMutation(CreateOneAnonymousGlobalBookingRequestDocument, {
        variables: {
            input: {
                adults: adults,
                budget: budget,
                children: children,
                customerEmailAddress: email,
                customerFirstName: firstName,
                customerLastName: lastName,
                customerPhoneNumber: phoneNumber.length > 4 ? phoneNumber.replaceAll(' ', '') : null,
                dateTime: dateTime.toDate(),
                locationName: addressSearchText,
                message: message,
                occasion: occasion,
            },
        },
    });

    return (
        <VStack gap={32} className="w-full min-h-screen" style={{ justifyContent: 'space-between' }}>
            <PEHeader signedInUser={signedInUser} />

            <HStack gap={32} className="w-full max-w-screen-xl" style={{ justifyContent: 'space-between' }}>
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
                        <IndividualRequestPageStep1
                            adultCount={adults}
                            setAdultCount={setAdults}
                            childrenCount={children}
                            setChildrenCount={setChildren}
                            addressSearchText={addressSearchText}
                            setAddressSearchText={setAddressSearchText}
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
                        <IndividualRequestPageStep2
                            categories={categories}
                            onSelectCategoryId={(): void => undefined}
                            allergies={allergies}
                            onSelectAllergyId={(): void => undefined}
                            kitchens={kitchens}
                            onSelectKitchenId={(): void => undefined}
                            onContinue={(): void => setStep(2)}
                        />
                    )}

                    {step === 2 && (
                        <IndividualRequestPageStep3
                            firstName={firstName}
                            setFirstName={setFirstName}
                            lastName={lastName}
                            setLastName={setLastName}
                            email={email}
                            setEmail={setEmail}
                            emailIsValid={emailIsValid}
                            setEmailIsValid={setEmailIsValid}
                            phoneNumber={phoneNumber}
                            setPhoneNumber={setPhoneNumber}
                            phoneNumberIsValid={phoneNumberIsValid}
                            setPhoneNumberIsValid={setPhoneNumberIsValid}
                            acceptedPrivacyPolicy={acceptedPrivacyPolicy}
                            setAcceptedPrivacyPolicy={setAcceptedPrivacyPolicy}
                            acceptedTermsAndConditions={acceptedTermsAndConditions}
                            setAcceptedTermsAndConditions={setAcceptedTermsAndConditions}
                            message={message}
                            setMessage={setMessage}
                            onContinue={(): void => void createOneAnonymousGlobalBookingRequest()}
                        />
                    )}
                </VStack>

                {isDesktop && (
                    <VStack
                        className="w-full max-w-[45%] max-h-[660px]"
                        style={{
                            backgroundImage: 'url(/picture-1.png)',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            borderRadius: '16px',
                            alignItems: 'flex-start',
                            boxSizing: 'border-box',
                        }}
                    />
                )}
            </HStack>

            {data?.success && (
                <Dialog open>
                    <DialogTitle>Thank you! Your order was successfully submitted.</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <HStack>
                                <PEIcon icon={Icon.confetti} edgeLength={64} />
                            </HStack>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Link href="/">
                            <Button autoFocus>Back home</Button>
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

            {(error || (data && !data.success)) && (
                <Dialog open>
                    <DialogContent>An error ocurred</DialogContent>
                </Dialog>
            )}

            <PEFooter />
        </VStack>
    );
}
