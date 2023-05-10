import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import PEDropdown from '../../../standard/dropdown/PEDropdown';
import VStack from '../../../utility/vStack/VStack';

export interface IndividualRequestPageStepTwoProps {
    categories: { categoryId: string; title: string }[];
    onSelectCategoryId: (selectedCategoryId: string) => void;
    allergies: { allergyId: string; title: string }[];
    onSelectAllergyId: (selectedAllergyId: string) => void;
    kitchens: { kitchenId: string; title: string }[];
    onSelectKitchenId: (selectedKitchenId: string) => void;
    onContinue: () => void;
}

export default function IndividualRequestPageStep2({
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
                <PEDropdown
                    title="Categories"
                    defaultExpanded={true}
                    options={categories}
                    getOptionLabel={(category): string => category.title}
                    onSelectedOptionsChange={undefined}
                />
                <PEDropdown
                    title="Cuisines"
                    defaultExpanded={true}
                    options={kitchens}
                    getOptionLabel={(kitchen): string => kitchen.title}
                    onSelectedOptionsChange={undefined}
                />
                <PEDropdown
                    title="Allergies"
                    defaultExpanded={true}
                    options={allergies}
                    getOptionLabel={(allergy): string => allergy.title}
                    onSelectedOptionsChange={undefined}
                />
            </VStack>

            <PEButton onClick={onContinue} title="Continue" />
        </>
    );
}
