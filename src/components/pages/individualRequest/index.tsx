import { useMutation } from '@apollo/client';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
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
import PEButton from '../../standard/buttons/PEButton';
import PECheckbox from '../../standard/checkbox/PECheckbox';
import PEDropdown from '../../standard/dropdown/PEDropdown';
import PEEmailTextField from '../../standard/textFields/PEEmailTextField';
import PEPhoneNumberTextField from '../../standard/textFields/PEPhoneNumberTextField';
import PETextField from '../../standard/textFields/PETextField';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import IndividualRequestPageStepOne from './stepOne/IndividualRequestPageStepOne';

export interface IndividualRequestPageProps {
    categories: { categoryId: string; title: string }[];
    allergies: { allergyId: string; title: string }[];
    kitchens: { kitchenId: string; title: string }[];
}

// eslint-disable-next-line max-statements
export default function IndividualRequestPage({ categories, allergies, kitchens }: IndividualRequestPageProps): ReactElement {
    const { t } = useTranslation('common');
    const { isMobile, isDesktop } = useResponsive();
    const { query } = useRouter();

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
    const [phoneNumber, setPhoneNumber] = useState('');

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
                customerPhoneNumber: null,
                dateTime: new Date(),
                locationName: addressSearchText,
                message: message,
                occasion: occasion,
            },
        },
    });

    return (
        <VStack gap={32} className="w-full min-h-screen">
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
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <VStack className="w-full gap-4" style={{ alignItems: 'flex-start' }}>
                                <h3>Preferences</h3>
                                <PEDropdown title="Category" items={categories.map(({ title }) => title)} />
                                <PEDropdown title="Cuisine" items={kitchens.map(({ title }) => title)} />
                                <PEDropdown title="Allergy" items={allergies.map(({ title }) => title)} />
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
                                            <PECheckbox
                                                checked={acceptedTermsAndConditions}
                                                onCheckedChange={setAcceptedTermsAndConditions}
                                            />
                                        }
                                        label="I have read and accept the Terms and Conditions"
                                    />
                                </FormGroup>
                            </VStack>

                            <PEButton onClick={(): any => createOneAnonymousGlobalBookingRequest()} title="Send Request" />
                        </>
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
                <DialogTitle id="responsive-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {loading && <>Loading...</>}
                        {error && <>An error occurred</>}
                        {data?.success ? 'Thank you! Your order was successfully submitted.' : 'An error occurred, please try again.'}
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
