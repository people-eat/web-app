import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import { type CookRank, type CurrencyCode } from '../../../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../../../data-source/searchAddress';
import useResponsive from '../../../hooks/useResponsive';
import { type Category } from '../../../shared-domain/Category';
import { type Kitchen } from '../../../shared-domain/Kitchen';
import { type Location } from '../../../shared-domain/Location';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEMenuCard from '../../cards/menuCard/PEMenuCard';
import PEMenuCardMobile from '../../cards/menuCard/PEMenuCardMobile';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEToggle from '../../standard/buttons/PEToggle';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import { calculateMenuPrice } from '../cookProfile/menusTab/createMenu/createMenuStep3/ChefProfilePageCreateMenuStep3';
import HomePageSearch from '../home/search/HomePageSearch';
import HomePageSearchMobile from '../home/search/HomePageSearchMobile';

export interface PublicMenusPageProps {
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
        publicMenus: {
            menuId: string;
            title: string;
            description: string;
            basePrice: number;
            basePriceCustomers: number;
            pricePerAdult: number;
            pricePerChild?: number;
            currencyCode: CurrencyCode;
            kitchen?: Kitchen;
            categories: Category[];
            imageUrls: string[];
            cook: {
                cookId: string;
                rank: CookRank;
                user: {
                    firstName: string;
                    profilePictureUrl?: string;
                };
            };
        }[];
    };
}

export default function PublicMenusPage({ signedInUser, searchParameters, searchResults }: PublicMenusPageProps): ReactElement {
    const router = useRouter();
    const { t } = useTranslation('search-results');
    const { isMobile } = useResponsive();
    const [address, setAddress] = useState(searchParameters.location.address);
    const [addressSearchResults, setAddressSearchResults] = useState<GoogleMapsPlacesResult[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<Location>(searchParameters.location);

    const [adults, setAdults] = useState(searchParameters.adults);
    const [children, setChildren] = useState(searchParameters.children);
    const [date, setDate] = useState(moment(searchParameters.date));
    const formattedDate: string = date.format(moment.HTML5_FMT.DATE);

    function onSearch(): void {
        const { latitude, longitude } = selectedLocation;

        void router.push({
            pathname: 'menus',
            query: { address, latitude, longitude, adults, children, date: formattedDate },
        });
    }

    return (
        <VStack className="w-full h-full box-border" style={{ gap: isMobile ? 24 : 80 }}>
            <PEHeader signedInUser={signedInUser} />

            <VStack className="w-full max-w-screen-xl lg:p-4 box-border" style={{ gap: 64, alignItems: 'flex-start' }}>
                <HStack
                    style={{
                        justifyContent: isMobile ? 'flex-start' : 'space-between',
                        alignItems: isMobile ? 'flex-start' : 'center',
                        flexDirection: isMobile ? 'column-reverse' : 'row',
                    }}
                    className="w-full"
                >
                    {!isMobile && (
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
                                    text: selectedSearchResult.label,
                                })
                            }
                            onSearch={onSearch}
                        />
                    )}
                    {isMobile && (
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
                                    text: selectedSearchResult.label,
                                })
                            }
                            onSearch={onSearch}
                        />
                    )}

                    <HStack gap={8}>
                        <Link href="chefs" style={{ textDecoration: 'none' }}>
                            <PEToggle title={t('cooks')} active={false} onClick={(): void => undefined} />
                        </Link>
                        <PEToggle title={t('menus')} active={true} onClick={(): void => undefined} />
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
                    {searchResults.publicMenus.map((publicMenu, index) => (
                        <Link
                            href={{
                                pathname: `menus/${publicMenu.menuId}`,
                                query: {
                                    address,
                                    latitude: selectedLocation.latitude,
                                    longitude: selectedLocation.longitude,
                                    adults,
                                    children,
                                    date: formattedDate,
                                },
                            }}
                            target="_blank"
                            key={index}
                            className="no-underline"
                            style={{ textDecoration: 'none', color: '#000' }}
                        >
                            {isMobile ? (
                                <PEMenuCardMobile
                                    title={publicMenu.title}
                                    description={publicMenu.description}
                                    imageUrls={publicMenu.imageUrls}
                                    pricePerPerson={
                                        calculateMenuPrice(
                                            adults,
                                            children,
                                            publicMenu.basePrice,
                                            publicMenu.basePriceCustomers,
                                            publicMenu.pricePerAdult,
                                            publicMenu.pricePerChild,
                                        ) /
                                        (adults + children)
                                    }
                                    currencyCode={publicMenu.currencyCode}
                                    chefFirstName={publicMenu.cook.user.firstName}
                                    chefProfilePictureUrl={publicMenu.cook.user.profilePictureUrl}
                                    categories={publicMenu.categories.map(({ title }) => title)}
                                    kitchen={publicMenu.kitchen?.title}
                                    onClick={(): void => undefined}
                                />
                            ) : (
                                <PEMenuCard
                                    title={publicMenu.title}
                                    description={publicMenu.description}
                                    imageUrls={publicMenu.imageUrls}
                                    pricePerPerson={
                                        calculateMenuPrice(
                                            adults,
                                            children,
                                            publicMenu.basePrice,
                                            publicMenu.basePriceCustomers,
                                            publicMenu.pricePerAdult,
                                            publicMenu.pricePerChild,
                                        ) /
                                        (adults + children)
                                    }
                                    currencyCode={publicMenu.currencyCode}
                                    chefFirstName={publicMenu.cook.user.firstName}
                                    chefProfilePictureUrl={publicMenu.cook.user.profilePictureUrl}
                                    categories={publicMenu.categories.map(({ title }) => title)}
                                    kitchen={publicMenu.kitchen?.title}
                                    onClick={(): void => undefined}
                                />
                            )}
                        </Link>
                    ))}
                </HStack>
            </VStack>

            <Spacer />

            <PEFooter />
        </VStack>
    );
}
