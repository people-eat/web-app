import { useMutation, useQuery } from '@apollo/client';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { CreateOneCookMenuDocument, GetCreateMenuPageDataDocument, type CurrencyCode } from '../../../../../data-source/generated/graphql';
import { type Category } from '../../../../../shared/Category';
import { type Kitchen } from '../../../../../shared/Kitchen';
import { Icon } from '../../../../standard/icon/Icon';
import PEIconButton from '../../../../standard/iconButton/PEIconButton';
import VStack from '../../../../utility/vStack/VStack';
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
    const { t } = useTranslation('chef-profile');

    const [step, setStep] = useState(0);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // in cents: 10000 -> 100.00 EUR
    const [basePrice, setBasePrice] = useState(10000);
    const [basePriceCustomers, setBasePriceCustomers] = useState(2);
    const [pricePerAdult, setPricePerAdult] = useState(5000);
    const [pricePerChild, setPricePerChild] = useState<undefined | number>(undefined);
    const [currencyCode] = useState<CurrencyCode>('EUR');

    const [greetingFromKitchen, setGreetingFromKitchen] = useState<string | undefined>();
    const [preparationTime, setPreparationTime] = useState(60);
    const [isVisible, setIsVisible] = useState(true);

    const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | undefined>(undefined);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

    const [courses, setCourses] = useState<CreateCookMenuCourseDto[]>([]);

    const [createMenu, { data }] = useMutation(CreateOneCookMenuDocument);

    if (data?.cooks.menus.success) onSuccess();

    const { data: lists } = useQuery(GetCreateMenuPageDataDocument);

    const kitchens = lists?.kitchens.findAll ?? [];
    const categories = lists?.categories.findAll ?? [];

    return (
        <VStack className="w-full relative gap-8" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack
                className="w-full relative bg-white shadow-primary md:shadow-none p-8 md:p-0 rounded-4 gap-6"
                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <div className="absolute top-8 right-8 md:top-0 md:right-0">
                    <PEIconButton icon={Icon.close} onClick={onCancel} withoutShadow bg="white" iconSize={24} />
                </div>

                <VStack className="w-full mb-6" style={{ alignItems: 'flex-start' }}>
                    <p className="w-full text-heading-xl md:text-heading-s my-0 mb-6">{t('create-menu-headline')}</p>
                    <Stepper activeStep={step}>
                        <Step>
                            <StepLabel onClick={(): void => setStep(0)}>{t('create-menu-step-1')}</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel onClick={(): void => setStep(1)}>{t('create-menu-step-2')}</StepLabel>
                        </Step>
                        <Step>
                            <StepLabel onClick={(): void => setStep(2)}>{t('create-menu-step-3')}</StepLabel>
                        </Step>
                    </Stepper>
                </VStack>

                {step === 0 && (
                    <ChefProfilePageCreateMenusStep1
                        title={title}
                        setTitle={setTitle}
                        categories={categories}
                        selectedCategories={selectedCategories}
                        setSelectedCategories={setSelectedCategories}
                        kitchens={kitchens}
                        selectedKitchen={selectedKitchen}
                        setSelectedKitchen={setSelectedKitchen}
                        onContinue={(): void => setStep(1)}
                    />
                )}

                {step === 1 && (
                    <ChefProfilePageCreateMenusStep2
                        cookId={cookId}
                        description={description}
                        setDescription={setDescription}
                        greetingFromKitchen={greetingFromKitchen}
                        setGreetingFromKitchen={setGreetingFromKitchen}
                        courses={courses}
                        setCourses={setCourses}
                        onContinue={(): void => setStep(2)}
                    />
                )}

                {step === 2 && (
                    <ChefProfilePageCreateMenusStep3
                        currencyCode={currencyCode}
                        basePrice={basePrice}
                        setBasePrice={setBasePrice}
                        basePriceCustomers={basePriceCustomers}
                        setBasePriceCustomers={setBasePriceCustomers}
                        pricePerAdult={pricePerAdult}
                        setPricePerAdult={setPricePerAdult}
                        pricePerChild={pricePerChild}
                        setPricePerChild={setPricePerChild}
                        preparationTime={preparationTime}
                        setPreparationTime={setPreparationTime}
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
                                            mealOptions: course.mealOptions.map(({ mealId }, mealIndex) => ({ index: mealIndex, mealId })),
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
