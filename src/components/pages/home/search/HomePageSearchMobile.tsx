import { Autocomplete, TextField } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEIconButton from '~/components/standard/iconButton/PEIconButton';
import { Icon } from '../../../standard/icon/Icon';
import { type AddressSearchResult } from './AddressSearchResult';

export interface HomePageSearchProps {
    addressSearchText: string;
    onAddressSearchTextChange: (changedSearchText: string) => void;
    searchResults: AddressSearchResult[];
    onSearchResultSelect: (selectedSearchResult: AddressSearchResult) => void;
}

export default function HomePageSearchMobile({
    addressSearchText,
    onAddressSearchTextChange,
    searchResults,
    onSearchResultSelect,
}: HomePageSearchProps): ReactElement {
    const { t } = useTranslation('home');

    return (
        <div
            className={'hidden lg:flex w-full justify-between px-6 py-2 box-border items-center shadow-primary'}
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
            <PEIconButton bg="bg-orange" icon={Icon.filters} size={'40px'} iconSize={24} className="rounded-4" />
        </div>
    );
}
