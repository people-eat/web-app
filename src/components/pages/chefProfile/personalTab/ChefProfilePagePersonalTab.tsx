import { useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import classNames from 'classnames';
import { useEffect, useState, type ReactElement } from 'react';
import { GetCookProfileQueryDocument } from '../../../../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../../../../data-source/searchAddress';
import PEAddressCard from '../../../cards/address/PEAddressCard';
import PEMap from '../../../map/PEMap';
import PECheckbox from '../../../standard/checkbox/PECheckbox';
import PECounter from '../../../standard/counter/PECounter';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PESlider from '../../../standard/slider/PESlider';
import PEAutoCompleteTextField from '../../../standard/textFields/PEAutoCompleteTextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import ChefProfileSection1 from './section1/ChefProfileSection1';
import ChefProfileSection2 from './section2/ChefProfileSection2';
import ChefProfileSection3 from './section3/ChefProfileSection3';
import ChefProfileSection4 from './section4/ChefProfileSection4';
import ChefProfileSection5 from './section5/ChefProfileSection5';
import CreateAddressDialog from '../../profile/personalTab/CreateAddressDialog';

export default function ChefProfilePagePersonalTab({ cookId }: { cookId: string }): ReactElement {
    const [biography, setBiography] = useState('');

    const [maximumParticipants, setMaximumParticipants] = useState<number | undefined>(undefined);

    const [travelExpenses, setTravelExpenses] = useState(0);
    const [maximumTravelDistance, setMaximumTravelDistance] = useState<number | undefined>(undefined);

    const [addressSearchText, setAddressSearchText] = useState('');
    const [addressSearchResults, setAddressSearchResults] = useState<GoogleMapsPlacesResult[]>([]);
    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

    const [addAddressDialogOpen, setAddAddressDialogOpen] = useState(false);

    const { data, loading, error, refetch } = useQuery(GetCookProfileQueryDocument, {
        variables: { cookId },
    });

    const chefProfile = data?.cooks.findOne;

    useEffect(() => {
        if (chefProfile) setBiography(chefProfile.biography);
        if (chefProfile) setTravelExpenses(chefProfile.travelExpenses / 100);
        if (chefProfile) setMaximumTravelDistance(chefProfile.maximumTravelDistance ?? undefined);
        if (chefProfile) setMaximumParticipants(chefProfile.maximumParticipants ?? undefined);
        if (chefProfile) setSelectedLocation(chefProfile.location);
    }, [chefProfile]);

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg:my-10 gap-6">
            {chefProfile && (
                <>
                    <ChefProfileSection1 chefProfile={chefProfile} />

                    <HStack
                        className="w-full bg-white shadow-primary box-border p-8 rounded-4"
                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <PECheckbox checked={chefProfile.isVisible} onCheckedChange={(): void => undefined} />
                        <span className={classNames({ ['text-disabled']: !chefProfile.isVisible })}>Public</span>
                        &nbsp;/&nbsp;
                        <span className={classNames({ ['text-disabled']: chefProfile.isVisible })}>not visible</span>
                    </HStack>

                    <ChefProfileSection2 chefBiography={biography} cookId={cookId} />

                    <ChefProfileSection3 />

                    <ChefProfileSection4
                        chefProfile={chefProfile}
                        cookId={cookId}
                        maximumTravelDistance={maximumTravelDistance}
                        selectedLocation={selectedLocation}
                    />

                    <ChefProfileSection5 />

                    {/* <VStack
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
                    </VStack> */}

                    <VStack
                        className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-3"
                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <p className="text-heading-ss w-full justify-start my-0">My Addresses</p>
                            <PEIconButton
                                icon={Icon.plus}
                                iconSize={24}
                                withoutShadow
                                onClick={(): void => setAddAddressDialogOpen(!addAddressDialogOpen)}
                            />
                        </HStack>

                        <CreateAddressDialog
                            open={addAddressDialogOpen}
                            userId={chefProfile.cookId}
                            onSuccess={(): void => {
                                setAddAddressDialogOpen(false);
                                void refetch();
                            }}
                            onCancel={(): void => setAddAddressDialogOpen(false)}
                        />

                        <VStack className="w-full gap-3">
                            {chefProfile.user.addresses.map(({ title, city, postCode, street, houseNumber }, index) => (
                                <PEAddressCard key={index} address={`${postCode} ${city}, ${street} ${houseNumber}`} title={title} />
                            ))}
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
                            <PESlider
                                min={0}
                                max={200}
                                step={1}
                                value={maximumTravelDistance ?? 0}
                                onValueChange={setMaximumTravelDistance}
                            />
                        </VStack>

                        <HStack className="w-full" style={{ alignItems: 'center' }}>
                            <VStack style={{ alignItems: 'flex-start' }}>
                                <span>Customers limit per event</span>
                                <span>(maximum 20)</span>
                            </VStack>
                            <Spacer />
                            <PECounter value={maximumParticipants ?? 0} onValueChange={setMaximumParticipants} />
                        </HStack>

                        <VStack gap={16} className="w-full">
                            <p className="text-start w-full my-0">Address</p>

                            <PEAutoCompleteTextField
                                searchText={addressSearchText}
                                onSearchTextChange={(changedAddressSearchText: string): void => {
                                    setAddressSearchText(changedAddressSearchText);
                                    searchAddress(changedAddressSearchText, setAddressSearchResults);
                                }}
                                options={addressSearchResults}
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
                                markerRadius={(maximumTravelDistance ?? 0) * 50}
                                renderMarker
                            />
                        </VStack>
                    </VStack>
                </>
            )}

            {loading && <CircularProgress />}

            {error && <>An error ocurred</>}
        </VStack>
    );
}
