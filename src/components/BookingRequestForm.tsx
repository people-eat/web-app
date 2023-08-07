import { Divider } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import moment, { type Moment } from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useState, type CSSProperties, type ReactElement } from 'react';
import { type Price } from '../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../data-source/searchAddress';
import { type Allergy } from '../shared-domain/Allergy';
import { type Location } from '../shared-domain/Location';
import { type SignedInUser } from '../shared-domain/SignedInUser';
import PEButton from './standard/buttons/PEButton';
import PECounter from './standard/counter/PECounter';
import PEDropdown from './standard/dropdown/PEDropdown';
import { Icon } from './standard/icon/Icon';
import PEIcon from './standard/icon/PEIcon';
import PEAutoCompleteTextField from './standard/textFields/PEAutoCompleteTextField';
import PEEmailTextField from './standard/textFields/PEEmailTextField';
import PEMultiLineTextField from './standard/textFields/PEMultiLineTextField';
import PEPasswordTextField from './standard/textFields/PEPasswordTextField';
import PETextField from './standard/textFields/PETextField';
import HStack from './utility/hStack/HStack';
import Spacer from './utility/spacer/Spacer';
import VStack from './utility/vStack/VStack';

export interface BookingRequestFormProps {
    externalDisabled: boolean;
    style?: CSSProperties;
    signedInUser?: SignedInUser;

    allergies: Allergy[];

    address: string;
    setAddress: (changedAddress: string) => void;

    location: Location | undefined;
    setLocation: (changedLocation: Location | undefined) => void;

    addressSearchResults: GoogleMapsPlacesResult[];
    setAddressSearchResults: (changedAddressSearchResults: GoogleMapsPlacesResult[]) => void;

    adults: number;
    setAdults: (changedAdults: number) => void;

    children: number;
    setChildren: (changedChildren: number) => void;

    dateTime: Moment;
    setDateTime: (changedDateTime: Moment) => void;

    occasion: string;
    setOccasion: (changedOccasion: string) => void;

    message: string;
    setMessage: (changedMessage: string) => void;

    selectedAllergies: Allergy[];
    setSelectedAllergies: (changedSelectedAllergies: Allergy[]) => void;

    costs?: {
        lineItems: {
            title: string;
            price: Price;
        }[];
        total: Price;
    };
    onComplete: () => void;
}

export default function BookingRequestForm({
    externalDisabled,
    style,
    signedInUser,
    allergies,
    costs,
    onComplete,

    address,
    setAddress,
    location,
    setLocation,
    addressSearchResults,
    setAddressSearchResults,
    adults,
    setAdults,
    children,
    setChildren,
    dateTime,
    setDateTime,
    occasion,
    setOccasion,
    message,
    setMessage,
    selectedAllergies,
    setSelectedAllergies,
}: BookingRequestFormProps): ReactElement {
    const { t } = useTranslation('common');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formatPrice = (price: Price): string => (price.amount / 100).toFixed(2) + ' ' + price.currencyCode;

    const disabled = externalDisabled || location === undefined || message === '' || occasion === '';

    function handleOnComplete(): void {
        if (disabled) return;
        onComplete();
    }

    return (
        <VStack
            gap={16}
            style={{ width: 400, alignItems: 'flex-start', ...style }}
            className="w-full bg-white shadow-primary box-border p-8 rounded-4"
        >
            <h3 style={{ lineHeight: 0 }}>Event Details</h3>

            <span>Personen</span>
            <HStack gap={16} className="w-full">
                <PEIcon icon={Icon.users} /> <span>{'Erwachsene'}</span>
                <Spacer />
                <PECounter value={adults} onValueChange={setAdults} />
            </HStack>

            <HStack gap={16} className="w-full">
                <PEIcon icon={Icon.users} /> <span>{'Kinder'}</span>
                <Spacer />
                <PECounter value={children} onValueChange={setChildren} />
            </HStack>

            <span>Veranstaltungsdetails</span>
            <HStack gap={16}>
                <div className="w-full min-w-[calc(50% - 8px)] h-16 border-[1px] border-solid border-disabled rounded-4 px-4 py-2 box-border">
                    <DatePicker
                        sx={{ width: '100%' }}
                        value={dateTime}
                        onChange={(changedDate: Moment | null): void => {
                            if (changedDate) setDateTime(changedDate);
                        }}
                        slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                        label={t('date-label')}
                        minDate={moment().add(2, 'days')}
                    />
                </div>
                <div className="w-full min-w-[calc(50% - 8px)] h-16 border-[1px] border-solid border-disabled rounded-4 px-4 py-2 box-border">
                    <TimePicker
                        sx={{ width: '100%' }}
                        value={dateTime}
                        onChange={(changedTime: Moment | null): void => {
                            if (changedTime) setDateTime(changedTime);
                        }}
                        slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                        label={t('start-time-label')}
                    />
                </div>
            </HStack>

            <PEAutoCompleteTextField
                searchText={address}
                onSearchTextChange={(changedAddressSearchText: string): void => {
                    setAddress(changedAddressSearchText);
                    searchAddress(changedAddressSearchText, setAddressSearchResults);
                }}
                options={addressSearchResults}
                getOptionLabel={(selectedOption: GoogleMapsPlacesResult): string => selectedOption.formatted_address}
                onOptionSelect={(selectedSearchResult: GoogleMapsPlacesResult): void =>
                    setLocation({
                        latitude: selectedSearchResult.geometry.location.lat,
                        longitude: selectedSearchResult.geometry.location.lng,
                        text: address,
                    })
                }
                placeholder={t('location-placeholder-label')}
            />

            <PEDropdown
                title={'Allergien'}
                options={allergies}
                getOptionLabel={(allergy): string => allergy.title}
                optionsEqual={(allergyA, allergyB): boolean => allergyA.allergyId === allergyB.allergyId}
                setSelectedOptions={setSelectedAllergies}
                showSelectedCount
                selectedOptions={selectedAllergies}
            />

            <PETextField value={occasion} onChange={setOccasion} type="text" placeholder="Anlass" />

            <PEMultiLineTextField value={message} onChange={setMessage} placeholder={t('Nachricht')} />

            {costs && (
                <VStack gap={32} style={{ width: '100%' }}>
                    <Divider flexItem />

                    <VStack gap={16} style={{ width: '100%' }}>
                        {costs.lineItems.map((lineItem, index) => (
                            <HStack className="w-full" key={index}>
                                <span>{lineItem.title}</span>
                                <Spacer />
                                <span>{formatPrice(lineItem.price)}</span>
                            </HStack>
                        ))}

                        <Divider flexItem style={{ backgroundColor: 'rgba(255, 90, 38, 1)' }} />

                        <HStack className="w-full">
                            <span>
                                <b>Gesamtsumme</b>
                            </span>
                            <Spacer />
                            <span>
                                <b>{formatPrice(costs.total)}</b>
                            </span>
                        </HStack>
                    </VStack>

                    {signedInUser && <PEButton disabled={disabled} title={'Jetzt Buchen'} onClick={handleOnComplete} />}
                    {!signedInUser && (
                        <>
                            <Link href="sign-in" target="_blank" style={{ textDecoration: 'none', width: '100%' }}>
                                <PEButton disabled={disabled} title={'Anmelden'} onClick={(): void => undefined} />
                            </Link>

                            <HStack className="gap-8" style={{ width: '100%', alignItems: 'center' }}>
                                <div style={{ height: '1px', backgroundColor: 'lightgray', flex: 1 }}></div>
                                <p className="lg:my-2">oder</p>
                                <div style={{ height: '1px', backgroundColor: 'lightgray', flex: 1 }}></div>
                            </HStack>

                            <b>Registriere dich</b>

                            <PEEmailTextField email={email} onChange={setEmail} placeholder="Email Adresse" />

                            <PEPasswordTextField password={password} onChange={setPassword} placeholder="Passwort" />
                        </>
                    )}
                </VStack>
            )}
        </VStack>
    );
}
