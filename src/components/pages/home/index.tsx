import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEHeaderMobile from '../../header/PEHeaderMobile';
import HomePageSearchMobile from '../../pages/home/search/HomePageSearchMobile';
import VStack from '../../utility/vStack/VStack';
import { headline01, headline02, headline03, subHeadline01, subHeadline02, subHeadline03 } from './index.mock';
import HomePageSearch from './search/HomePageSearch';
import HomePageSection1 from './section1/HomePageSection1';
import HomePageSection10 from './section10/HomePageSection10';
import HomePageSection2 from './section2/HomePageSection2';
import HomePageSection3 from './section3/HomePageSection3';
import HomePageSection4 from './section4/HomePageSection4';
import HomePageSection5 from './section5/HomePageSection5';
import HomePageSection6 from './section6/HomePageSection6';
import HomePageSection7 from './section7/HomePageSection7';
import HomePageSection8 from './section8/HomePageSection8';
import HomePageSection9 from './section9/HomePageSection9';

export interface GoogleMapsPlacesResult {
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
    const { isMobile } = useResponsive();
    const router = useRouter();

    const [addressSearchText, setAddressSearchText] = useState('');
    const [adultCount, setAdultCount] = useState(4);
    const [childrenCount, setChildrenCount] = useState(0);
    const [date, setDate] = useState(moment());
    const [searchResults, setSearchResults] = useState<GoogleMapsPlacesResult[]>([]);

    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

    function handleAddressSearchTextChange(changedSearchText: string): void {
        setAddressSearchText(changedSearchText);

        if (!changedSearchText) {
            setSearchResults([]);
            return;
        }

        fetch(
            encodeURI(
                'google-places-api/place/textsearch/json?query="' +
                    addressSearchText +
                    '"&key=' +
                    (process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''),
            ),
        )
            .then((response) => response.json())
            .then((body: { results: GoogleMapsPlacesResult[] }) => setSearchResults(body.results))
            .catch((error) => console.error(error));
    }

    function onSearch(): void {
        router
            .push({ pathname: '/individual-request', query: { addressSearchText, adultCount, childrenCount } })
            .then()
            .catch((error) => console.error(error));
    }

    return (
        <VStack gap={40} className="w-full overflow-hidden">
            {isMobile ? <PEHeaderMobile /> : <PEHeader />}

            <VStack
                className="relative lg:w-[calc(100%-32px)] w-[calc(100%-64px)] max-w-screen-xl mx-8 lg:mx-4"
                style={{ alignItems: 'flex-start', gap: 16 }}
            >
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
                            backgroundImage: 'url(/background-home.jpg)',
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
                        <h1 className="lg:max-w-[360px] max-w-[700px] text-white lg:text-black lg:text-center w-full lg:text-heading-xm text-heading-xxl m-0 p-0 lg:uppercase">
                            {headline01}
                            <span className="text-orange"> {headline02} </span>
                            {headline03}
                        </h1>
                    </div>

                    <HomePageSearchMobile
                        addressSearchText={addressSearchText}
                        onAddressSearchTextChange={handleAddressSearchTextChange}
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
                            {subHeadline01}
                            <span className="text-orange"> {subHeadline02} </span>
                            {subHeadline03}
                        </p>
                    </div>

                    <div className="lg:hidden">
                        <HomePageSearch
                            addressSearchText={addressSearchText}
                            onAddressSearchTextChange={handleAddressSearchTextChange}
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
                        <Image src={'/waves.svg'} width={1300} height={58} alt="PeopleEat waves" />
                    </div>
                </VStack>

                <HomePageSection1 />

                <HomePageSection2 />

                <HomePageSection3 />

                <HomePageSection4 />

                <HomePageSection5 />

                <HomePageSection6 />

                <HomePageSection7
                    addressSearchText={addressSearchText}
                    onAddressSearchTextChange={handleAddressSearchTextChange}
                    searchResults={searchResults}
                    selectedLocation={selectedLocation}
                    setSelectedLocation={setSelectedLocation}
                    onSearch={onSearch}
                />

                <HomePageSection8 />

                <HomePageSection9 />

                <HomePageSection10 />
            </VStack>

            <PEFooter />
        </VStack>
    );
}
