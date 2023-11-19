import { DatePicker } from '@mui/x-date-pickers';
import moment, { type Moment } from 'moment/moment';
import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEMobileBottomSheet from '../../../standard/modal/PEMobileBottomSheet';
import PEAutoCompleteTextField from '../../../standard/textFields/PEAutoCompleteTextField';
import PENumberTextField from '../../../standard/textFields/PENumberTextField';
import { type HomePageSearchProps } from './HomePageSearch';

export interface PEFullScreenDialog extends HomePageSearchProps {
    isOpen: boolean;
    onClick: (flag: boolean) => void;
}

export default function HomePageSearchDialogMobile({
    isOpen,
    onClick,
    addressSearchText,
    onAddressSearchTextChange,
    adultCount,
    onAdultsChange,
    childrenCount,
    onChildrenChange,
    date,
    onDateChange,
    searchResults,
    onSearchResultSelect,
    onSearch,
}: PEFullScreenDialog): ReactElement {
    const { t } = useTranslation('search');

    return (
        <PEMobileBottomSheet open={isOpen} onClose={(): void => onClick(false)} title={'Suchkriterien'}>
            <p className="text-text-sm-bold">{t('city-label')}</p>
            <PEAutoCompleteTextField
                startContent={<PEIcon icon={Icon.search} />}
                searchText={addressSearchText}
                onSearchTextChange={(changedSearchText): void => onAddressSearchTextChange(changedSearchText)}
                options={searchResults}
                getOptionLabel={({ label }): string => label}
                onOptionSelect={(selectedOption): void => onSearchResultSelect(selectedOption)}
            />

            <p className="text-text-sm-bold">{t('adults-label')}</p>
            <PENumberTextField value={adultCount} onChange={onAdultsChange} min={1} max={20} step={1} />

            <p className="text-text-sm-bold">{t('children-label')}</p>
            <PENumberTextField value={childrenCount} onChange={onChildrenChange} placeholder="" min={0} max={10} step={1} />

            <p className="text-text-sm-bold">{t('date-label')}</p>
            <DatePicker
                sx={{
                    '&.Mui-focused': { border: '1px solid black' },
                    width: '100%',
                    border: '1px solid rgba(31, 31, 31, 0.2)',
                    borderRadius: '12px',
                    padding: '8px 16px',
                    boxSizing: 'border-box',
                }}
                value={date}
                onChange={(changedDate: Moment | null): void => {
                    if (changedDate) onDateChange(changedDate);
                }}
                slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                minDate={moment().add(2, 'days')}
            />

            <PEButton
                disabled={!addressSearchText || !date || !adultCount}
                onClick={(): void => {
                    onSearch();
                    onClick(false);
                }}
                title={'Suchen'}
                className="mt-4"
            />
        </PEMobileBottomSheet>
    );
}

// <div className={classNames({ ['absolute top-10 h-screen w-full']: isOpen })}>
