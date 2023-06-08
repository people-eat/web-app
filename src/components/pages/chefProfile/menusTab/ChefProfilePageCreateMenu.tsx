import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useState, type ReactElement } from 'react';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMenusStep1 from './createMenuStep1/ChefProfilePageCreateMenusStep1';

interface ChefProfilePageCreateMenuProps {
    cookId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ChefProfilePageCreateMenu({ onCancel }: ChefProfilePageCreateMenuProps): ReactElement {
    const [step, setStep] = useState(0);

    return (
        <VStack
            className="w-full relative bg-white shadow-primary box-border p-8 rounded-4 gap-6"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <div className="absolute top-8 right-8">
                <PEIconButton icon={Icon.close} onClick={onCancel} withoutShadow bg="white" iconSize={24} />
            </div>
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

            {step === 0 && <ChefProfilePageCreateMenusStep1 />}

            {step === 1 && <ChefProfilePageCreateMenusStep1 />}

            {step === 2 && <ChefProfilePageCreateMenusStep1 />}
        </VStack>
    );
}
