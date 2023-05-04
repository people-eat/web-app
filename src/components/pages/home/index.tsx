import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import PEHeader from '../../header/PEHeader';
import PEBulletPoint from '../../standard/bulletPoint/PEBulletPoint';
import PEFooter from '../../standard/footer/PEFooter';
import { Icon } from '../../standard/icon/Icon';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import HomePageSearch from './search/HomePageSearch';

interface GoogleMapsPlacesResult {
    formatted_address: string;
    geometry: {
        location: {
            lat: number;
            lng: number;
        };
    };
}

export default function HomePage(): ReactElement {
    const { t } = useTranslation('home');

    const [addressSearchText, setAddressSearchText] = useState('');
    const [adultCount, setAdultCount] = useState(4);
    const [childrenCount, setChildrenCount] = useState(0);
    const [date, setDate] = useState(moment());
    const [searchResults, setSearchResults] = useState<GoogleMapsPlacesResult[]>([]);

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
                    <HomePageSearch
                        addressSearchText={addressSearchText}
                        onAddressSearchTextChange={(changedSearchText): void => {
                            console.log('called with: ', changedSearchText);

                            if (!changedSearchText) {
                                setSearchResults([]);
                                return;
                            }
                            setAddressSearchText(changedSearchText);
                            fetch(
                                encodeURI(
                                    'google-places-api/place/textsearch/json?query="' +
                                        addressSearchText +
                                        '"&key=' +
                                        (process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''),
                                ),
                            )
                                .then((response) => response.json())
                                .then((body: { results: GoogleMapsPlacesResult[] }) => {
                                    console.log(`\n\nreceived ${body.results.length} results:`);
                                    body.results.forEach((result) => console.log('- ' + result.formatted_address));
                                    setSearchResults(body.results);
                                })
                                .catch((error) => console.error(error));
                        }}
                        adultCount={adultCount}
                        onAdultsChange={setAdultCount}
                        childrenCount={childrenCount}
                        onChildrenChange={setChildrenCount}
                        date={date}
                        onDateChange={setDate}
                        searchResults={searchResults.map(({ formatted_address, geometry: { location } }) => ({
                            label: formatted_address,
                            location: { latitude: location.lat, longitude: location.lng },
                        }))}
                        // eslint-disable-next-line no-alert
                        onSearchResultSelect={(selectedSearchResult): void => alert(JSON.stringify(selectedSearchResult))}
                    />
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
