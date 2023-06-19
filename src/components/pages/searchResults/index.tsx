import moment from 'moment';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import { type CookRank } from '../../../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../../../data-source/searchAddress';
import { type SignedInUser } from '../../../shared/SignedInUser';
import PEChefCard from '../../cards/chefCard/PEChefCard';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEToggle from '../../standard/buttons/PEToggle';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';
import HomePageSearch from '../home/search/HomePageSearch';

export interface SearchResultsPageProps {
    signedInUser?: SignedInUser;
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
    searchResults: {
        publicCooks: {
            cookId: string;
            user: {
                firstName: string;
                profilePictureUrl?: string;
            };
            rank: CookRank;
            biography: string;
            location: { latitude: number; longitude: number };
            createdAt: Date;
        }[];
    };
}

export default function SearchResultsPage({ signedInUser, searchParameters, searchResults }: SearchResultsPageProps): ReactElement {
    const router = useRouter();
    // const { t } = useTranslation('search-results');

    const [searchResultKind, setSearchResultKind] = useState<'chefs' | 'menus'>('chefs');

    const [address, setAddress] = useState(searchParameters.location.address);
    const [addressSearchResults, setAddressSearchResults] = useState<GoogleMapsPlacesResult[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number }>(searchParameters.location);

    const [adults, setAdults] = useState(searchParameters.adults);
    const [children, setChildren] = useState(searchParameters.children);
    const [date, setDate] = useState(moment(searchParameters.date));
    const formattedDate: string = date.format(moment.HTML5_FMT.DATE);

    function onSearch(): void {
        const { latitude, longitude } = selectedLocation;

        void router.push({
            pathname: '/search-results',
            query: { address, latitude, longitude, adults, children, date: formattedDate },
        });
    }

    return (
        <VStack className="w-full p-4 box-border" style={{ gap: 80 }}>
            <PEHeader signedInUser={signedInUser} />

            <VStack className="w-full max-w-screen-xl lg:p-4 box-border" style={{ gap: 64, alignItems: 'flex-start' }}>
                <HStack style={{ justifyContent: 'space-between' }} className="w-full">
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

                    <HStack gap={8}>
                        <PEToggle title="Chefs" active={searchResultKind === 'chefs'} onClick={(): void => setSearchResultKind('chefs')} />
                        <PEToggle title="Menus" active={searchResultKind === 'menus'} onClick={(): void => setSearchResultKind('menus')} />
                    </HStack>
                </HStack>

                <HStack
                    className="w-full"
                    style={{
                        gap: 16,
                        flexWrap: 'wrap',
                        justifyContent: 'flex-start',
                    }}
                >
                    {searchResultKind === 'chefs' &&
                        searchResults.publicCooks.map((publicCook, index) => (
                            <Link href={'chefs/' + publicCook.cookId} key={index} className="no-underline">
                                <PEChefCard
                                    firstName={publicCook.user.firstName}
                                    profilePictureUrl={publicCook.user.profilePictureUrl}
                                    rank={publicCook.rank}
                                    location={'Location'}
                                    rating={{ average: 5, count: 12 }}
                                    categories={[]}
                                    kitchens={[]}
                                />
                            </Link>
                        ))}
                </HStack>
            </VStack>

            <PEFooter />
        </VStack>
    );
}
