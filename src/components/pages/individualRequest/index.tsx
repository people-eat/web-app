import { useMutation } from '@apollo/client';
import { FormControlLabel, FormGroup, Step, StepLabel } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import moment from 'moment';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import { CreateOneAnonymousGlobalBookingRequestDocument } from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEHeaderMobile from '../../header/PEHeaderMobile';
import PEButton from '../../standard/buttons/PEButton';
import PECheckbox from '../../standard/checkbox/PECheckbox';
import PEDropdown from '../../standard/dropdown/PEDropdown';
import PEEmailTextField from '../../standard/textFields/PEEmailTextField';
import PEPhoneNumberTextField from '../../standard/textFields/PEPhoneNumberTextField';
import PETextField from '../../standard/textFields/PETextField';
import VStack from '../../utility/vStack/VStack';
import IndividualRequestPageStepOne from './stepOne/IndividualRequestPageStepOne';

export interface IndividualRequestPageProps {
    categories: { categoryId: string; title: string }[];
    allergies: { allergyId: string; title: string }[];
    kitchens: { kitchenId: string; title: string }[];
}

// eslint-disable-next-line max-statements
export default function IndividualRequestPage({ categories, allergies, kitchens }: IndividualRequestPageProps): ReactElement {
    // const { t } = useTranslation('common');
    const { isMobile } = useResponsive();
    const { query } = useRouter();

    const [step, setStep] = useState(0);

    const adultCountFromQueryParams: number = Number(query.adultCount);
    const childrenCountFromQueryParams: number = Number(query.childrenCount);

    const [adultCount, setAdultCount] = useState(Number.isNaN(adultCountFromQueryParams) ? 4 : adultCountFromQueryParams);
    const [childrenCount, setChildrenCount] = useState(Number.isNaN(childrenCountFromQueryParams) ? 0 : childrenCountFromQueryParams);
    const [date, setDate] = useState(moment());
    const [occasion, setOccasion] = useState('');
    const [budget, setBudget] = useState('');
    const [message, setMessage] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [acceptedTermsAndConditions, setAcceptedTermsAndConditions] = useState(false);
    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);

    const [addressSearchText, setAddressSearchText] = useState<string>(
        typeof query.addressSearchText === 'string' ? query.addressSearchText : '',
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
                customerPhoneNumber: null,
                dateTime: new Date(),
                locationName: addressSearchText,
                message: message,
                occasion: occasion,
            },
        },
    });

    if (loading) return <>Loading...</>;

    // eslint-disable-next-line no-alert
    if (error) alert('An error occurred');

    // eslint-disable-next-line no-alert
    if (data) alert(data.success ? 'Thank you! Your order was successfully submitted.' : 'An error occurred, please try again.');

    return (
        <VStack gap={64} className="w-full">
            {isMobile ? <PEHeaderMobile /> : <PEHeader />}

            <VStack gap={32} className="w-full max-w-screen-xl" style={{ alignItems: 'flex-start' }}>
                <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg">{'Individual Request in 3 steps'}</h1>

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
                    <>
                        <IndividualRequestPageStepOne
                            adultCount={adultCount}
                            setAdultCount={setAdultCount}
                            childrenCount={childrenCount}
                            setChildrenCount={setChildrenCount}
                            addressSearchText={addressSearchText}
                            setAddressSearchText={setAddressSearchText}
                            date={date}
                            setDate={setDate}
                            occasion={occasion}
                            setOccasion={setOccasion}
                            budget={budget}
                            setBudget={setBudget}
                            message={message}
                            setMessage={setMessage}
                            onContinue={(): void => setStep(1)}
                        />
                    </>
                )}

                {step === 1 && (
                    <>
                        <VStack className="w-full gap-4" style={{ alignItems: 'flex-start' }}>
                            <h3>Preferences</h3>
                            <PEDropdown items={allergies.map(({ title }) => title)} />
                            <PEDropdown items={categories.map(({ title }) => title)} />
                            <PEDropdown items={kitchens.map(({ title }) => title)} />
                        </VStack>

                        <PEButton onClick={(): void => setStep(2)} title="Continue" />
                    </>
                )}

                {step === 2 && (
                    <>
                        <PETextField value={firstName} onChange={setFirstName} type="text" placeholder="First Name" />
                        <PETextField value={lastName} onChange={setLastName} type="text" placeholder="Last Name" />
                        <PEEmailTextField email={email} onChange={setEmail} placeholder="Email" />
                        <PEPhoneNumberTextField phoneNumber={phoneNumber} onChange={setPhoneNumber} placeholder="Phone Number" />

                        <VStack
                            className="w-full"
                            style={{
                                alignItems: 'flex-start',
                                padding: '16px',
                                border: '1px solid rgba(31, 31, 31, 0.2)',
                                boxSizing: 'border-box',
                                borderRadius: '16px',
                            }}
                        >
                            <FormGroup>
                                <FormControlLabel
                                    sx={{ '& span': { fontSize: '14px' } }}
                                    control={<PECheckbox checked={acceptedPrivacyPolicy} onCheckedChange={setAcceptedPrivacyPolicy} />}
                                    label="I have read and accept the Privacy Policy"
                                />
                            </FormGroup>
                            <FormGroup>
                                <FormControlLabel
                                    sx={{ '& span': { fontSize: '14px' } }}
                                    control={
                                        <PECheckbox checked={acceptedTermsAndConditions} onCheckedChange={setAcceptedTermsAndConditions} />
                                    }
                                    label="I have read and accept the Terms and Conditions"
                                />
                            </FormGroup>
                        </VStack>

                        <PEButton onClick={(): any => createOneAnonymousGlobalBookingRequest()} title="Send Request" />
                    </>
                )}
            </VStack>

            <PEFooter />
        </VStack>
    );
}
