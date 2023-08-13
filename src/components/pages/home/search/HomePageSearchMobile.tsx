import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import { type AddressSearchResult } from './AddressSearchResult';
import { type HomePageSearchProps } from './HomePageSearch';
import HomePageSearchDialogMobile from './HomePageSearchDialogMobile';

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
    const { t } = useTranslation('search');
    const [isOpen, setOpenDialog] = useState(false);

    return (
        <div
            className="hidden lg:flex w-full justify-between px-6 my-[24px] py-2 box-border items-center shadow-primary"
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
                        label={t('city-label')}
                        InputProps={{ disableUnderline: true, ...params.InputProps }}
                        InputLabelProps={{ shrink: true }}
                    />
                )}
            />
            <HomePageSearchDialogMobile
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
