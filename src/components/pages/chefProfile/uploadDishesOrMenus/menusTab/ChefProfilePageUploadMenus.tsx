import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useState, type ReactElement } from 'react';
import VStack from '../../../../utility/vStack/VStack';
import ChefProfilePageUploadMenusStep1 from './step1/ChefProfilePageUploadMenusStep1';

export default function ChefProfilePageUploadMenus(): ReactElement {
    const [step, setStep] = useState(0);

    return (
        <VStack
            className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-6"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <VStack className="w-full mb-6" style={{ alignItems: 'flex-start' }}>
                <p className="w-full text-heading-xl my-0 mb-2">Adding a new menu</p>
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
            </VStack>

            {step === 0 && <ChefProfilePageUploadMenusStep1 />}

            {step === 1 && <ChefProfilePageUploadMenusStep1 />}

            {step === 2 && <ChefProfilePageUploadMenusStep1 />}
        </VStack>
    );
}
