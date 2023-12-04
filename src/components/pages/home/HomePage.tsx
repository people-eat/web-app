import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import { type GetHomePageDataDocumentQuery } from '../../../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../../../data-source/searchAddress';
import { type Location } from '../../../shared-domain/Location';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEButton from '../../standard/buttons/PEButton';
import VStack from '../../utility/vStack/VStack';
import styles from './HomePage.module.css';
import HomePageCookSection from './cookSection/HomePageCookSection';
import HomePageMenuSection from './menuSection/HomePageMenuSection';
import HomePageSearch from './search/HomePageSearch';
import HomePageSearchMobile from './search/HomePageSearchMobile';
import HomePageSection10 from './section10/HomePageSection10';
import HomePageSection5 from './section5/HomePageSection5';

export interface HomePageProps {
    signedInUser?: SignedInUser;
    heroCooks: NonNullable<GetHomePageDataDocumentQuery['publicCooks']['findHeroes']>;
    heroMenus: NonNullable<GetHomePageDataDocumentQuery['publicMenus']['findHeroes']>;
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

export function HomePage({ signedInUser, searchParameters, heroCooks, heroMenus }: HomePageProps): ReactElement {
    const { t } = useTranslation('home');
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
                gap={64}
            >
                <VStack
                    className="w-full relative pl-8 lg:pl-0 items-start max-w-screen-xl h-[602px] lg:h-[522px]"
                    style={{
                        // borderRadius: '16px',
                        // boxSizing: 'border-box',
                        alignItems: 'flex-start',
                    }}
                >
                    <VStack
                        className="absolute lg:w-full w-full h-[602px] lg:h-[202px] lg:bottom-0 max-w-screen-xl left-0 overflow-hidden -z-10"
                        style={{
                            backgroundImage: 'url(/wein-dinner.png)',
                            alignItems: 'flex-start',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            // objectFit: 'fill',
                            // backgroundPosition: isMobile ? 'top' : '0 -60px',
                            // backgroundSize: 'cover',
                            borderRadius: '16px',
                            // boxSizing: 'border-box',
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
                </VStack>

                <div className={styles.newSection}>
                    <h2 className={styles.newSectionTitle}>Finde in nur wenigen Schritten einen Koch für Zuhause</h2>
                    <div className={styles.newSectionBody}>
                        <div className={styles.newSectionEntry}>
                            <Image
                                unoptimized
                                src="/home/2/köche.png"
                                alt=""
                                width={380}
                                height={240}
                                className={styles.newSectionEntryImage}
                            />
                            <h3 className={styles.newSectionEntryTitle}>Finde einen Koch in deiner Umgebung</h3>
                            <p className={styles.newSectionEntryDescription}>
                                Wähle einen Koch oder aus verschiedenen Menüvorschlägen aus. Wenn du nach einer speziellen Küche oder einer
                                Kategorie suchst, hilft dir unsere Filterfunktion weiter. Du hast nichts passendes in deiner Umgebung
                                gefunden? Dann sende uns eine individuelle Anfrage. Unser Netzwerk aus Köchen wächst stetig weiter.{' '}
                            </p>
                        </div>
                        <div className={styles.newSectionEntry}>
                            <Image
                                unoptimized
                                src="/home/2/menü-gerichte.png"
                                alt=""
                                width={380}
                                height={240}
                                className={styles.newSectionEntryImage}
                            />
                            <h3 className={styles.newSectionEntryTitle}>Stelle dein Menü individuell zusammen</h3>
                            <p className={styles.newSectionEntryDescription}>
                                Wähle einen Koch oder aus verschiedenen Menüvorschlägen aus. Wenn du nach einer speziellen Küche oder einer
                                Kategorie suchst, hilft dir unsere Filterfunktion weiter. Du hast nichts passendes in deiner Umgebung
                                gefunden? Dann sende uns eine individuelle Anfrage. Unser Netzwerk aus Köchen wächst stetig weiter.{' '}
                            </p>
                        </div>
                        <div className={styles.newSectionEntry}>
                            <Image
                                unoptimized
                                src="/home/2/chat.png"
                                alt=""
                                width={380}
                                height={240}
                                className={styles.newSectionEntryImage}
                            />
                            <h3 className={styles.newSectionEntryTitle}>Kommuniziert gemeinsam via Chat</h3>
                            <p className={styles.newSectionEntryDescription}>
                                Sobald dein ausgewählter Koch die Anfrage bestätigt, können die letzten Einzelheiten via Chat gemeinsam
                                abgestimmt werden. Menüanpassungen können nach der Buchung selbstverständlich erfolgen.
                            </p>
                        </div>
                    </div>
                </div>

                <div className={styles.section3}>
                    <h2 className={styles.section3Title}>Werde Gastgeber aus Leidenschaft, wir kümmern uns um den Rest</h2>
                    <div className={styles.section3Body}>
                        <div className={styles.section3Content}>
                            <div className={styles.section3Entries}>
                                <div className={styles.section3Entry}>
                                    <h3 className={styles.section3EntryTitle}>🛒 Einkauf der Lebensmittel</h3>
                                    <p className={styles.section3EntryDescription}>
                                        Du erhältst frische und regionale Lebensmittel von deinem Koch zu dir nachhause geliefert und vor
                                        Ort zubereitet
                                    </p>
                                </div>
                                <div className={styles.section3Entry}>
                                    <h3 className={styles.section3EntryTitle}>🍽️ Servieren der Gerichte</h3>
                                    <p className={styles.section3EntryDescription}>
                                        Lehn dich zurück, lass dich und deine deine Lieben kulinarisch verwöhnen und genieße dir Zeit mit
                                        deinen Lieben
                                    </p>
                                </div>
                                <div className={styles.section3Entry}>
                                    <h3 className={styles.section3EntryTitle}>🫧 Saubere Küche</h3>
                                    <p className={styles.section3EntryDescription}>
                                        Lass den Abend ausklingen und mache dir als Gastgeber keine Gedanken mehr über eine Saubere Küche
                                    </p>
                                </div>
                            </div>
                            <PEButton title="Koch finden" onClick={(): void => undefined} />
                        </div>
                        <Image unoptimized src="/home/3/dinner.jpeg" alt="" width={500} height={500} className={styles.section3BodyImage} />
                    </div>
                </div>

                {/* <HomePageSection1 /> */}

                {/* <HomePageSection2 /> */}

                {/* <HomePageSection3 /> */}

                {/* <HomePageSection4 /> */}

                <HomePageSection5 />

                <HomePageMenuSection heroMenus={heroMenus} adults={adults} childrenCount={children} />

                {/* <HomePageMapSection
                    addressSearchText={address}
                    onAddressSearchTextChange={(changedAddressSearchText: string): void => {
                        setAddress(changedAddressSearchText);
                        searchAddress(changedAddressSearchText, setAddressSearchResults);
                    }}
                    searchResults={addressSearchResults}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    onSearch={onSearch}
                /> */}

                <HomePageCookSection heroCooks={heroCooks} />

                {/* <HomePageRatingSection /> */}

                <HomePageSection10 />
            </VStack>

            <PEFooter />
        </VStack>
    );
}
