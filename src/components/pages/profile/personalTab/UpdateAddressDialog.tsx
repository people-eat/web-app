import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import List from '@mui/material/List';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState, type ReactElement } from 'react';
import { DeleteOneUserAddressDocument, UpdateOneUserAddressDocument } from '../../../../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../../../../data-source/searchAddress';
import useResponsive from '../../../../hooks/useResponsive';
import { type Location } from '../../../../shared-domain/Location';
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
        location: Location;
    };
}

export default function UpdateAddressDialog({ open, userId, onSuccess, onCancel, address }: UpdateAddressDialogProps): ReactElement {
    const { isMobile } = useResponsive();
    const { t: translateCommon } = useTranslation('common');
    const { t: translateAddress } = useTranslation('address');

    const [title, setTitle] = useState(address.title);
    const [postCode, setPostCode] = useState(address.postCode);
    const [city, setCity] = useState(address.city);
    const [street, setStreet] = useState(address.street);
    const [houseNumber, setHouseNumber] = useState(address.houseNumber);
    const [country, setCountry] = useState(address.country);

    const [location, setLocation] = useState<Location | undefined>(address.location);

    const disabled: boolean =
        title === '' ||
        postCode === '' ||
        city === '' ||
        street === '' ||
        houseNumber === '' ||
        country === '' ||
        !location ||
        (title === address.title &&
            postCode === address.postCode &&
            city === address.city &&
            street === address.street &&
            houseNumber === address.houseNumber &&
            country === address.country);

    const [deleteOneUserAddress] = useMutation(DeleteOneUserAddressDocument);

    const [updateOneUserAddress, { data, loading }] = useMutation(UpdateOneUserAddressDocument);

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
        <>
            {!isMobile && (
                <Dialog open={open} onClose={onCancel}>
                    <DialogTitle>
                        <HStack>
                            <span>{translateAddress('title-edit')}</span>
                            <Spacer />
                            <PEIconButton withoutShadow bg="white" icon={Icon.close} onClick={onCancel} iconSize={24} />
                        </HStack>
                    </DialogTitle>
                    <DialogContent>
                        {!data && (
                            <VStack
                                className="box-border p-4 md:p-0"
                                gap={32}
                                style={{ width: isMobile ? '100%' : '512px', minWidth: 320 }}
                            >
                                <VStack gap={16} style={{ width: isMobile ? '100%' : '512px' }}>
                                    <PETextField value={title} onChange={setTitle} placeholder={translateAddress('title')} type="text" />
                                    <HStack className="w-full gap-4 md:flex-col">
                                        <PETextField
                                            value={postCode}
                                            onChange={setPostCode}
                                            placeholder={translateAddress('post-code')}
                                            type="text"
                                        />
                                        <PETextField value={city} onChange={setCity} placeholder={translateAddress('city')} type="text" />
                                    </HStack>
                                    <HStack className="w-full gap-4 md:flex-col">
                                        <PETextField
                                            value={street}
                                            onChange={setStreet}
                                            placeholder={translateAddress('street')}
                                            type="text"
                                        />
                                        <PETextField
                                            value={houseNumber}
                                            onChange={setHouseNumber}
                                            placeholder={translateAddress('house-number')}
                                            type="text"
                                        />
                                    </HStack>
                                    <PETextField
                                        value={country}
                                        onChange={setCountry}
                                        placeholder={translateAddress('country')}
                                        type="text"
                                    />
                                </VStack>

                                <PEMap
                                    apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                                    style={{ height: '256px' }}
                                    location={location}
                                />

                                <HStack gap={8} className="w-full">
                                    <PEButton
                                        title={translateCommon('delete')}
                                        type="secondary"
                                        onClick={(): void =>
                                            void deleteOneUserAddress({ variables: { userId, addressId: address.addressId } }).then(
                                                (res) => res.data?.users.addresses.success && onSuccess(),
                                            )
                                        }
                                    />
                                    <PEButton
                                        title={translateCommon('save-changes')}
                                        onClick={(): void => {
                                            if (!disabled && location) {
                                                void updateOneUserAddress({
                                                    variables: {
                                                        userId,
                                                        addressId: address.addressId,
                                                        address: { title, postCode, city, street, houseNumber, country, location },
                                                    },
                                                });
                                            }
                                        }}
                                        disabled={disabled}
                                    />
                                </HStack>
                            </VStack>
                        )}
                        {loading && <CircularProgress />}
                    </DialogContent>
                </Dialog>
            )}

            {isMobile && (
                <div style={{ height: '100vh', overflowY: 'scroll' }}>
                    <Dialog
                        sx={{
                            height: '100vh',
                            width: '100%',
                            minHeight: '90%',
                            minWidth: '100%',
                            overflow: 'hidden',
                            position: 'relative',
                            '& .MuiPaper-root': {
                                margin: '5vh 0 0',
                                borderRadius: '16px 16px 0 0',
                                padding: '16px',
                                boxSizing: 'border-box',
                                minHeight: '95vh',
                                minWidth: '100%',
                            },
                        }}
                        open={open}
                        onClose={onCancel}
                    >
                        <List
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexDirection: 'column',
                                minHeight: '90%',
                                minWidth: '100%',
                                height: '80vh',
                            }}
                        >
                            <DialogTitle>
                                <HStack>
                                    <span>{translateAddress('title-edit')}</span>
                                    <Spacer />
                                    <PEIconButton withoutShadow bg="white" icon={Icon.close} onClick={onCancel} iconSize={24} />
                                </HStack>
                            </DialogTitle>
                            <DialogContent>
                                {!data && (
                                    <VStack
                                        className="box-border p-4 md:p-0"
                                        gap={32}
                                        style={{ width: isMobile ? '100%' : '512px', minWidth: 320 }}
                                    >
                                        <VStack gap={16} style={{ width: isMobile ? '100%' : '512px' }}>
                                            <PETextField
                                                value={title}
                                                onChange={setTitle}
                                                placeholder={translateAddress('popup-addresses-title')}
                                                type="text"
                                            />
                                            <PETextField
                                                value={country}
                                                onChange={setCountry}
                                                placeholder={translateAddress('country')}
                                                type="text"
                                            />
                                            <div className="w-full flex flex-row gap-4 md:flex-col">
                                                <PETextField
                                                    value={city}
                                                    onChange={setCity}
                                                    placeholder={translateAddress('city')}
                                                    type="text"
                                                />
                                                <PETextField
                                                    value={postCode}
                                                    onChange={setPostCode}
                                                    placeholder={translateAddress('post-code')}
                                                    type="text"
                                                />
                                            </div>
                                            <div className="w-full flex flex-row gap-4 md:flex-col">
                                                <PETextField
                                                    value={street}
                                                    onChange={setStreet}
                                                    placeholder={translateAddress('street')}
                                                    type="text"
                                                />
                                                <PETextField
                                                    value={houseNumber}
                                                    onChange={setHouseNumber}
                                                    placeholder={translateAddress('house-number')}
                                                    type="text"
                                                />
                                            </div>
                                        </VStack>

                                        <PEMap
                                            apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                                            style={{ height: '256px' }}
                                            location={location}
                                        />

                                        <HStack gap={8} className="w-full">
                                            <PEButton
                                                title={translateCommon('delete')}
                                                type="secondary"
                                                onClick={(): void =>
                                                    void deleteOneUserAddress({ variables: { userId, addressId: address.addressId } }).then(
                                                        (res) => res.data?.users.addresses.success && onSuccess(),
                                                    )
                                                }
                                            />
                                            <PEButton
                                                title={translateCommon('save-changes')}
                                                onClick={(): void => {
                                                    if (!disabled && location) {
                                                        void updateOneUserAddress({
                                                            variables: {
                                                                userId,
                                                                addressId: address.addressId,
                                                                address: { title, postCode, city, street, houseNumber, country, location },
                                                            },
                                                        });
                                                    }
                                                }}
                                                disabled={disabled}
                                            />
                                        </HStack>
                                    </VStack>
                                )}
                                {loading && <CircularProgress />}
                            </DialogContent>
                        </List>
                    </Dialog>
                </div>
            )}
        </>
    );
}
