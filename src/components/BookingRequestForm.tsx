import { Divider } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import classNames from 'classnames';
import moment, { type Moment } from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, type ReactElement } from 'react';
import { type Price } from '../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../data-source/searchAddress';
import { type Allergy } from '../shared-domain/Allergy';
import { type Location } from '../shared-domain/Location';
import { type SignedInUser } from '../shared-domain/SignedInUser';
import { formatPrice } from '../shared-domain/formatPrice';
import { geoDistance } from '../utils/geoDistance';
import styles from './BookingRequestForm.module.css';
import PEButton from './standard/buttons/PEButton';
import PECounter from './standard/counter/PECounter';
import PEDropdown from './standard/dropdown/PEDropdown';
import { Icon } from './standard/icon/Icon';
import PEIcon from './standard/icon/PEIcon';
import PEIconButton from './standard/iconButton/PEIconButton';
import PEAutoCompleteTextField from './standard/textFields/PEAutoCompleteTextField';
import PEMultiLineTextField from './standard/textFields/PEMultiLineTextField';
import PETextField from './standard/textFields/PETextField';
import HStack from './utility/hStack/HStack';
import Spacer from './utility/spacer/Spacer';
import VStack from './utility/vStack/VStack';

export interface BookingRequestFormProps {
    className?: string;
    signedInUser?: SignedInUser;

    allergies: Allergy[];

    address: string;
    setAddress: (changedAddress: string) => void;

    location: Location | undefined;
    setLocation: (changedLocation: Location | undefined) => void;

    cookLocation: Location;
    cookMaximumTravelDistance?: number;

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

    onShowSignInDialog: () => void;
    onBack: () => void;
}

export default function BookingRequestForm({
    className,
    signedInUser,
    allergies,
    costs,
    onComplete,
    onShowSignInDialog,
    onBack,

    address,
    setAddress,
    location,
    setLocation,
    cookMaximumTravelDistance,
    cookLocation,
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

    useEffect(() => {
        const timeOut = setTimeout(() => {
            searchAddress(address, setAddressSearchResults);
        }, 400);

        return () => clearTimeout(timeOut);
    }, [address, setAddressSearchResults]);

    const isOutOfCookTravelRadius =
        !!cookMaximumTravelDistance &&
        location &&
        geoDistance({ location1: cookLocation, location2: location }) > cookMaximumTravelDistance;

    const disabled = location === undefined || message === '' || occasion === '' || isOutOfCookTravelRadius;

    function handleOnComplete(): void {
        if (!signedInUser) {
            onShowSignInDialog();
            return;
        }

        if (disabled) return;
        onComplete();
    }

    return (
        <div className={classNames(styles.container, 'shadow-primary rounded-4', className)}>
            <div className={styles.header}>
                <PEIconButton icon={Icon.arrowPrev} onClick={onBack} className={(styles.backButton, styles.hiddenOnDesktop)} />

                <h2 className={styles.title}>Event Details</h2>
            </div>

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

            <span>Veranstaltung</span>
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
                        minDate={moment().add(3, 'days')}
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
                onSearchTextChange={setAddress}
                // onSearchTextChange={(changedAddressSearchText: string): void => {
                //     setAddress(changedAddressSearchText);
                //     searchAddress(changedAddressSearchText, setAddressSearchResults);
                // }}
                options={addressSearchResults}
                getOptionLabel={(selectedOption: GoogleMapsPlacesResult): string => selectedOption.formatted_address}
                onOptionSelect={(selectedSearchResult: GoogleMapsPlacesResult): void =>
                    setLocation({
                        latitude: selectedSearchResult.geometry.location.lat,
                        longitude: selectedSearchResult.geometry.location.lng,
                        text: address,
                    })
                }
                placeholder={t('location')}
            />

            {isOutOfCookTravelRadius && <p style={{ color: 'red' }}>Leider außerhalb des Reiseradius des Kochs</p>}

            <PEDropdown
                title={'Allergien'}
                options={allergies}
                getOptionLabel={(allergy): string => allergy.title}
                optionsEqual={(allergyA, allergyB): boolean => allergyA.allergyId === allergyB.allergyId}
                setSelectedOptions={setSelectedAllergies}
                showSelectedCount
                selectedOptions={selectedAllergies}
            />

            <PETextField value={occasion} onChange={setOccasion} type="text" placeholder={t('occasion')} />

            <PEMultiLineTextField value={message} onChange={setMessage} placeholder={t('message')} />

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

                    <PEButton disabled={disabled} title={'Jetzt Buchen'} onClick={handleOnComplete} />
                </VStack>
            )}
        </div>
    );
}
