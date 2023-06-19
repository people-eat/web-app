import { useQuery } from '@apollo/client';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useState, type ReactElement } from 'react';
import { FindCookMenuDocument } from '../../../../data-source/generated/graphql';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageEditMenusStep1 from './editMenuStep1/ChefProfilePageEditMenusStep1';
import ChefProfilePageEditMenusStep2 from './editMenuStep2/ChefProfilePageEditMenusStep2';
import ChefProfilePageEditMenusStep3 from './editMenuStep3/ChefProfilePageEditMenusStep3';

interface ChefProfilePageEditMenuProps {
    cookId: string;
    menuId: string;
    onCancel: () => void;
}

// eslint-disable-next-line max-statements
export default function ChefProfilePageEditMenu({ onCancel, cookId, menuId }: ChefProfilePageEditMenuProps): ReactElement {
    const [step, setStep] = useState(0);
    const { data } = useQuery(FindCookMenuDocument, { variables: { menuId, cookId } });

    const [menu] = useState(data?.cooks.menus.findOne);

    // const [description, _setDescription] = useState(menu?.description ?? '');

    // const [currencyCode] = useState<CurrencyCode>('EUR');

    // const [preparationTime, _setPreparationTime] = useState(menu?.preparationTime ?? 60);

    // const [selectedMeals, setSelectedMeals] = useState<MealEntity[]>([]);

    // function handleOnSelectedMeals(meals: MealEntity[]): void {
    //     setSelectedMeals(meals);
    // }

    return (
        <VStack className="w-full relative gap-8" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
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
                {step === 0 && menu && <ChefProfilePageEditMenusStep1 menu={menu} cookId={cookId} />}

                {step === 1 && menu && <ChefProfilePageEditMenusStep2 menu={menu} cookId={cookId} />}

                {step === 2 && menu && <ChefProfilePageEditMenusStep3 menu={menu} cookId={cookId} />}
            </VStack>
        </VStack>
    );
}
