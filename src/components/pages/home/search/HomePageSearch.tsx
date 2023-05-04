import { Autocomplete, Divider, IconButton, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { type Moment } from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
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
}: HomePageSearchProps): ReactElement {
    const { t } = useTranslation('home');
    const { locale } = useRouter();

    return (
        <HStack style={{ gap: 16, backgroundColor: 'white', padding: '10px', paddingLeft: '24px', borderRadius: 64 }}>
            <Autocomplete
                style={{ width: 200 }}
                freeSolo
                disableClearable
                options={searchResults}
                onChange={(_event, selectedSearchResult): void => {
                    if (typeof selectedSearchResult === 'string') return;
                    onSearchResultSelect(selectedSearchResult);
                }}
                filterOptions={(options): AddressSearchResult[] => options}
                renderInput={(params): ReactElement => (
                    <TextField
                        {...params}
                        value={addressSearchText}
                        onChange={(event): void => {
                            onAddressSearchTextChange(event.target.value);
                        }}
                        variant="standard"
                        label={t('search-city-label')}
                        InputProps={{ disableUnderline: true, ...params.InputProps }}
                        InputLabelProps={{ shrink: true }}
                    />
                )}
            />
            <Divider orientation="vertical" />
            <TextField
                value={adultCount}
                onChange={(event): void => {
                    onAdultsChange(Number(event.target.value));
                }}
                variant="standard"
                label={t('search-adults-label')}
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1 }}
                InputProps={{ disableUnderline: true }}
            />
            <Divider orientation="vertical" />
            <TextField
                value={childrenCount}
                onChange={(event): void => {
                    onChildrenChange(Number(event.target.value));
                }}
                variant="standard"
                label={t('search-children-label')}
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 0 }}
                InputProps={{ disableUnderline: true }}
            />
            <Divider orientation="vertical" />
            <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
                <DatePicker
                    value={date}
                    onChange={(changedDate: Moment | null): void => {
                        if (changedDate) onDateChange(changedDate);
                    }}
                    slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                    label={t('search-date-label')}
                />
            </LocalizationProvider>
            <IconButton size="large" style={{ backgroundColor: 'rgba(255, 100, 51, 1)' }}>
                <PEIcon icon={Icon.searchBar} />
            </IconButton>
        </HStack>
    );
}
