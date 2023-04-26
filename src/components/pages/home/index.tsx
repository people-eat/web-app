import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useState, type ReactElement } from 'react';
import PEChefCard from '../../cards/chefCard/PEChefCard';
import PEMenuCard from '../../cards/menuCard/PEMenuCard';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEMap from '../../map/PEMap';
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

    const [addressSearchText, setAddressSearchText] = useState('');
    const [adultCount, setAdultCount] = useState(4);
    const [tabItem, setTabItem] = useState('All');
    const [childrenCount, setChildrenCount] = useState(0);
    const [date, setDate] = useState(moment());
    const [searchResults, setSearchResults] = useState<GoogleMapsPlacesResult[]>([]);

    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

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

    return (
        <VStack className="w-full">
            <PEHeader />
            <VStack className="w-[calc(100%-32px)] max-w-screen-xl" style={{ margin: '32px', alignItems: 'flex-start', gap: 32 }}>
                <VStack
                    className="w-full relative overflow-hidden"
                    style={{
                        backgroundImage: 'url(/glass.png)',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        height: 602,
                        borderRadius: '16px',
                        alignItems: 'flex-start',
                        paddingLeft: '32px',
                        boxSizing: 'border-box',
                    }}
                >
                    <VStack style={{ alignItems: 'flex-start', gap: 0, maxWidth: '700px', lineHeight: '80px', marginTop: '100px' }}>
                        <h1 className="text-white text-heading-xxl m-0 p-0">{t('headline')}</h1>
                    </VStack>
                    <p className="text-white text-heading-l mb-12">{t('sub-headline')}</p>
                    <HomePageSearch
                        addressSearchText={addressSearchText}
                        onAddressSearchTextChange={(changedSearchText): void => {
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
                        onSearchResultSelect={(selectedSearchResult): void => {
                            setSelectedLocation(selectedSearchResult.location);
                            console.log({ selectedSearchResult });
                        }}
                    />
                    <div className="bottom-[-15px] left-0 absolute">
                        <Image src={'/waves.svg'} width={1300} height={58} alt={`PeopleEat waves`} />
                    </div>
                </VStack>
                <HStack className="w-full mt-10" style={{ justifyContent: 'space-evenly' }}>
                    <PEBulletPoint icon={Icon.createOrder} text={t('section-1-selling-point-1')} />
                    <PEBulletPoint icon={Icon.support24} text={t('section-1-selling-point-2')} />
                    <PEBulletPoint icon={Icon.communicationWithChef} text={t('section-1-selling-point-3')} />
                </HStack>
                <HStack className={'w-full h-[700px] my-[100px]'} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <VStack style={{ alignItems: 'flex-start' }}>
                        <h2 className={'text-heading-xl leading-[60px] mb-12'}>
                            Every occasion as a unique <br /> experience moment
                        </h2>
                        <HStack className={'gap-4 max-w-[580px] flex-wrap'} style={{ justifyContent: 'flex-start' }}>
                            {EVENTS.map((event) => (
                                <span key={event} className={'shadow-primary px-5 py-3 rounded-8 hover:cursor-default'}>
                                    {event}
                                </span>
                            ))}
                        </HStack>
                        <PEButton className={'mt-12 max-w-[320px]'} onClick={handleBookNow} title={'Book now'} />
                    </VStack>
                    <VStack
                        className={'rounded-t-[50%]'}
                        style={{
                            backgroundImage: 'url(/friendsAtTheTable.png)',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: 602,
                            width: '50%',
                        }}
                    />
                </HStack>
                <HStack className={'w-full h-[700px] my-[100px]'} style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                    <VStack
                        className={'rounded-t-[50%]'}
                        style={{
                            backgroundImage: 'url(/friendsAtTheTable.png)',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: 602,
                            width: '50%',
                        }}
                    />
                    <VStack className={'gap-8'} style={{ alignItems: 'flex-start', width: '40%' }}>
                        <h2 className={'text-heading-xl mb-12 leading-[60px]'}>
                            Become a passionate <br /> host
                        </h2>
                        <PEBulletPoint icon={Icon.dishes} text={t('section-1-selling-point-1')} />
                        <PEBulletPoint icon={Icon.usersOrange} text={t('section-1-selling-point-2')} />
                        <PEBulletPoint icon={Icon.chatDots} text={t('section-1-selling-point-3')} />
                    </VStack>
                </HStack>
                <VStack className={'w-full bg-yellowLight gap-8 py-15 rounded-4'}>
                    <h2 className={'text-heading-xl mb-12 leading-[60px]'}>How it works</h2>
                    <HStack className={'w-full gap-12'}>
                        <VStack>
                            <Image className={'object-contain'} src={'/chefs.png'} alt={'chefs'} width={200} height={160} />
                            <HStack className={'gap-4'}>
                                <span className={'bg-orange text-white p-2 rounded-2 max-h-[34px] box-border'}>01</span>
                                <span className={'max-w-[240px]'}>Choose a private chef or a menu in your area</span>
                            </HStack>
                        </VStack>
                        <VStack>
                            <Image className={'object-contain'} src={'/dishes.png'} alt={'chefs'} width={200} height={160} />
                            <HStack className={'gap-4'}>
                                <span className={'bg-orange text-white p-2 rounded-2 max-h-[34px] box-border'}>01</span>
                                <span className={'max-w-[240px]'}>Choose a private chef or a menu in your area</span>
                            </HStack>
                        </VStack>
                        <VStack>
                            <Image className={'object-cover'} src={'/customers.png'} alt={'chefs'} width={200} height={160} />
                            <HStack className={'gap-4'}>
                                <span className={'bg-orange text-white p-2 rounded-2 max-h-[34px] box-border'}>01</span>
                                <span className={'max-w-[240px]'}>Choose a private chef or a menu in your area</span>
                            </HStack>
                        </VStack>
                    </HStack>
                    <PEButton className={'mt-12 max-w-[320px]'} onClick={handleBookNow} title={'Sign in'} />
                </VStack>
                <VStack className={'w-full pt-[140px] pb-15 rounded-4 gap-4'}>
                    <h2 className={'text-heading-xl my-0 font-manrope'}>Individual preferences</h2>
                    <p className={'my-0 text-center'}>
                        Sed tempus urn. Consecrate disciplining elite <br />
                        interpellates habitat morbid critique select et.
                    </p>
                    <VStack
                        style={{
                            backgroundImage: 'url(/dishes_02.png)',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            height: 300,
                            width: '100%',
                        }}
                    />
                </VStack>
                <VStack className={'w-full'}>
                    <VStack className={'relative w-full pt-[140px] pb-15 rounded-4 gap-4 max-w-[1190px]'}>
                        <HStack className={'w-full'}>
                            <h2 className={'text-heading-xl my-0 font-manrope leading-15'}>Most requested menus</h2>
                            <HStack className={'absolute gap-4 right-0'}>
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
                        <HStack className={'gap-2'}>
                            {MENU_TABS.map((menu) => (
                                <PETabItem key={menu} title={menu} onClick={(): void => setTabItem(menu)} active={tabItem === menu} />
                            ))}
                        </HStack>
                        <HStack className={'flex-wrap gap-5 mt-10'}>
                            {[1, 2, 3, 4, 5].map((item) => (
                                <PEMenuCard
                                    key={item}
                                    title={'Menu title placeholder'}
                                    imageUrls={['/dishes_02.png']}
                                    chefProfilePictureUrl={'/picture-1.png'}
                                    pricePerPerson={120}
                                    chefFirstName={'Locale'}
                                    categories={[]}
                                />
                            ))}
                            <VStack
                                style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
                                className="w-[580px] bg-yellowLight gap-3 p-6 box-border rounded-3 shadow-primary"
                            >
                                <h2 className={'text-heading-ss my-0 font-manrope leading-15'}>Can&apos;t find the right menu?</h2>
                                <HStack className={'gap-4'}>
                                    <HStack className={'gap-2'}>
                                        <span className="justify-center items-center h-[38px] min-w-[38px] border-solid border-orange text-text-s text-orange p-[9px] rounded-2 box-border">
                                            01
                                        </span>
                                        <span className={'max-w-[240px] text-preBlack text-text-s leading-5'}>
                                            Set your budget and individual preferences
                                        </span>
                                    </HStack>
                                    <HStack className={'gap-2'}>
                                        <span className="justify-center items-center h-[38px] min-w-[38px] border-solid border-orange text-text-s text-orange p-[9px] rounded-2 box-border">
                                            02
                                        </span>
                                        <span className={'max-w-[240px] text-preBlack text-text-s leading-5'}>
                                            Confirm and vote directly with your PeopleEat boss via chat.
                                        </span>
                                    </HStack>
                                </HStack>
                                <HStack className={'gap-2'}>
                                    <span className="justify-center items-center h-[38px] min-w-[38px] border-solid border-orange text-text-s text-orange p-[9px] rounded-2 box-border">
                                        03
                                    </span>
                                    <span className={'max-w-[240px] text-preBlack text-text-s leading-5'}>
                                        Receive a personalized menu suggestion
                                    </span>
                                </HStack>
                                <PEButton
                                    className={'mt-8 max-w-[270px] bg-transparent'}
                                    type={'secondary'}
                                    onClick={(): void => undefined}
                                    title={'Send an individual request'}
                                />
                            </VStack>
                        </HStack>
                        <PEButton
                            className={'mt-10'}
                            onClick={handleGoToAllMenus}
                            title={'All menus'}
                            iconRight={Icon.arrowNarrowWhite}
                            iconSize={16}
                        />
                    </VStack>
                </VStack>
                <VStack className={'w-full'}>
                    <h2 className={'text-heading-xl my-0 leading-15'}>PeopleEat Chefs in Germany</h2>
                    <VStack className={'my-8 w-[600px]'}>
                        <PEInput type={'text'} placeholder={'search'} value={addressSearchText} onChange={setAddressSearchText} />
                    </VStack>
                </VStack>
                <PEMap
                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                    style={{ height: '500px', borderRadius: 16 }}
                    location={selectedLocation}
                ></PEMap>
                <VStack className={'w-full'}>
                    <PEButton className={'mt-12 max-w-[320px]'} onClick={handleFindTheMenu} title={'Find menu'} />
                </VStack>
                <VStack className={'w-full'}>
                    <VStack className={'relative w-full pt-[140px] pb-15 rounded-4 gap-4 max-w-[1190px]'}>
                        <HStack className={'w-full'}>
                            <h2 className={'text-heading-xl my-0 font-manrope leading-15'}>Most Wanted Chefs</h2>
                            <HStack className={'absolute gap-4 right-0'}>
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
                        <HStack className={'gap-2'}>
                            {MENU_TABS.map((menu) => (
                                <PETabItem key={menu} title={menu} onClick={(): void => setTabItem(menu)} active={tabItem === menu} />
                            ))}
                        </HStack>
                        <HStack className={'flex-wrap gap-5 mt-10'}>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                                <PEChefCard
                                    key={item}
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
                        <PEButton
                            className={'mt-10'}
                            onClick={handleGoToAllChefs}
                            title={'All chefs'}
                            iconRight={Icon.arrowNarrowWhite}
                            iconSize={16}
                        />
                    </VStack>
                </VStack>
            </VStack>
            <PEFooter />
        </VStack>
    );
}
