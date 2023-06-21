import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import moment, { type Moment } from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import searchAddress, { type GoogleMapsPlacesResult } from '../../../../data-source/searchAddress';
import PEButton from '../../../standard/buttons/PEButton';
import PECounter from '../../../standard/counter/PECounter';
import PEAutoCompleteTextField from '../../../standard/textFields/PEAutoCompleteTextField';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

export interface IndividualRequestPageStepOneProps {
    adultCount: number;
    setAdultCount: (changedAdultCount: number) => void;
    childrenCount: number;
    setChildrenCount: (changeChildrenCount: number) => void;
    addressSearchText: string;
    setAddressSearchText: (changedAddressSearchText: string) => void;
    dateTime: Moment;
    setDateTime: (changedDateTime: Moment) => void;
    occasion: string;
    setOccasion: (changedOccasion: string) => void;
    budget: string;
    setBudget: (changedBudget: string) => void;
    onContinue: () => void;
}

export default function IndividualRequestPageStep1({
    adultCount,
    setAdultCount,
    childrenCount,
    setChildrenCount,
    addressSearchText,
    setAddressSearchText,
    dateTime,
    setDateTime,
    occasion,
    setOccasion,
    budget,
    setBudget,
    onContinue,
}: IndividualRequestPageStepOneProps): ReactElement {
    const { t } = useTranslation('individual-request');

    const [addressSearchResults, setAddressSearchResults] = useState<GoogleMapsPlacesResult[]>([]);
    const [_selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

    const disabled = adultCount < 1 || budget === '';

    return (
        <VStack gap={32} className="w-full">
            <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>{t('participants-label')}</h3>
                <HStack className="w-full lg:items-center lg:my-4">
                    <span>{t('adults-label')}</span>
                    <Spacer />
                    <PECounter value={adultCount} onValueChange={setAdultCount} />
                </HStack>
                <HStack className="w-full lg:items-center">
                    <span>{t('children-label')}</span>
                    <Spacer />
                    <PECounter value={childrenCount} onValueChange={setChildrenCount} />
                </HStack>
            </VStack>

            <VStack gap={16} className="w-full relative" style={{ alignItems: 'flex-start' }}>
                <h3>{t('event-details-label')}</h3>
                <HStack gap={16} className="w-full box-border relative">
                    <div className="w-full min-w-[calc(50% - 8px)] h-16 border-[1px] border-solid border-disabled rounded-4 px-4 py-2 box-border">
                        <DatePicker
                            sx={{ width: '100%' }}
                            value={dateTime}
                            onChange={(changedDate: Moment | null): void => {
                                if (changedDate) setDateTime(changedDate);
                            }}
                            slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                            label={t('date-label')}
                            minDate={moment().add(7, 'days')}
                        />
                    </div>
                    <div className="w-full min-w-[calc(50% - 8px)] h-16 border-[1px] border-solid border-disabled rounded-4 px-4 py-2 box-border">
                        <TimePicker
                            sx={{ width: '100%' }}
                            value={dateTime}
                            onChange={(changedTime: Moment | null): void => {
                                if (changedTime) setDateTime(changedTime);
                            }}
                            slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                            label={t('start-time-label')}
                        />
                    </div>
                </HStack>
                <PETextField value={occasion} onChange={setOccasion} type="text" placeholder={t('occasion-label')} />
            </VStack>
            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>{t('location-label')}</h3>
                <PEAutoCompleteTextField
                    searchText={addressSearchText}
                    onSearchTextChange={(changedAddressSearchText: string): void => {
                        setAddressSearchText(changedAddressSearchText);
                        searchAddress(changedAddressSearchText, setAddressSearchResults);
                    }}
                    options={addressSearchResults}
                    getOptionLabel={(selectedOption: GoogleMapsPlacesResult): string => selectedOption.formatted_address}
                    onOptionSelect={(selectedSearchResult: GoogleMapsPlacesResult): void =>
                        setSelectedLocation({
                            latitude: selectedSearchResult.geometry.location.lat,
                            longitude: selectedSearchResult.geometry.location.lng,
                        })
                    }
                    placeholder={t('location-placeholder-label')}
                />
            </VStack>

            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>{t('budget-label')}</h3>
                <PETextField
                    startContent={<>€</>}
                    type="number"
                    value={budget}
                    onChange={setBudget}
                    placeholder={t('budget-placeholder-label')}
                />
            </VStack>

            <PEButton onClick={onContinue} title={t('continue-label')} disabled={disabled} />
        </VStack>
    );
}
