import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useEffect, useState, type ReactElement } from 'react';
import { CreateOneUserAddressDocument } from '../../../../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../../../../data-source/searchAddress';
import PEMap from '../../../map/PEMap';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

export interface CreateAddressDialogProps {
    open: boolean;
    userId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function CreateAddressDialog({ open, userId, onSuccess, onCancel }: CreateAddressDialogProps): ReactElement {
    const [title, setTitle] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [country, setCountry] = useState('');

    const [location, setLocation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

    const disabled: boolean = title === '' || postCode === '' || city === '' || street === '' || houseNumber === '' || country === '';

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
                    latitude: 49,
                    longitude: 8,
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
                    <span>Add Address</span>
                    <Spacer />
                    <PEIconButton withoutShadow bg="white" icon={Icon.close} onClick={onCancel} iconSize={24} />
                </HStack>
            </DialogTitle>
            <DialogContent>
                {!data && (
                    <VStack gap={32} style={{ padding: '16px', width: '512px' }}>
                        <VStack gap={8} style={{ width: '512px' }}>
                            <PETextField value={title} onChange={setTitle} placeholder={'Title'} type="text" />
                            <PETextField value={postCode} onChange={setPostCode} placeholder={'Post Code'} type="text" />
                            <PETextField value={city} onChange={setCity} placeholder={'City'} type="text" />
                            <PETextField value={street} onChange={setStreet} placeholder={'Street'} type="text" />
                            <PETextField value={houseNumber} onChange={setHouseNumber} placeholder={'House Number'} type="text" />
                            <PETextField value={country} onChange={setCountry} placeholder={'Country'} type="text" />
                        </VStack>

                        <PEMap
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                            style={{ height: '256px' }}
                            location={location}
                        />

                        <PEButton title="Add Address" onClick={(): void => void createOneUserAddress()} disabled={disabled || !location} />
                    </VStack>
                )}
                {loading && <CircularProgress />}
            </DialogContent>
        </Dialog>
    );
}
