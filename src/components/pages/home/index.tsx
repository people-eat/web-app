import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import PEChefCard from '../../cards/chefCard/PEChefCard';
import PEChefCardMobile from '../../cards/chefCard/PEChefCardMobile';
import PEMenuCard from '../../cards/menuCard/PEMenuCard';
import PEMenuCardMobile from '../../cards/menuCard/PEMenuCardMobile';
import PEPointsCard from '../../cards/pointsCard/PEPointsCard';
import PEReviewCardChef from '../../cards/reviewCard/PEReviewCardChef';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEMap from '../../map/PEMap';
import HomePageSearchMobile from '../../pages/home/search/HomePageSearchMobile';
import PEBulletPoint from '../../standard/bulletPoint/PEBulletPoint';
import PEButton from '../../standard/buttons/PEButton';
import { Icon } from '../../standard/icon/Icon';
import PEInput from '../../standard/input/PEInput';
import PENextButton from '../../standard/nextButton/PENextButton';
import PETabItem from '../../standard/tabItem/PETabItem';
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

const EVENTS = ['Family party', 'Customer meeting', 'Team-Event', 'Dinner', 'Candle Light dinner', 'Home party with friends', 'Lunch'];

const MENU_TABS = ['All', 'in Hesse', 'North Rhine-Westphalia', 'Bavaria', 'Berlin'];

export default function HomePage(): ReactElement {
    const { t } = useTranslation('home');
    const router = useRouter();

    const [addressSearchText, setAddressSearchText] = useState('');
    const [adultCount, setAdultCount] = useState(4);
    const [tabItem, setTabItem] = useState('All');
    const [childrenCount, setChildrenCount] = useState(0);
    const [date, setDate] = useState(moment());
    const [searchResults, setSearchResults] = useState<GoogleMapsPlacesResult[]>([]);

    const [selectedLocation, _setSelectedLocation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

    function handleBookNow(): void {
        return;
    }

    function handleGoToAllMenus(): void {
        return;
    }

    function handleFindTheMenu(): void {
        return;
    }

    function handleGoToAllChefs(): void {
        return;
    }

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

    function handleSearch(): void {
        router
            .push({ pathname: '/individual-request', query: { addressSearchText, adultCount, childrenCount } })
            .then()
            .catch((error) => console.error(error));
    }

    return (
        <VStack className="w-full overflow-hidden">
            <PEHeader />
            <VStack
                className="relative lg:w-[calc(100%-32px)] w-[calc(100%-64px)] max-w-screen-xl mx-8 lg:mx-4"
                style={{ alignItems: 'flex-start', gap: 32 }}
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
                            backgroundImage: 'url(/glass.png)',
                            backgroundPosition: 'center',
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
                            {t('headline')}
                        </h1>
                    </div>
                    <HomePageSearchMobile
                        addressSearchText={addressSearchText}
                        onAddressSearchTextChange={handleAddressSearchTextChange}
                        searchResults={searchResults.map(({ formatted_address, geometry: { location } }) => ({
                            label: formatted_address,
                            location: { latitude: location.lat, longitude: location.lng },
                        }))}
                        onSearchResultSelect={(selectedSearchResult): void => console.log({ selectedSearchResult })}
                    />
                    <div className="flex w-full lg:justify-center">
                        <p className="text-white text-heading-l lg:my-8 mb-12 lg:text-60black lg:text-text-sm lg:max-w-[170px]">
                            {t('sub-headline')}
                        </p>
                    </div>
                    <VStack className="lg:hidden">
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
                            onSearchResultSelect={(selectedSearchResult): void => console.log({ selectedSearchResult })}
                            onSearch={handleSearch}
                        />
                    </VStack>
                    <div className="bottom-[-15px] left-0 absolute lg:hidden">
                        <Image src="/waves.svg" width={1300} height={58} alt="PeopleEat waves" />
                    </div>
                </VStack>
                <div className="flex w-full lg:mt-8 mt-10 lg:flex-col gap-6 flex-row justify-center lg:items-center">
                    <PEBulletPoint icon={Icon.createOrder} text={t('section-1-selling-point-1')} />
                    <PEBulletPoint icon={Icon.support24} text={t('section-1-selling-point-2')} />
                    <PEBulletPoint icon={Icon.communicationWithChef} text={t('section-1-selling-point-3')} />
                </div>
                <div className="flex w-full min-h-[700px] lg:my-10 my-[100px] justify-between items-center lg:flex-col-reverse">
                    <div className="flex items-start lg:items-center flex-col">
                        <h2 className="text-heading-xl lg:text-heading-s leading-[60px] mb-12 lg:uppercase">
                            Every occasion as a unique <br /> experience moment
                        </h2>
                        <HStack className="lg:gap-2 gap-4 max-w-[580px] flex-wrap" style={{ justifyContent: 'flex-start' }}>
                            {EVENTS.map((event) => (
                                <span
                                    key={`${event}_PE`}
                                    className="shadow-primary lg:text-text-s px-5 py-3 rounded-8 hover:cursor-default"
                                >
                                    {event}
                                </span>
                            ))}
                        </HStack>
                        <PEButton className="mt-12 max-w-[320px]" onClick={handleBookNow} title="Book now" />
                    </div>
                    <VStack
                        className="rounded-t-[50%] h-[602px] md:h-[502px] sm_min:max-h-[402px] minn:max-h-[302px] sm_min:min-w-full lg:w-[75%] w-[50%] lg:w-full"
                        style={{
                            backgroundImage: 'url(/friendsAtTheTable.png)',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: 602,
                        }}
                    />
                </div>
                <div className="flex w-full min-h-[700px] lg:my-0 my-[100px] lg:flex-col">
                    <VStack
                        className="rounded-t-[50%] h-[602px] md:h-[502px] sm_min:max-h-[402px] minn:max-h-[302px] sm_min:min-w-full lg:w-[75%] w-[50%] lg:w-full"
                        style={{
                            backgroundImage: 'url(/friendsAtTheTable.png)',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: 602,
                        }}
                    />
                    <div className="flex ml-[100px] lg:m-0 lg:items-center flex-col">
                        <h2 className="text-heading-xl lg:text-heading-s leading-[60px] lg:leading-[30px] lg:my-6 mb-12 lg:uppercase">
                            Become a passionate host
                        </h2>
                        <div className="flex lg:mt-8 lg:mt-0 mt-10 lg:flex-col gap-6 flex-col justify-center lg:items-center">
                            <PEBulletPoint
                                icon={Icon.dishes}
                                title={'food'}
                                text={'Send your booking request and receive a response within 48 hours'}
                            />
                            <PEBulletPoint
                                icon={Icon.dishes}
                                title={'food'}
                                text={'Send your booking request and receive a response within 48 hours'}
                            />
                            <PEBulletPoint
                                icon={Icon.dishes}
                                title={'food'}
                                text={'Send your booking request and receive a response within 48 hours'}
                            />
                        </div>
                    </div>
                </div>
                <VStack className="w-full bg-yellowLight gap-8 lg:py-6 py-15 rounded-4">
                    <h2 className="text-heading-xl lg:text-heading-s lg:mb-0 lg:leading-[34px] leading-[60px] mb-12 lg:uppercase">
                        How it works
                    </h2>
                    <div className="flex w-full gap-12 lg:flex-col flex-row justify-center">
                        <VStack>
                            <Image className="object-contain" src="/chefs.png" alt="chefs" width={200} height={160} />
                            <HStack className="gap-4">
                                <span className="flex justify-center items-center bg-orange text-white p-2 rounded-2 max-h-[34px] min-w-[34px] box-border">
                                    01
                                </span>
                                <span className="max-w-[240px]">Choose a private chef or a menu in your area</span>
                            </HStack>
                        </VStack>
                        <VStack>
                            <Image className="object-contain" src="/dishes.png" alt="chefs" width={200} height={160} />
                            <HStack className="gap-4">
                                <span className="flex justify-center items-center bg-orange text-white p-2 rounded-2 max-h-[34px] min-w-[34px] box-border">
                                    02
                                </span>
                                <span className="max-w-[240px]">Choose a private chef or a menu in your area</span>
                            </HStack>
                        </VStack>
                        <VStack>
                            <Image className="object-cover" src="/customers.png" alt="chefs" width={200} height={160} />
                            <HStack className="gap-4">
                                <span className="flex justify-center items-center bg-orange text-white p-2 rounded-2 max-h-[34px] min-w-[34px] box-border">
                                    03
                                </span>
                                <span className="max-w-[240px]">Choose a private chef or a menu in your area</span>
                            </HStack>
                        </VStack>
                    </div>
                    <PEButton className="mt-12 max-w-[320px]" onClick={handleBookNow} title={'Sign in'} />
                </VStack>
                <VStack className="w-full pt-[140px] lg:py-4 pb-15 rounded-4 gap-4">
                    <h2 className="text-heading-xl lg:text-heading-s my-0 lg:uppercase">Individual preferences</h2>
                    <p className="my-0 text-center">
                        Sed tempus urn. Consecrate disciplining elite <br />
                        interpellates habitat morbid critique select et.
                    </p>
                    <VStack
                        className="w-full h-[300px] big:h-[220px] lg_min:h-[160px] md_min:h-[110px] minn:h-[80px]"
                        style={{
                            backgroundImage: 'url(/dishes_02.png)',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                    />
                </VStack>
                <VStack className="w-full">
                    <VStack className="relative w-full sm:pt-0 pt-[140px] pb-15 rounded-4 gap-4 max-w-[1190px]">
                        <div className="hidden sm:block w-full mb-12">
                            <PEPointsCard />
                        </div>
                        <HStack className="w-full">
                            <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">Most requested menus</h2>
                            <HStack className="absolute gap-4 right-0 lg:hidden">
                                <PENextButton
                                    reverse
                                    onClick={(): void =>
                                        setTabItem(
                                            MENU_TABS[(MENU_TABS.indexOf(tabItem) - 1 + MENU_TABS.length) % MENU_TABS.length] ?? 'All',
                                        )
                                    }
                                />
                                <PENextButton
                                    active
                                    onClick={(): void =>
                                        setTabItem(MENU_TABS[(MENU_TABS.indexOf(tabItem) + 1) % MENU_TABS.length] ?? 'All')
                                    }
                                />
                            </HStack>
                        </HStack>
                        <div
                            className="flex lg:justify-start justify-center gap-2 overflow-x-scroll w-full"
                            style={{ overflowY: 'initial' }}
                        >
                            {MENU_TABS.map((menu) => (
                                <PETabItem
                                    key={`${menu}_PEMenuCard`}
                                    title={menu}
                                    onClick={(): void => setTabItem(menu)}
                                    active={tabItem === menu}
                                />
                            ))}
                        </div>
                        <HStack className="flex-wrap gap-5 mt-10 sm:hidden">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <PEMenuCard
                                    key={`${item}_PEMenuCard`}
                                    title={'Menu title placeholder'}
                                    imageUrls={['/dishes_02.png']}
                                    chefProfilePictureUrl={'/picture-1.png'}
                                    pricePerPerson={120}
                                    chefFirstName={'Locale'}
                                    categories={[]}
                                />
                            ))}
                            <PEPointsCard />
                        </HStack>
                        <HStack className="flex-wrap gap-5 mt-10 sm:flex hidden">
                            {[1, 2, 3].map((item) => (
                                <PEMenuCardMobile
                                    key={`${item}_PEMenuCardMobile`}
                                    title={'Menu title placeholder'}
                                    imageUrls={['/dishes_02.png']}
                                    chefProfilePictureUrl={'/picture-1.png'}
                                    pricePerPerson={120}
                                    chefFirstName={'Locale'}
                                    categories={['Vegetarian', 'Meat', 'Vegetarian']}
                                    kitchen={'Europe'}
                                />
                            ))}
                        </HStack>
                        <PEButton
                            className="mt-10"
                            onClick={handleGoToAllMenus}
                            title="All menus"
                            iconRight={Icon.arrowNarrowWhite}
                            iconSize={16}
                        />
                    </VStack>
                </VStack>
                <VStack className="w-full">
                    <h2 className="text-heading-xl my-0 leading-15">PeopleEat Chefs in Germany</h2>
                    <VStack className="my-8 w-[600px]">
                        <PEInput type="text" placeholder="search" value={addressSearchText} onChange={setAddressSearchText} />
                    </VStack>
                </VStack>
                <PEMap
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                    style={{ height: '500px', borderRadius: 16 }}
                    location={selectedLocation}
                ></PEMap>
                <VStack className="w-full">
                    <PEButton className="mt-12 max-w-[320px]" onClick={handleFindTheMenu} title={'Find menu'} />
                </VStack>
                <VStack className="w-full">
                    <VStack className="relative w-full pt-[140px] pb-15 lg:py-15 rounded-4 gap-4 max-w-[1190px]">
                        <HStack className="w-full">
                            <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">Most Wanted Chefs</h2>
                            <HStack className="absolute gap-4 right-0 lg:hidden">
                                <PENextButton
                                    reverse
                                    onClick={(): void => {
                                        setTabItem(
                                            MENU_TABS[(MENU_TABS.indexOf(tabItem) - 1 + MENU_TABS.length) % MENU_TABS.length] ?? 'All',
                                        );
                                    }}
                                />
                                <PENextButton
                                    active
                                    onClick={(): void => {
                                        setTabItem(MENU_TABS[(MENU_TABS.indexOf(tabItem) + 1) % MENU_TABS.length] ?? 'All');
                                    }}
                                />
                            </HStack>
                        </HStack>
                        <div
                            className="flex lg:justify-start justify-center gap-2 overflow-x-scroll w-full"
                            style={{ overflowY: 'initial' }}
                        >
                            {MENU_TABS.map((menu) => (
                                <PETabItem
                                    key={`${menu}_PEChefCard`}
                                    title={menu}
                                    onClick={(): void => setTabItem(menu)}
                                    active={tabItem === menu}
                                />
                            ))}
                        </div>
                        <HStack className="flex-wrap gap-5 mt-10 sm:hidden">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <PEChefCard
                                    key={`${item}_PEChefCard`}
                                    firstName={'Locale'}
                                    profilePictureUrl={'/picture-1.png'}
                                    rank={'HOBBY'}
                                    location={'Berlin'}
                                    rating={{ average: 4.9, count: 25 }}
                                    categories={[]}
                                    kitchens={[]}
                                />
                            ))}
                        </HStack>
                        <VStack className="w-full flex-wrap gap-5 mt-10 hidden sm:flex">
                            {[1, 2, 3].map((item) => (
                                <PEChefCardMobile
                                    key={`${item}_PEChefCardMobile`}
                                    firstName={'Locale'}
                                    profilePictureUrl={'/picture-1.png'}
                                    rank={'HOBBY'}
                                    location={'Berlin'}
                                    rating={{ average: 4.9, count: 25 }}
                                    categories={['Vegetarian', 'Vegetarian']}
                                    kitchens={['Vegetarian', 'Vegetarian']}
                                />
                            ))}
                        </VStack>
                        <PEButton
                            className="mt-10"
                            onClick={handleGoToAllChefs}
                            title={'All chefs'}
                            iconRight={Icon.arrowNarrowWhite}
                            iconSize={16}
                        />
                    </VStack>
                </VStack>
                <VStack className="w-full">
                    <h2 className="text-heading-xl lg:text-rem-heading-xm my-0 lg:uppercase">Recent reviews</h2>
                    <VStack className="w-full flex-wrap gap-5 mt-10 hidden sm:flex">
                        {[1, 2].map((item) => (
                            <PEReviewCardChef
                                key={`${item}_PEReviewCardPlatform`}
                                customerFirstName={'Lolita, Mun-hen'}
                                chefFirstName={'Maxim'}
                                chefRank={'MASTER'}
                                ratingValue={'4.9'}
                                comment={
                                    'This is the first time we have booked a chef for a dinner with our friends at home. The booking was...'
                                }
                                createdAt={'June, 14 2023'}
                            />
                        ))}
                    </VStack>
                </VStack>
            </VStack>
            <PEFooter />
        </VStack>
    );
}
