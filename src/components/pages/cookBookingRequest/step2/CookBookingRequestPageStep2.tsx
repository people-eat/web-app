import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import { type Allergy } from '../../../../shared-domain/Allergy';
import { type Category } from '../../../../shared-domain/Category';
import { type Kitchen } from '../../../../shared-domain/Kitchen';
import PEButton from '../../../standard/buttons/PEButton';
import PEDropdown from '../../../standard/dropdown/PEDropdown';
import PESingleSelectDropdown from '../../../standard/dropdown/PESingleSelectDropdown';
import VStack from '../../../utility/vStack/VStack';

export interface CookBookingRequestPageStep2Props {
    categories: Category[];
    selectedCategories: Category[];
    setSelectedCategories: (changedSelectedCategories: Category[]) => void;

    kitchens: Kitchen[];
    selectedKitchen?: Kitchen;
    setSelectedKitchen: (changedSelectedKitchen?: Kitchen) => void;

    allergies: Allergy[];
    selectedAllergies: Allergy[];
    setSelectedAllergies: (changedSelectedAllergies: Allergy[]) => void;

    onContinue: () => void;
}

export default function CookBookingRequestPageStep2({
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
}: CookBookingRequestPageStep2Props): ReactElement {
    const { t } = useTranslation('global-booking-request');

    return (
        <VStack gap={32} className="w-full">
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
        </VStack>
    );
}
