import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import PEAddressCard from '../../../cards/address/PEAddressCard';
import PEMap from '../../../map/PEMap';
import PEButton from '../../../standard/buttons/PEButton';
import PECheckbox from '../../../standard/checkbox/PECheckbox';
import PECounter from '../../../standard/counter/PECounter';
import PECreditCard from '../../../standard/creditCard/PECreditCard';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PESlider from '../../../standard/slider/PESlider';
import PEAutoCompleteTextField from '../../../standard/textFields/PEAutoCompleteTextField';
import PEPasswordTextField from '../../../standard/textFields/PEPasswordTextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import { type GoogleMapsPlacesResult } from '../../home';
import { mockChefProfile, type ChefProfile } from './chef-profile.mock';

export default function ChefProfilePagePersonalTab(): ReactElement {
    const chefProfile: ChefProfile = mockChefProfile;

    const [maximumCustomers, setMaximumCustomers] = useState(12);

    const [travelExpenses, setTravelExpenses] = useState(0.42);
    const [maximumTravelDistance, setMaximumTravelDistance] = useState(12);

    const [addressSearchText, setAddressSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<GoogleMapsPlacesResult[]>([]);

    const [changedPassword, setChangedPassword] = useState('');

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

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg:my-10 gap-6">
            <HStack
                className="w-full bg-white shadow-primary box-border p-8 rounded-4"
                style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
                gap={16}
            >
                {chefProfile.user.profilePictureUrl && (
                    <Image
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={chefProfile.user.profilePictureUrl}
                        alt={chefProfile.user.profilePictureUrl}
                        width={120}
                        height={120}
                    />
                )}
                {!chefProfile.user.profilePictureUrl && (
                    <div className={classNames('bg-base rounded-2 flex justify-center items-center min-h-[120px] w-[120px]')}>
                        <PEIcon edgeLength={32} icon={Icon.profileLight} />
                    </div>
                )}

                <VStack style={{ alignItems: 'flex-start' }}>
                    <HStack className="gap-4" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <VStack style={{ alignItems: 'flex-start' }}>
                            <p className="text-heading-m my-0">{chefProfile.user.firstName}</p>
                            <p className="text-start text-text-m text-disabled my-0">{chefProfile.user.lastName}</p>
                        </VStack>
                        <PEIconButton icon={Icon.editPencil} iconSize={24} withoutShadow />
                    </HStack>
                    <HStack gap={2} className="flex-row mt-4">
                        <PEIcon icon={Icon.star} edgeLength={20} />
                        <span className="text-preBlack">{chefProfile.rating.average}</span>
                        <span className="text-disabled">({chefProfile.rating.count})</span>
                    </HStack>
                </VStack>

                <Spacer />

                <Link href="/profile" className="no-underline">
                    <PEButton
                        iconLeft={Icon.profileOrange}
                        iconSize={16}
                        type="secondary"
                        onClick={(): void => undefined}
                        title={'Switch to the customer'}
                    />
                </Link>
            </HStack>

            <HStack
                className="w-full bg-white shadow-primary box-border p-8 rounded-4"
                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <PECheckbox checked={chefProfile.isVisible} onCheckedChange={(): void => undefined} />
                <span className={classNames({ ['text-disabled']: !chefProfile.isVisible })}>Public</span>
                &nbsp;/&nbsp;
                <span className={classNames({ ['text-disabled']: chefProfile.isVisible })}>not visible</span>
            </HStack>

            <VStack
                className="w-full bg-white shadow-primary box-border p-8 rounded-4"
                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <p className="text-heading-ss w-full justify-start my-0">Bio</p>
                <VStack className="w-full gap-3">
                    <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <p className="my-0 text-text-sm-bold">Everything the customer needs to know</p>
                        <PEIconButton icon={Icon.editPencil} iconSize={24} withoutShadow />
                    </HStack>
                    <VStack
                        className="border-solid border-disabled border-[1px] p-4 rounded-3 w-full box-border"
                        style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <p className="text-start m-0">{chefProfile.biography}</p>
                    </VStack>
                </VStack>
            </VStack>

            <VStack
                className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-3"
                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <p className="text-heading-ss w-full justify-start my-0">Training</p>
                    <PEIconButton icon={Icon.plus} iconSize={24} withoutShadow />
                </HStack>
                <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <HStack className="gap-3">
                        <PEIcon icon={Icon.checkGreen} />
                        <p className="w-full justify-start m-0">Bio</p>
                    </HStack>
                    <PEIconButton icon={Icon.editPencil} iconSize={24} withoutShadow />
                </HStack>
            </VStack>

            <VStack
                className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-3"
                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <p className="text-heading-ss w-full justify-start my-0">Event Address</p>
                    <PEIconButton icon={Icon.plus} iconSize={24} withoutShadow />
                </HStack>
                <VStack className="w-full gap-3">
                    <PEAddressCard address="New York 2" title="House 1" />
                    <PEAddressCard address="New York 2" title="House 1" />
                    <PEAddressCard address="New York 2" title="House 1" />
                    <PEAddressCard address="New York 2" title="House 1" />
                </VStack>
            </VStack>

            <VStack
                className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-6"
                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <p className="text-heading-ss w-full justify-start my-0">Order details</p>
                <VStack className="w-full">
                    <HStack className="w-full" style={{ justifyContent: 'space-between' }}>
                        <HStack className="w-full" style={{ justifyContent: 'flex-start' }}>
                            <PEIcon icon={Icon.data} />
                            <p className="my-0">Travel costs per kilometer</p>
                        </HStack>
                        <p className="my-0 text-end w-full text-green text-ellipsis">{travelExpenses} EUR</p>
                    </HStack>
                    <PESlider min={0} max={1} step={0.01} value={travelExpenses} onValueChange={setTravelExpenses} />
                </VStack>

                <VStack className="w-full">
                    <HStack className="w-full" style={{ justifyContent: 'space-between' }}>
                        <HStack className="w-full" style={{ justifyContent: 'flex-start' }}>
                            <PEIcon icon={Icon.forward} />
                            <p className="my-0">Radius</p>
                        </HStack>
                        <p className="my-0 text-end w-full text-green text-ellipsis">{maximumTravelDistance} km</p>
                    </HStack>
                    <PESlider min={0} max={200} step={1} value={maximumTravelDistance} onValueChange={setMaximumTravelDistance} />
                </VStack>

                <HStack className="w-full" style={{ alignItems: 'center' }}>
                    <VStack style={{ alignItems: 'flex-start' }}>
                        <span>Max. Customers per mission</span>
                        <span>(Maximum 20)</span>
                    </VStack>
                    <Spacer />
                    <PECounter value={maximumCustomers} onValueChange={setMaximumCustomers} />
                </HStack>

                <VStack gap={16} className="w-full">
                    <p className="text-start w-full my-0">Address</p>

                    <PEAutoCompleteTextField
                        searchText={addressSearchText}
                        onSearchTextChange={handleAddressSearchTextChange}
                        options={searchResults}
                        getOptionLabel={(searchResult): string => searchResult.formatted_address}
                        onOptionSelect={(selectedSearchResult): void =>
                            setSelectedLocation({
                                latitude: selectedSearchResult.geometry.location.lat,
                                longitude: selectedSearchResult.geometry.location.lng,
                            })
                        }
                        placeholder={'Location'}
                        disabled={false}
                        startContent={undefined}
                    />

                    <PEMap
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                        style={{ height: '500px', borderRadius: 16 }}
                        location={selectedLocation}
                    />
                </VStack>
            </VStack>

            <HStack className="w-full gap-6">
                <VStack
                    className="w-full relative bg-white shadow-primary box-border p-8 rounded-4 gap-3"
                    style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <p className="text-heading-ss w-full justify-start my-0">Payment details</p>
                    <p className="w-full justify-start mt-6 mb-0">Card</p>
                    <PECreditCard label="Mastercard" number="*1234" />
                    <HStack className="mt-6">
                        <PEButton
                            fontSize={'text-text-m'}
                            className="min-w-[300px]"
                            onClick={(): void => undefined}
                            title="Add card"
                            type="secondary"
                        />
                    </HStack>
                </VStack>
                <VStack
                    className="w-full relative bg-white shadow-primary box-border p-8 rounded-4 gap-3"
                    style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <p className="text-heading-ss w-full justify-start my-0">Password</p>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Password</p>
                        <PEPasswordTextField password={changedPassword} onChange={setChangedPassword} placeholder={'Password'} />
                    </VStack>

                    <HStack className="mt-6">
                        <PEButton
                            fontSize={'text-text-m'}
                            className="min-w-[300px]"
                            onClick={(): void => undefined}
                            title="Change password"
                            type="secondary"
                        />
                    </HStack>
                </VStack>
            </HStack>
        </VStack>
    );
}
