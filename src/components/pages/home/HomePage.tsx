import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import { type GetHomePageDataDocumentQuery } from '../../../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../../../data-source/searchAddress';
import useResponsive from '../../../hooks/useResponsive';
import { type Location } from '../../../shared-domain/Location';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import VStack from '../../utility/vStack/VStack';
import HomePageCookSection from './cookSection/HomePageCookSection';
import HomePageMapSection from './mapSection/HomePageMapSection';
import HomePageMenuSection from './menuSection/HomePageMenuSection';
import HomePageRatingSection from './ratingSection/HomePageRatingSection';
import HomePageSearch from './search/HomePageSearch';
import HomePageSearchMobile from './search/HomePageSearchMobile';
import HomePageSection1 from './section1/HomePageSection1';
import HomePageSection10 from './section10/HomePageSection10';
import HomePageSection2 from './section2/HomePageSection2';
import HomePageSection3 from './section3/HomePageSection3';
import HomePageSection4 from './section4/HomePageSection4';
import HomePageSection5 from './section5/HomePageSection5';

export interface HomePageProps {
    signedInUser?: SignedInUser;
    heroCooks: NonNullable<GetHomePageDataDocumentQuery['publicCooks']['findHeroes']>;
    searchParameters: {
        location: {
            address: string;
            latitude: number;
            longitude: number;
        };
        adults: number;
        children: number;
        date: string;
    };
}

export function HomePage({ signedInUser, searchParameters, heroCooks }: HomePageProps): ReactElement {
    const { t } = useTranslation('home');
    const { isMobile } = useResponsive();
    const router = useRouter();

    const [address, setAddress] = useState(searchParameters.location.address);
    const [addressSearchResults, setAddressSearchResults] = useState<GoogleMapsPlacesResult[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<Location>(searchParameters.location);

    const [adults, setAdults] = useState(searchParameters.adults);
    const [children, setChildren] = useState(searchParameters.children);
    const [date, setDate] = useState(moment(searchParameters.date));

    function onSearch(): void {
        const { latitude, longitude } = selectedLocation;

        void router.push({
            pathname: '/menus',
            query: { address, latitude, longitude, adults, children, date: date.format(moment.HTML5_FMT.DATE) },
        });
    }

    return (
        <VStack gap={40} className="w-full overflow-hidden">
            <PEHeader signedInUser={signedInUser} />

            <VStack
                className="relative lg:w-[calc(100%-32px)] w-[calc(100%-64px)] max-w-screen-xl mx-8 lg:mx-4"
                style={{ alignItems: 'flex-start' }}
                gap={16}
            >
                {/* <div className={styles.heroSection}>
                    <div className={styles.heroSectionContent}>
                        <h1>Finde einen Privatkoch für jeden Anlass bei dir Zuhause</h1>
                        <h2>Hier warten kulinarische Erlebnismomente auf dich</h2>
                        <div className={styles.searchBar}>
                            <Autocomplete
                                style={{ width: 200 }}
                                freeSolo
                                disableClearable
                                options={new Array<AddressSearchResult>()}
                                onChange={(_event): void => {
                                    // if (typeof selectedSearchResult === 'string') return;
                                    // onSearchResultSelect(selectedSearchResult);
                                }}
                                inputValue={''}
                                placeholder="dsad"
                                onInputChange={(_event): void => undefined}
                                // onAddressSearchTextChange(value)
                                filterOptions={(options): AddressSearchResult[] => options}
                                renderInput={(params): ReactElement => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label={''}
                                        InputProps={{ disableUnderline: true, ...params.InputProps }}
                                        InputLabelProps={{ shrink: true }}
                                    />
                                )}
                            />
                            <Divider orientation="vertical" />
                            <TextField
                                sx={{ maxWidth: '140px' }}
                                // value={validateFirstZero(adultCount)}
                                // onChange={(event): void => {
                                //     onAdultsChange(Number(event.target.value));
                                // }}
                                variant="standard"
                                label={'Teilnehmer'}
                                type="number"
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', min: 1 }}
                                InputProps={{ disableUnderline: true }}
                            />
                            <Divider orientation="vertical" />
                            <DatePicker
                                // value={date}
                                // onChange={(changedDate: Moment | null): void => {
                                //     if (changedDate) onDateChange(changedDate);
                                // }}
                                slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                                label={'Datum'}
                                minDate={moment().add(3, 'days')}
                            />
                        </div>

                        <div className={styles.buttons}>
                            <div className={styles.buttonRow1}>
                                <Button style={{ flex: 1 }} variant="contained">
                                    Köche
                                </Button>
                                <Button style={{ flex: 1 }} variant="contained">
                                    Menüs
                                </Button>
                            </div>

                            <div className={styles.buttonRow2}>
                                <Button style={{ flex: 1 }} variant="contained">
                                    Vorschläg erhalten
                                </Button>
                            </div>
                        </div>
                    </div>

                    <Image unoptimized className={styles.heroSectionImage} src="/koch-mieten.jpg" alt="" width={400} height={400} />
                </div> */}
                <VStack
                    className="w-full relative pl-8 lg:pl-0 items-start max-w-screen-xl h-[602px] lg:h-[522px]"
                    style={{
                        borderRadius: '16px',
                        boxSizing: 'border-box',
                        alignItems: 'flex-start',
                    }}
                >
                    <VStack
                        className="absolute lg:w-full w-full h-[602px] lg:h-[202px] lg:bottom-0 max-w-screen-xl left-0 overflow-hidden -z-10"
                        style={{
                            backgroundImage: 'url(/koch-mieten.jpg)',
                            backgroundPosition: isMobile ? 'top' : '0 -60px',
                            backgroundSize: 'cover',
                            borderRadius: '16px',
                            alignItems: 'flex-start',
                            boxSizing: 'border-box',
                        }}
                    />

                    <div
                        className="flex w-full lg:justify-center lg:mt-5 lg:mb-4 mt-[100px] leading-[80px] lg:leading-[34px]"
                        style={{ gap: 0 }}
                    >
                        <h1 className="lg:max-w-[360px] max-w-[720px] text-white lg:text-black lg:text-center w-full lg:text-heading-xm text-heading-xxl m-0 p-0 lg:uppercase">
                            {t('headline-01')}
                            <span className="text-orange"> {t('headline-02')} </span>
                            {t('headline-03')}
                        </h1>
                    </div>

                    <HomePageSearchMobile
                        addressSearchText={address}
                        onAddressSearchTextChange={(changedAddressSearchText: string): void => {
                            setAddress(changedAddressSearchText);
                            searchAddress(changedAddressSearchText, setAddressSearchResults);
                        }}
                        adultCount={adults}
                        onAdultsChange={setAdults}
                        childrenCount={children}
                        onChildrenChange={setChildren}
                        date={date}
                        onDateChange={setDate}
                        searchResults={addressSearchResults.map(({ formatted_address, geometry: { location } }) => ({
                            label: formatted_address,
                            location: { latitude: location.lat, longitude: location.lng },
                        }))}
                        onSearchResultSelect={(selectedSearchResult): void =>
                            setSelectedLocation({
                                latitude: selectedSearchResult.location.latitude,
                                longitude: selectedSearchResult.location.longitude,
                            })
                        }
                        onSearch={onSearch}
                    />

                    <div className="flex w-full lg:justify-center">
                        <p className="text-white text-heading-l lg:text-center lg:my-8 mb-12 lg:text-60black lg:text-text-sm lg:max-w-[180px]">
                            {t('sub-headline-01')}
                            <span className="text-orange"> {t('sub-headline-02')} </span>
                            {t('sub-headline-03')}
                        </p>
                    </div>

                    <div className="lg:hidden">
                        <HomePageSearch
                            addressSearchText={address}
                            onAddressSearchTextChange={(changedAddressSearchText: string): void => {
                                setAddress(changedAddressSearchText);
                                searchAddress(changedAddressSearchText, setAddressSearchResults);
                            }}
                            adultCount={adults}
                            onAdultsChange={setAdults}
                            childrenCount={children}
                            onChildrenChange={setChildren}
                            date={date}
                            onDateChange={setDate}
                            searchResults={addressSearchResults.map(({ formatted_address, geometry: { location } }) => ({
                                label: formatted_address,
                                location: { latitude: location.lat, longitude: location.lng },
                            }))}
                            onSearchResultSelect={(selectedSearchResult): void =>
                                setSelectedLocation({
                                    latitude: selectedSearchResult.location.latitude,
                                    longitude: selectedSearchResult.location.longitude,
                                })
                            }
                            onSearch={onSearch}
                        />
                    </div>

                    <div className="bottom-[-15px] left-0 absolute lg:hidden">
                        <Image unoptimized src={'/waves.svg'} width={1300} height={58} alt="PeopleEat waves" />
                    </div>
                </VStack>
                <HomePageSection1 />
                <HomePageSection2 />
                <HomePageSection3 />
                <HomePageSection4 />
                <HomePageSection5 />
                <HomePageMenuSection />
                <HomePageMapSection
                    addressSearchText={address}
                    onAddressSearchTextChange={(changedAddressSearchText: string): void => {
                        setAddress(changedAddressSearchText);
                        searchAddress(changedAddressSearchText, setAddressSearchResults);
                    }}
                    searchResults={addressSearchResults}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    onSearch={onSearch}
                />
                <HomePageCookSection heroCooks={heroCooks} />
                <HomePageRatingSection />
                <HomePageSection10 />
            </VStack>

            <PEFooter />
        </VStack>
    );
}
