import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment, { type Moment } from 'moment';
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
    const { t: translateSearch } = useTranslation('search');

    // change if search results become available
    const disabled: boolean = false;

    function validateFirstZero(value: string | number): string {
        const result = String(value);
        if (result.length > 1) return `${parseInt(result, 10)}`;
        else if (!result.length) return '0';

        return `${parseInt(result, 10)}`;
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
                        label={translateSearch('city-label')}
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
                    onAdultsChange(Number(event.target.value));
                }}
                variant="standard"
                label={translateSearch('adults-label')}
                type="number"
                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1 }}
                InputProps={{ disableUnderline: true }}
            />
            <Divider orientation="vertical" />
            <TextField
                sx={{ maxWidth: '140px' }}
                value={validateFirstZero(childrenCount)}
                onChange={(event): void => {
                    onChildrenChange(Number(event.target.value));
                }}
                variant="standard"
                label={translateSearch('children-label')}
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
                label={translateSearch('date-label')}
                minDate={moment().add(2, 'days')}
            />
            <IconButton size="large" style={{ backgroundColor: 'rgba(255, 100, 51, 1)' }} onClick={onSearch} disabled={disabled}>
                <PEIcon icon={Icon.searchBar} />
            </IconButton>
        </HStack>
    );
}
