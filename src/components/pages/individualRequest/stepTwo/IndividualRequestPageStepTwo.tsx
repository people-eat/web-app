import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import PEDropdown from '../../../standard/dropdown/PEDropdown';
import VStack from '../../../utility/vStack/VStack';

export interface IndividualRequestPageStepTwoProps {
    categories: { categoryId: string; title: string }[];
    selectedCategoryIds: string[];
    onSelectCategoryId: (selectedCategoryId: string) => void;
    allergies: { allergyId: string; title: string }[];
    selectedAllergyIds: string[];
    onSelectAllergyId: (selectedAllergyId: string) => void;
    kitchens: { kitchenId: string; title: string }[];
    selectedKitchenIds: string[];
    onSelectKitchenId: (selectedKitchenId: string) => void;
    onContinue: () => void;
}

export default function IndividualRequestPageStepTwo({
    categories,
    // selectedCategoryIds,
    // onSelectCategoryId,
    allergies,
    // selectedAllergyIds,
    // onSelectAllergyId,
    kitchens,
    // selectedKitchenIds,
    // onSelectKitchenId,
    onContinue,
}: IndividualRequestPageStepTwoProps): ReactElement {
    return (
        <>
            <VStack className="w-full gap-4" style={{ alignItems: 'flex-start' }}>
                <h3>Preferences</h3>
                <PEDropdown title="Category" items={categories.map(({ title }) => title)} />
                <PEDropdown title="Cuisine" items={kitchens.map(({ title }) => title)} />
                <PEDropdown title="Allergy" items={allergies.map(({ title }) => title)} />
            </VStack>

            <PEButton onClick={onContinue} title="Continue" />
        </>
    );
}
