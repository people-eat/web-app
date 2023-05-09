import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useState, type ReactElement } from 'react';
import { CreateOneUserAddressDocument } from '../../../../data-source/generated/graphql';
import PEMap from '../../../map/PEMap';
import PEButton from '../../../standard/buttons/PEButton';
import PETextField from '../../../standard/textFields/PETextField';
import VStack from '../../../utility/vStack/VStack';

export interface CreateAddressDialogProps {
    open: boolean;
    userId: string;
    onSuccess: () => void;
}

export default function CreateAddressDialog({ open, userId, onSuccess }: CreateAddressDialogProps): ReactElement {
    const [title, setTitle] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [country, setCountry] = useState('');

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
                    latitude: 1,
                    longitude: 3,
                },
            },
        },
    });

    if (data?.users.addresses.success) onSuccess();

    return (
        <Dialog open={open}>
            <DialogTitle>Add Address</DialogTitle>
            <DialogContent>
                {!data && (
                    <VStack gap={8}>
                        <PETextField value={title} onChange={setTitle} placeholder={'title'} type="text" />
                        <PETextField value={postCode} onChange={setPostCode} placeholder={'postCode'} type="text" />
                        <PETextField value={city} onChange={setCity} placeholder={'city'} type="text" />
                        <PETextField value={street} onChange={setStreet} placeholder={'street'} type="text" />
                        <PETextField value={houseNumber} onChange={setHouseNumber} placeholder={'houseNumber'} type="text" />
                        <PETextField value={country} onChange={setCountry} placeholder={'country'} type="text" />

                        <PEMap
                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                            style={{ height: '256px' }}
                            location={{ latitude: 1, longitude: 9 }}
                        />

                        <PEButton title="Add Address" onClick={(): void => void createOneUserAddress()} disabled={disabled} />
                    </VStack>
                )}
                {loading && <CircularProgress />}
            </DialogContent>
        </Dialog>
    );
}
