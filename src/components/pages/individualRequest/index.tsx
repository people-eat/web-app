import { useMutation } from '@apollo/client';
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Step,
    StepLabel,
} from '@mui/material';
import Stepper from '@mui/material/Stepper';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import { CreateOneAnonymousGlobalBookingRequestDocument } from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEHeaderMobile from '../../header/PEHeaderMobile';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import IndividualRequestPageStep1 from './step1/IndividualRequestPageStep1';
import IndividualRequestPageStep2 from './step2/IndividualRequestPageStep2';
import IndividualRequestPageStep3 from './step3/IndividualRequestPageStep3';

export interface IndividualRequestPageProps {
    categories: { categoryId: string; title: string }[];
    allergies: { allergyId: string; title: string }[];
    kitchens: { kitchenId: string; title: string }[];
}

// eslint-disable-next-line max-statements
export default function IndividualRequestPage({ categories, allergies, kitchens }: IndividualRequestPageProps): ReactElement {
    const { t } = useTranslation('common');
    const { isMobile, isDesktop } = useResponsive();
    const router = useRouter();

    const [step, setStep] = useState(0);

    const adultCountFromQueryParams: number = Number(router.query.adultCount);
    const childrenCountFromQueryParams: number = Number(router.query.childrenCount);

    const [adultCount, setAdultCount] = useState(Number.isNaN(adultCountFromQueryParams) ? 4 : adultCountFromQueryParams);
    const [childrenCount, setChildrenCount] = useState(Number.isNaN(childrenCountFromQueryParams) ? 0 : childrenCountFromQueryParams);
    const [date, setDate] = useState(moment());
    const [time, setTime] = useState(moment());
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

    const [addressSearchText, setAddressSearchText] = useState<string>(
        typeof router.query.addressSearchText === 'string' ? router.query.addressSearchText : '',
    );

    const [createOneAnonymousGlobalBookingRequest, { data, loading, error }] = useMutation(CreateOneAnonymousGlobalBookingRequestDocument, {
        variables: {
            input: {
                adults: adultCount,
                budget: budget,
                children: childrenCount,
                customerEmailAddress: email,
                customerFirstName: firstName,
                customerLastName: lastName,
                customerPhoneNumber: phoneNumber.length > 4 ? phoneNumber.replaceAll(' ', '') : null,
                dateTime: new Date(),
                locationName: addressSearchText,
                message: message,
                occasion: occasion,
            },
        },
    });

    return (
        <VStack gap={32} className="w-full min-h-screen" style={{ justifyContent: 'space-between' }}>
            {isMobile ? <PEHeaderMobile /> : <PEHeader />}

            <HStack gap={32} className="w-full max-w-screen-xl" style={{ justifyContent: 'space-between' }}>
                <VStack
                    gap={32}
                    className="w-full relative max-w-[45%] lg:max-w-full lg:p-4 lg:box-border"
                    style={{ alignItems: 'flex-start' }}
                >
                    <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg lg:text-heading-s">{t('Individual Request in 3 steps')}</h1>

                    <Stepper activeStep={step}>
                        <Step>
                            <StepLabel onClick={(): void => setStep(0)}>Step 1</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel onClick={(): void => setStep(1)}>Step 2</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel onClick={(): void => setStep(2)}>Step 3</StepLabel>
                        </Step>
                    </Stepper>

                    {step === 0 && (
                        <IndividualRequestPageStep1
                            adultCount={adultCount}
                            setAdultCount={setAdultCount}
                            childrenCount={childrenCount}
                            setChildrenCount={setChildrenCount}
                            addressSearchText={addressSearchText}
                            setAddressSearchText={setAddressSearchText}
                            date={date}
                            setDate={setDate}
                            time={time}
                            setTime={setTime}
                            occasion={occasion}
                            setOccasion={setOccasion}
                            budget={budget}
                            setBudget={setBudget}
                            message={message}
                            setMessage={setMessage}
                            onContinue={(): void => setStep(1)}
                        />
                    )}

                    {step === 1 && (
                        <IndividualRequestPageStep2
                            categories={categories}
                            selectedCategoryIds={[]}
                            onSelectCategoryId={(): void => undefined}
                            allergies={allergies}
                            selectedAllergyIds={[]}
                            onSelectAllergyId={(): void => undefined}
                            kitchens={kitchens}
                            selectedKitchenIds={[]}
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
                            onContinue={(): any => createOneAnonymousGlobalBookingRequest()}
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

            <Dialog open={Boolean(data)}>
                <DialogTitle>
                    {loading && <>Loading...</>}
                    {(error || !data?.success) && <>An error occurred</>}
                    {data?.success && <>Thank you! Your order was successfully submitted.</>}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {loading && (
                            <HStack>
                                <CircularProgress />
                            </HStack>
                        )}
                        {(error || !data?.success) && <>Please try again.</>}
                        {data?.success && <>Thank you! Your order was successfully submitted.</>}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={(): void => {
                            router
                                .push({ pathname: '/' })
                                .then()
                                .catch((err) => console.error(err));
                        }}
                        autoFocus
                    >
                        Back home
                    </Button>
                </DialogActions>
            </Dialog>

            <PEFooter />
        </VStack>
    );
}
