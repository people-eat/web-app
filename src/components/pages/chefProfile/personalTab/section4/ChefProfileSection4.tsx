import { useMutation } from '@apollo/client';
import { useState, type ReactElement } from 'react';
import { CreateOneUserAddressDocument, type CookRank } from '../../../../../data-source/generated/graphql';
import PEAddressCard from '../../../../cards/address/PEAddressCard';
import PEMap from '../../../../map/PEMap';
import PEButton from '../../../../standard/buttons/PEButton';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import PEIconButton from '../../../../standard/iconButton/PEIconButton';
import PEModalPopUp from '../../../../standard/modal/PEModalPopUp';
import PETextField from '../../../../standard/textFields/PETextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';

export interface ChefProfileSection4Props {
    selectedLocation: { latitude: number; longitude: number } | undefined;
    maximumTravelDistance: number | undefined;
    cookId: string;
    chefProfile: {
        cookId: string;
        isLocked: boolean;
        isVisible: boolean;
        biography: string;
        maximumParticipants?: number | null;
        maximumPrice?: number | null;
        maximumTravelDistance?: number | null;
        minimumParticipants?: number | null;
        minimumPrice?: number | null;
        rank: CookRank;
        travelExpenses: number;
        user: {
            firstName: string;
            lastName: string;
            profilePictureUrl?: string | null;
            addresses: Address[];
        };
    };
}

export interface Address {
    addressId: string;
    title: string;
    country: string;
    city: string;
    postCode: string;
    street: string;
    houseNumber: string;
    createdAt: Date;
    location: {
        latitude: number;
        longitude: number;
    };
}

export default function ChefProfileSection4({
    cookId,
    selectedLocation,
    maximumTravelDistance,
    chefProfile,
}: ChefProfileSection4Props): ReactElement {
    const [openPopUp, setOpenPopUp] = useState(false);
    const [editMode, _setEditMode] = useState<null | number>(null);
    const [diplomaName, setDiplomaName] = useState('');
    const [data, setData] = useState('');

    function handleAddNewAddress(): void {
        setOpenPopUp(!openPopUp);
    }

    function handleSaveAddress(): void {
        setOpenPopUp(!openPopUp);
    }

    function handleUnSaveChefName(): void {
        setOpenPopUp(!openPopUp);
    }

    const [_createNewAddress] = useMutation(CreateOneUserAddressDocument, {
        variables: {
            address: {
                city: '',
                country: '',
                houseNumber: '',
                location: {
                    latitude: 5,
                    longitude: 50.23123142,
                },
                postCode: '',
                street: '',
                title: '',
            },
            userId: cookId,
        },
    });

    return (
        <VStack
            className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-3"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <PEModalPopUp openMenu={openPopUp} handleOpenMenu={handleUnSaveChefName}>
                <VStack className="w-[750px] px-10 py-15 box-border relative">
                    <h2 className="m-0 mt-[-40px] pb-5 w-full text-heading-ss">Training</h2>
                    <p className="m-4 w-full text-heading-ss">Address name</p>
                    <VStack className="w-full gap-4" style={{ alignItems: 'flex-start' }}>
                        <PETextField
                            type={'text'}
                            value={diplomaName}
                            placeholder="Name"
                            onChange={(value): void => setDiplomaName(value)}
                        />
                        <PETextField type={'text'} placeholder={'Search'} startContent={<PEIcon icon={Icon.search} />} />
                        <PETextField type={'text'} value={data} placeholder="Data" onChange={(value): void => setData(value)} />
                        <VStack className="w-full rounded-4 overflow-hidden mt-4">
                            <PEMap
                                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                                style={{ height: '300px', borderRadius: 16 }}
                                location={selectedLocation}
                                markerRadius={(maximumTravelDistance ?? 0) * 50}
                                renderMarker
                            />
                        </VStack>
                        <VStack className="w-full">
                            {editMode ? (
                                <PEButton className="max-w-[250px]" onClick={handleSaveAddress} title="Save" />
                            ) : (
                                <PEButton className="max-w-[250px]" onClick={handleAddNewAddress} title="Add" />
                            )}
                        </VStack>
                    </VStack>
                </VStack>
            </PEModalPopUp>
            <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <p className="text-heading-ss w-full justify-start my-0">Event Address</p>
                <PEIconButton onClick={handleAddNewAddress} icon={Icon.plus} iconSize={24} withoutShadow />
            </HStack>
            <VStack className="w-full gap-3">
                {chefProfile.user.addresses.map(({ title, city, postCode, street, houseNumber }, index) => (
                    <PEAddressCard key={index} address={`${postCode} ${city}, ${street} ${houseNumber}`} title={title} />
                ))}
            </VStack>
        </VStack>
    );
}
