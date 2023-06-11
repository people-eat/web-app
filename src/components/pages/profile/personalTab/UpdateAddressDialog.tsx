import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState, type ReactElement } from 'react';
import { CreateOneUserAddressDocument, DeleteOneUserAddressDocument } from '../../../../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../../../../data-source/searchAddress';
import PEMap from '../../../map/PEMap';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

export interface UpdateAddressDialogProps {
    // consider removing open, parent should decide
    open: boolean;
    onSuccess: () => void;
    onCancel: () => void;

    userId: string;
    address: {
        addressId: string;
        title: string;
        country: string;
        city: string;
        postCode: string;
        street: string;
        houseNumber: string;
        createdAt: Date;
        location: { latitude: number; longitude: number };
    };
}

export default function UpdateAddressDialog({ open, userId, onSuccess, onCancel, address }: UpdateAddressDialogProps): ReactElement {
    const [title, setTitle] = useState(address.title);
    const [postCode, setPostCode] = useState(address.postCode);
    const [city, setCity] = useState(address.city);
    const [street, setStreet] = useState(address.street);
    const [houseNumber, setHouseNumber] = useState(address.houseNumber);
    const [country, setCountry] = useState(address.country);

    const [location, setLocation] = useState<{ latitude: number; longitude: number } | undefined>(address.location);

    const disabled: boolean =
        title === '' ||
        postCode === '' ||
        city === '' ||
        street === '' ||
        houseNumber === '' ||
        country === '' ||
        title === address.title ||
        postCode === address.postCode ||
        city === address.city ||
        street === address.street ||
        houseNumber === address.houseNumber ||
        country === address.country;

    const [deleteOneUserAddress] = useMutation(DeleteOneUserAddressDocument);

    const [createOneUserAddress, { data, loading }] = useMutation(CreateOneUserAddressDocument, {
        variables: {
            userId,
            address: {
                title,
                postCode,
                city,
                street,
                houseNumber,
                country,
                location: {
                    latitude: location?.latitude ?? 49,
                    longitude: location?.longitude ?? 8,
                },
            },
        },
    });

    if (data?.users.addresses.success) onSuccess();

    useEffect(() => {
        if (!disabled) {
            searchAddress(`${postCode} ${city}, ${street} ${houseNumber}, ${country}`, ([firstSearchResult]: GoogleMapsPlacesResult[]) => {
                if (firstSearchResult) {
                    setLocation({
                        latitude: firstSearchResult.geometry.location.lat,
                        longitude: firstSearchResult.geometry.location.lng,
                    });
                }
            });
        }
    }, [postCode, city, street, houseNumber, country, disabled]);

    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>
                <HStack>
                    <span>Edit Address</span>
                    <Spacer />
                    <PEIconButton withoutShadow bg="white" icon={Icon.close} onClick={onCancel} iconSize={24} />
                </HStack>
            </DialogTitle>
            <DialogContent>
                {!data && (
                    <VStack gap={32} style={{ padding: '16px', width: '512px' }}>
                        <VStack gap={8} style={{ width: '512px' }}>
                            <PETextField value={title} onChange={setTitle} placeholder={'Title'} type="text" />
                            <PETextField value={country} onChange={setCountry} placeholder={'Country'} type="text" />
                            <PETextField value={postCode} onChange={setPostCode} placeholder={'Post Code'} type="text" />
                            <PETextField value={city} onChange={setCity} placeholder={'City'} type="text" />
                            <PETextField value={street} onChange={setStreet} placeholder={'Street'} type="text" />
                            <PETextField value={houseNumber} onChange={setHouseNumber} placeholder={'House Number'} type="text" />
                        </VStack>

                        <PEMap
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                            style={{ height: '256px' }}
                            location={location}
                        />

                        <HStack gap={8} className="w-full">
                            <PEButton
                                title="Delete"
                                type="secondary"
                                onClick={(): void =>
                                    void deleteOneUserAddress({ variables: { userId, addressId: address.addressId } }).then(
                                        (res) => res.data?.users.addresses.success && onSuccess(),
                                    )
                                }
                            />
                            <PEButton
                                title="Save changes"
                                onClick={(): void => void createOneUserAddress()}
                                disabled={disabled || !location}
                            />
                        </HStack>
                    </VStack>
                )}
                {loading && <CircularProgress />}
            </DialogContent>
        </Dialog>
    );
}
