import { useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type ReactElement } from 'react';
import { GetCookProfileQueryDocument } from '../../../../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../../../../data-source/searchAddress';
import PEAddressCard from '../../../cards/address/PEAddressCard';
import PEMap from '../../../map/PEMap';
import PEButton from '../../../standard/buttons/PEButton';
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
import CreateAddressDialog from '../../profile/personalTab/CreateAddressDialog';

export default function ChefProfilePagePersonalTab({ cookId }: { cookId: string }): ReactElement {
    const { t: commonTranslate } = useTranslation('common');

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
                    <HStack className="w-full bg-white shadow-primary box-border p-8 rounded-4" gap={16}>
                        {chefProfile.user.profilePictureUrl && (
                            <Image
                                style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                src={chefProfile.user.profilePictureUrl}
                                alt={'Profile Picture'}
                                width={120}
                                height={120}
                            />
                        )}

                        {!chefProfile.user.profilePictureUrl && (
                            <div className="bg-base rounded-2 flex justify-center items-center min-h-[120px] w-[120px]">
                                <PEIcon edgeLength={32} icon={Icon.profileLight} />
                            </div>
                        )}

                        <VStack style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <HStack className="gap-4" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <VStack style={{ alignItems: 'flex-start' }}>
                                    <p className="text-heading-m my-0">{chefProfile.user.firstName}</p>
                                    <p className="text-start text-text-m text-disabled my-0">{chefProfile.user.lastName}</p>
                                </VStack>
                                <PEIconButton icon={Icon.editPencil} iconSize={24} withoutShadow />
                            </HStack>
                            <span>{commonTranslate(chefProfile.rank)}</span>
                        </VStack>

                        <Spacer />

                        <VStack style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Link href="/profile" className="no-underline">
                                <PEButton
                                    iconLeft={Icon.profileOrange}
                                    iconSize={16}
                                    type="secondary"
                                    onClick={(): void => undefined}
                                    title={'Customer Profile'}
                                />
                            </Link>

                            <HStack gap={2} className="flex-row mt-4">
                                <PEIcon icon={Icon.star} edgeLength={20} />
                                <span className="text-preBlack">{5.0}</span>
                                <span className="text-disabled">({0})</span>
                            </HStack>
                        </VStack>
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
                                <p className="text-start m-0">{biography}</p>
                            </VStack>
                        </VStack>
                    </VStack>

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
