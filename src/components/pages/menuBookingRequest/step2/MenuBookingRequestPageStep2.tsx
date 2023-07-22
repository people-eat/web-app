import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import { type Allergy } from '../../../../shared-domain/Allergy';
import PEButton from '../../../standard/buttons/PEButton';
import PEDropdown from '../../../standard/dropdown/PEDropdown';
import VStack from '../../../utility/vStack/VStack';

export interface MenuBookingRequestPageStep2Props {
    allergies: Allergy[];
    selectedAllergies: Allergy[];
    setSelectedAllergies: (changedSelectedAllergies: Allergy[]) => void;

    onContinue: () => void;
}

export default function MenuBookingRequestPageStep2({
    allergies,
    selectedAllergies,
    setSelectedAllergies,
    onContinue,
}: MenuBookingRequestPageStep2Props): ReactElement {
    const { t } = useTranslation('global-booking-request');

    return (
        <VStack gap={32} className="w-full">
            <VStack className="w-full gap-4" style={{ alignItems: 'flex-start' }}>
                <h3>{t('preferences-label')}</h3>

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
