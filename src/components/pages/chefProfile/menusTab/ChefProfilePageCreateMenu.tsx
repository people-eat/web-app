import { useMutation } from '@apollo/client';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useState, type ReactElement } from 'react';
import { CreateOneCookMenuDocument, type CurrencyCode } from '../../../../data-source/generated/graphql';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import VStack from '../../../utility/vStack/VStack';
import { type MealEntity } from './ChefProfilePageMenusTab';
import ChefProfilePageCreateMenusStep1 from './createMenuStep1/ChefProfilePageCreateMenusStep1';
import ChefProfilePageCreateMenusStep2 from './createMenuStep2/ChefProfilePageCreateMenuStep2';
import ChefProfilePageCreateMenusPreviewStep2 from './createMenuStep2/ChefProfilePageCreateMenusPreviewStep2';
import ChefProfilePageCreateMenusStep3 from './createMenuStep3/ChefProfilePageCreateMenuStep3';

interface ChefProfilePageCreateMenuProps {
    cookId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

// eslint-disable-next-line max-statements
export default function ChefProfilePageCreateMenu({ onCancel, cookId, onSuccess }: ChefProfilePageCreateMenuProps): ReactElement {
    const [step, setStep] = useState(0);

    const [title, _setTitle] = useState('');
    const [description, _setDescription] = useState('');

    // in cents: 10000 -> 100.00 EUR
    const [basePrice, _setBasePrice] = useState(10000);
    const [basePriceCustomers, _setBasePriceCustomers] = useState(2);
    const [pricePerAdult, _setPricePerAdult] = useState(5000);
    const [pricePerChild, _setPricePerChild] = useState<undefined | number>(undefined);
    const [currencyCode, _setCurrencyCode] = useState<CurrencyCode>('EUR');

    const [greetingFromKitchen, _setGreetingFromKitchen] = useState(false);
    const [isVisible, _setIsVisible] = useState(true);
    const [preparationTime, _setPreparationTime] = useState(60);

    const [selectedKitchen, _setSelectedKitchen] = useState<{ kitchenId: string; title: string } | undefined>(undefined);
    const [selectedCategories, _setSelectedCategories] = useState<{ categoryId: string; title: string }[]>([]);

    const [selectedMeals, setSelectedMeals] = useState<MealEntity[]>([]);

    function handleOnSelectedMeals(meals: MealEntity[]): void {
        setSelectedMeals(meals);
    }

    const [createMenu] = useMutation(CreateOneCookMenuDocument);

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
                {step === 0 && <ChefProfilePageCreateMenusStep1 />}

                {step === 1 && <ChefProfilePageCreateMenusStep2 cookId={cookId} onSelectedMeals={handleOnSelectedMeals} />}

                {step === 2 && <ChefProfilePageCreateMenusStep3 />}
            </VStack>

            {step === 1 && (
                <VStack
                    className="w-full relative bg-white shadow-primary box-border p-8 rounded-4 gap-6"
                    style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ChefProfilePageCreateMenusPreviewStep2 selectedMeals={selectedMeals} />
                </VStack>
            )}

            <PEButton
                title="Demo Create"
                onClick={(): void => {
                    onSuccess();
                    void createMenu({
                        variables: {
                            cookId,
                            menu: {
                                title,
                                description,
                                basePrice,
                                basePriceCustomers,
                                pricePerAdult,
                                pricePerChild,
                                currencyCode,
                                greetingFromKitchen,
                                isVisible,
                                preparationTime,
                                kitchenId: selectedKitchen?.kitchenId,
                                categoryIds: selectedCategories.map(({ categoryId }) => categoryId),

                                // The big todo:
                                courses: [],
                            },
                        },
                    });
                }}
            />
        </VStack>
    );
}
