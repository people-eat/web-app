import { Autocomplete, Divider, IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { type Moment } from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import HStack from '../../../utility/hStack/HStack';
import { type AddressSearchResult } from './AddressSearchResult';

export interface HomePageSearchProps {
    addressSearchText: string;
    onAddressSearchTextChange: (changedSearchText: string) => void;
    adultCount: number;
    onAdultsChange: (changedAdults: number) => void;
    childrenCount: number;
    onChildrenChange: (changedChildren: number) => void;
    date: Moment;
    onDateChange: (changedDate: Moment) => void;
    searchResults: AddressSearchResult[];
    onSearchResultSelect: (selectedSearchResult: AddressSearchResult) => void;
    onSearch: () => void;
}

export default function HomePageSearch({
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
}: HomePageSearchProps): ReactElement {
    const { t } = useTranslation('home');

    function validateFirstZero(value: string | number): number {
        const result = String(value);
        if (result[0] === '0' && result.length > 1) return Number(result.slice(1));
        else if (!result.length) return 0;

        return Number(result);
    }

    return (
        <HStack
            style={{
                boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.5)',
                gap: 16,
                backgroundColor: 'white',
                padding: '10px',
                paddingLeft: '24px',
                borderRadius: 64,
            }}
        >
            <Autocomplete
                style={{ width: 200 }}
                freeSolo
                disableClearable
                options={searchResults}
                onChange={(_event, selectedSearchResult): void => {
                    if (typeof selectedSearchResult === 'string') return;
                    onSearchResultSelect(selectedSearchResult);
                }}
                inputValue={addressSearchText}
                onInputChange={(_event, value): void => onAddressSearchTextChange(value)}
                filterOptions={(options): AddressSearchResult[] => options}
                renderInput={(params): ReactElement => (
                    <TextField
                        {...params}
                        variant="standard"
                        label={t('search-city-label')}
                        InputProps={{ disableUnderline: true, ...params.InputProps }}
                        InputLabelProps={{ shrink: true }}
                    />
                )}
            />
            <Divider orientation="vertical" />
            <TextField
                sx={{ maxWidth: '140px' }}
                value={validateFirstZero(adultCount)}
                onChange={(event): void => {
                    onAdultsChange(validateFirstZero(event.target.value));
                }}
                variant="standard"
                label={t('search-adults-label')}
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1 }}
                InputProps={{ disableUnderline: true }}
            />
            <Divider orientation="vertical" />
            <TextField
                sx={{ maxWidth: '140px' }}
                value={validateFirstZero(childrenCount)}
                onChange={(event): void => {
                    onChildrenChange(validateFirstZero(event.target.value));
                }}
                variant="standard"
                label={t('search-children-label')}
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                InputProps={{ disableUnderline: true }}
            />
            <Divider orientation="vertical" />
            <DatePicker
                value={date}
                onChange={(changedDate: Moment | null): void => {
                    if (changedDate) onDateChange(changedDate);
                }}
                slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                label={t('search-date-label')}
            />
            <IconButton size="large" style={{ backgroundColor: 'rgba(255, 100, 51, 1)' }} onClick={onSearch}>
                <PEIcon icon={Icon.searchBar} />
            </IconButton>
        </HStack>
    );
}
