import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import FullScreenDialog from '../../../standard/dialogs/PEDialog';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import { type AddressSearchResult } from './AddressSearchResult';
import { type HomePageSearchProps } from './HomePageSearch';

export default function HomePageSearchMobile({
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
    const [isOpen, setOpenDialog] = useState(false);

    return (
        <div
            className="hidden lg:flex w-full justify-between px-6 py-2 box-border items-center shadow-primary"
            style={{
                gap: 16,
                backgroundColor: 'white',
                borderRadius: 64,
            }}
        >
            <Autocomplete
                style={{ width: '100%' }}
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
            <FullScreenDialog
                isOpen={isOpen}
                onClick={(): void => setOpenDialog(!isOpen)}
                addressSearchText={addressSearchText}
                onAddressSearchTextChange={onAddressSearchTextChange}
                searchResults={searchResults}
                onSearchResultSelect={onSearchResultSelect}
                adultCount={adultCount}
                onAdultsChange={onAdultsChange}
                childrenCount={childrenCount}
                onChildrenChange={onChildrenChange}
                date={date}
                onDateChange={onDateChange}
                onSearch={onSearch}
            />
            <PEIconButton
                onClick={(): void => setOpenDialog(!isOpen)}
                bg="bg-orange"
                icon={Icon.filters}
                size={'40px'}
                iconSize={24}
                className="rounded-4"
            />
        </div>
    );
}
