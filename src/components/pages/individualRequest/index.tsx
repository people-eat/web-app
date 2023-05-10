import { Step, StepLabel } from '@mui/material';
import Stepper from '@mui/material/Stepper';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEButton from '../../standard/buttons/PEButton';
import PEDropdown from '../../standard/dropdown/PEDropdown';
import VStack from '../../utility/vStack/VStack';
import IndividualRequestPageStepOne from './stepOne/IndividualRequestPageStepOne';

export interface IndividualRequestPageProps {
    categories: { categoryId: string; title: string }[];
    allergies: { allergyId: string; title: string }[];
    kitchens: { kitchenId: string; title: string }[];
}

export default function IndividualRequestPage({ categories, allergies, kitchens }: IndividualRequestPageProps): ReactElement {
    const { t } = useTranslation('common');
    const { query } = useRouter();

    const [step, setStep] = useState(0);

    const adultCountFromQueryParams: number = Number(query.adultCount);
    const childrenCountFromQueryParams: number = Number(query.adultCount);

    const [adultCount, setAdultCount] = useState(Number.isNaN(adultCountFromQueryParams) ? 4 : adultCountFromQueryParams);
    const [childrenCount, setChildrenCount] = useState(Number.isNaN(childrenCountFromQueryParams) ? 4 : childrenCountFromQueryParams);
    const [date, setDate] = useState(moment());
    const [occasion, setOccasion] = useState('');
    const [budget, setBudget] = useState('');
    const [message, setMessage] = useState('');

    const [addressSearchText, setAddressSearchText] = useState<string>(
        typeof query.addressSearchText === 'string' ? query.addressSearchText : '',
    );

    return (
        <VStack className="w-full" style={{ gap: 80 }}>
            <PEHeader />

            <VStack className="w-full max-w-screen-xl" style={{ gap: 32, alignItems: 'flex-start' }}>
                <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg">{t('Individual Request in 3 steps')}</h1>

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
                        <PEButton onClick={(): void => setStep(2)} title="Send Request" />
                    </>
                )}
            </VStack>

            <PEFooter />
        </VStack>
    );
}
