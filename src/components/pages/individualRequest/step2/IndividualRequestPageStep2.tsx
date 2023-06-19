import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import PEDropdown from '../../../standard/dropdown/PEDropdown';
import PESingleSelectDropdown from '../../../standard/dropdown/PESingleSelectDropdown';
import VStack from '../../../utility/vStack/VStack';

export interface IndividualRequestPageStepTwoProps {
    categories: { categoryId: string; title: string }[];
    selectedCategories: { categoryId: string; title: string }[];
    setSelectedCategories: (changedSelectedCategories: { categoryId: string; title: string }[]) => void;

    kitchens: { kitchenId: string; title: string }[];
    selectedKitchen?: { kitchenId: string; title: string };
    setSelectedKitchen: (changedSelectedKitchen?: { kitchenId: string; title: string }) => void;

    allergies: { allergyId: string; title: string }[];

    selectedAllergies: { allergyId: string; title: string }[];
    setSelectedAllergies: (changedSelectedAllergies: { allergyId: string; title: string }[]) => void;

    onContinue: () => void;
}

export default function IndividualRequestPageStep2({
    categories,
    selectedCategories,
    setSelectedCategories,
    kitchens,
    selectedKitchen,
    setSelectedKitchen,
    allergies,
    selectedAllergies,
    setSelectedAllergies,
    onContinue,
}: IndividualRequestPageStepTwoProps): ReactElement {
    const { t } = useTranslation('individual-request');

    return (
        <>
            <VStack className="w-full gap-4" style={{ alignItems: 'flex-start' }}>
                <h3>{t('preferences-label')}</h3>

                <PEDropdown
                    title={t('categories-label')}
                    defaultExpanded
                    options={categories}
                    getOptionLabel={(category): string => category.title}
                    optionsEqual={(categoryA, categoryB): boolean => categoryA.categoryId === categoryB.categoryId}
                    setSelectedOptions={setSelectedCategories}
                    showSelectedCount
                    selectedOptions={selectedCategories}
                />

                <PESingleSelectDropdown
                    title={t('kitchen-label')}
                    options={kitchens}
                    getOptionLabel={(kitchen): string => kitchen.title}
                    optionsEqual={(kitchenA, kitchenB): boolean => kitchenA.kitchenId === kitchenB.kitchenId}
                    selectedOption={selectedKitchen}
                    setSelectedOption={setSelectedKitchen}
                    defaultExpanded
                />

                <PEDropdown
                    title={t('allergies-label')}
                    defaultExpanded
                    options={allergies}
                    getOptionLabel={(allergy): string => allergy.title}
                    optionsEqual={(allergyA, allergyB): boolean => allergyA.allergyId === allergyB.allergyId}
                    setSelectedOptions={setSelectedAllergies}
                    showSelectedCount
                    selectedOptions={selectedAllergies}
                />
            </VStack>

            <PEButton onClick={onContinue} title={t('continue-label')} />
        </>
    );
}
