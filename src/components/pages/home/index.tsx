import { Autocomplete, Divider, IconButton, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { type Moment } from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import PEHeader from '../../header/PEHeader';
import PEBulletPoint from '../../standard/bulletPoint/PEBulletPoint';
import PEFooter from '../../standard/footer/PEFooter';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';

interface GoogleMapsPlacesResult {
    formatted_address: string;
    geometry: {
        location: {
            latitude: number;
            longitude: number;
        };
    };
}

export default function HomePage(): ReactElement {
    const { t } = useTranslation('home');

    const [addressSearchText, setAddressSearchText] = useState('');
    const [adults, setAdults] = useState(4);
    const [children, setChildren] = useState(0);
    const [date, setDate] = useState(moment());

    const [searchResults, setSearchResults] = useState<GoogleMapsPlacesResult[]>([]);

    const handleAddressSearchTextChange = (changedText: string): void => {
        setAddressSearchText(changedText);
        fetch(encodeURI('google-places-api/place/textsearch/json?query=' + changedText + '&key=AIzaSyDL41SmGi71MmEkGYjhCSGW3IsXWnR_8yQ'))
            .then((response) => response.json())
            .then((body: { results: GoogleMapsPlacesResult[] }) => {
                console.log(searchResults);
                setSearchResults(body.results);
            })
            .catch((error) => console.error(error));
    };

    return (
        <VStack className="w-full">
            <PEHeader />
            <VStack className="w-full max-w-screen-lg" style={{ margin: '32px', alignItems: 'flex-start', gap: 32 }}>
                <VStack
                    className="w-full"
                    style={{
                        backgroundImage: 'url(/glass.png)',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        height: 502,
                        borderRadius: '16px',
                    }}
                >
                    <VStack style={{ alignItems: 'flex-start', gap: 0 }}>
                        <h1 className="text-white">{t('headline')}</h1>
                    </VStack>
                    <p className="text-white">{t('sub-headline')}</p>
                    <HStack style={{ gap: 16, backgroundColor: 'white', padding: '10px', paddingLeft: '24px', borderRadius: 64 }}>
                        <Autocomplete
                            style={{ width: 200 }}
                            freeSolo
                            disableClearable
                            options={searchResults.map((searchResult, index) => ({ label: searchResult.formatted_address, id: index }))}
                            renderInput={(params): ReactElement => (
                                <TextField
                                    {...params}
                                    value={addressSearchText}
                                    onChange={(event): void => {
                                        handleAddressSearchTextChange(event.target.value);
                                    }}
                                    variant="standard"
                                    label={t('search-city-label')}
                                    InputProps={{ disableUnderline: true, ...params.InputProps }}
                                />
                            )}
                        />
                        <Divider orientation="vertical" />
                        <TextField
                            // style={{ backgroundColor: 'red' }}
                            value={adults}
                            onChange={(event): void => {
                                setAdults(Number(event.target.value));
                            }}
                            variant="standard"
                            label={t('search-adults-label')}
                            type="number"
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1 }}
                            InputProps={{ disableUnderline: true }}
                        />
                        <Divider orientation="vertical" />
                        <TextField
                            value={children}
                            onChange={(event): void => {
                                setChildren(Number(event.target.value));
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
                                if (changedDate) setDate(changedDate);
                            }}
                            slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                            label={t('search-date-label')}
                        />
                        <IconButton size="large" className="bg-orange">
                            <PEIcon icon={Icon.searchBar} />
                        </IconButton>
                    </HStack>
                </VStack>
                <HStack className="w-full" style={{ justifyContent: 'space-evenly' }}>
                    <PEBulletPoint icon={Icon.dishes} text={t('section-1-selling-point-1')} />
                    <PEBulletPoint icon={Icon.usersOrange} text={t('section-1-selling-point-2')} />
                    <PEBulletPoint icon={Icon.chatDots} text={t('section-1-selling-point-3')} />
                </HStack>
            </VStack>
            <PEFooter />
        </VStack>
    );
}
