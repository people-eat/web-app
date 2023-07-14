import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import List from '@mui/material/List';
import Slide from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';
import useTranslation from 'next-translate/useTranslation';
import { forwardRef, useEffect, useState, type ReactElement, type Ref } from 'react';
import { CreateOneUserAddressDocument } from '../../../../data-source/generated/graphql';
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

export interface CreateAddressDialogProps {
    open: boolean;
    userId: string;
    onSuccess: () => void;
    onCancel: () => void;
}

export const Transition = forwardRef(function Transition(props: TransitionProps & { children: ReactElement<any, any> }, ref: Ref<unknown>) {
    return (
        <Slide direction="up" ref={ref} {...props}>
            {props.children}
        </Slide>
    );
});

export default function CreateAddressDialog({ open, userId, onSuccess, onCancel }: CreateAddressDialogProps): ReactElement {
    const { isMobile } = useResponsive();
    const { t: translateCommon } = useTranslation('common');
    const { t: translateAddress } = useTranslation('address');

    const [title, setTitle] = useState('');
    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [country, setCountry] = useState('Deutschland');

    const [location, setLocation] = useState<Location | undefined>(undefined);

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
                    latitude: location?.latitude ?? 49,
                    longitude: location?.longitude ?? 8,
                },
            },
        },
    });

    if (data?.users.addresses.success) onSuccess();

    useEffect(() => {
        setLocation(undefined);
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
                <Dialog open={open} onClose={onCancel} TransitionComponent={Transition} keepMounted>
                    <DialogTitle>
                        <HStack>
                            <span>{translateAddress('title-add')}</span>
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

                                <PEButton
                                    title={translateCommon('save')}
                                    onClick={(): void => void createOneUserAddress()}
                                    disabled={disabled || !location}
                                />
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
                        aria-describedby="alert-dialog-slide-description"
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
                            <DialogTitle sx={{ padding: 0 }}>
                                <HStack>
                                    <span>{translateAddress('title-add')}</span>
                                    <Spacer />
                                    <PEIconButton withoutShadow bg="white" icon={Icon.close} onClick={onCancel} iconSize={24} />
                                </HStack>
                            </DialogTitle>
                            <DialogContent sx={{ padding: '30px 0' }}>
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
                                                placeholder={translateAddress('title')}
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

                                        <PEButton
                                            title={translateCommon('save')}
                                            onClick={(): void => void createOneUserAddress()}
                                            disabled={disabled || !location}
                                        />
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
