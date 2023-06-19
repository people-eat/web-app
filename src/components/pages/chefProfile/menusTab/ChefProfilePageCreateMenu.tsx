import { useMutation } from '@apollo/client';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { useState, type ReactElement } from 'react';
import { CreateOneCookMenuDocument, type CurrencyCode } from '../../../../data-source/generated/graphql';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import VStack from '../../../utility/vStack/VStack';
import ChefProfilePageCreateMenusStep1 from './createMenuStep1/ChefProfilePageCreateMenusStep1';
import ChefProfilePageCreateMenusStep2 from './createMenuStep2/ChefProfilePageCreateMenuStep2';
import { type CreateCookMenuCourseDto } from './createMenuStep2/CreateCookMenuCourse';
import ChefProfilePageCreateMenusStep3 from './createMenuStep3/ChefProfilePageCreateMenuStep3';

interface ChefProfilePageCreateMenuProps {
    cookId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

// eslint-disable-next-line max-statements
export default function ChefProfilePageCreateMenu({ onCancel, cookId, onSuccess }: ChefProfilePageCreateMenuProps): ReactElement {
    const [step, setStep] = useState(0);

    const [title, setTitle] = useState('');
    // currently not in use
    const [description] = useState('');

    // in cents: 10000 -> 100.00 EUR
    const [basePrice, setBasePrice] = useState(10000);
    const [basePriceCustomers, setBasePriceCustomers] = useState(2);
    const [pricePerAdult, setPricePerAdult] = useState(5000);
    const [pricePerChild, setPricePerChild] = useState<undefined | number>(undefined);
    const [currencyCode] = useState<CurrencyCode>('EUR');

    const [greetingFromKitchen, setGreetingFromKitchen] = useState<string | undefined>();
    const [isVisible, setIsVisible] = useState(true);
    // currently not in use
    const [preparationTime] = useState(60);

    const [selectedKitchen, setSelectedKitchen] = useState<{ kitchenId: string; title: string } | undefined>(undefined);
    const [selectedCategories, setSelectedCategories] = useState<{ categoryId: string; title: string }[]>([]);

    const [courses, setCourses] = useState<CreateCookMenuCourseDto[]>([]);

    const [createMenu, { data }] = useMutation(CreateOneCookMenuDocument);

    if (data?.cooks.menus.success) onSuccess();

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

                {step === 0 && (
                    <ChefProfilePageCreateMenusStep1
                        title={title}
                        setTitle={setTitle}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        selectedKitchen={selectedKitchen}
                        setSelectedKitchen={setSelectedKitchen}
                        onContinue={(): void => setStep(1)}
                    />
                )}

                {step === 1 && (
                    <ChefProfilePageCreateMenusStep2
                        cookId={cookId}
                        greetingFromKitchen={greetingFromKitchen}
                        setGreetingFromKitchen={setGreetingFromKitchen}
                        courses={courses}
                        setCourses={setCourses}
                        onContinue={(): void => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <ChefProfilePageCreateMenusStep3
                        basePrice={basePrice}
                        setBasePrice={setBasePrice}
                        basePriceCustomers={basePriceCustomers}
                        setBasePriceCustomers={setBasePriceCustomers}
                        pricePerAdult={pricePerAdult}
                        setPricePerAdult={setPricePerAdult}
                        pricePerChild={pricePerChild}
                        setPricePerChild={setPricePerChild}
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                        onComplete={(): void =>
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
                                        courses: courses.map((course, index) => ({
                                            index,
                                            title: course.title,
                                            mealOptions: course.meals.map(({ mealId }, mealIndex) => ({ index: mealIndex, mealId })),
                                        })),
                                    },
                                },
                            })
                        }
                    />
                )}
            </VStack>
        </VStack>
    );
}
