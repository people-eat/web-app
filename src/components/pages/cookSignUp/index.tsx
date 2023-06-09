import { useMutation } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState, type ReactElement } from 'react';
import { CreateOneUserByEmailAddressDocument, type CookRank } from '../../../data-source/generated/graphql';
import searchAddress, { type GoogleMapsPlacesResult } from '../../../data-source/searchAddress';
import useResponsive from '../../../hooks/useResponsive';
import { type SignedInUser } from '../../../shared/SignedInUser';
import { cookRanks } from '../../../shared/cookRanks';
import PEHeader from '../../header/PEHeader';
import PEMap from '../../map/PEMap';
import PEButton from '../../standard/buttons/PEButton';
import PECheckbox from '../../standard/checkbox/PECheckbox';
import PECounter from '../../standard/counter/PECounter';
import PEDropdown from '../../standard/dropdown/PEDropdown';
import PEImagePicker from '../../standard/filePicker/PEImagePicker';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import PESlider from '../../standard/slider/PESlider';
import PEEmailTextField from '../../standard/textFields/PEEmailTextField';
import PEPasswordTextField from '../../standard/textFields/PEPasswordTextField';
import PEPhoneNumberTextField from '../../standard/textFields/PEPhoneNumberTextField';
import PETextField from '../../standard/textFields/PETextField';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import SignUpPageSuccessDialog from '../signUp/successDialog/SignUpPageSuccessDialog';

export interface CookSignUpPageProps {
    signedInUser?: SignedInUser;
    languages: { languageId: string; title: string }[];
}

// eslint-disable-next-line max-statements
export default function CookSignUpPage({ signedInUser, languages }: CookSignUpPageProps): ReactElement {
    const { t: translateCommon } = useTranslation('common');
    const { t } = useTranslation('chef-sign-up');

    const { isMobile } = useResponsive();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [maximumParticipants, setMaximumParticipants] = useState(12);

    const [travelExpenses, setTravelExpenses] = useState(0.42);
    const [maximumTravelDistance, setMaximumTravelDistance] = useState(12);

    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);
    const [rank, setRank] = useState<CookRank>('HOBBY');

    const [postCode, setPostCode] = useState('');
    const [city, setCity] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [country, setCountry] = useState('');

    const disabled: boolean =
        firstName === '' ||
        lastName === '' ||
        password === '' ||
        passwordRepeat !== password ||
        emailAddress === '' ||
        !selectedLocation ||
        !acceptedPrivacyPolicy ||
        !acceptedTerms;

    const addressAutocompleteDisabled: boolean = postCode === '' || city === '' || street === '' || houseNumber === '' || country === '';

    useEffect(() => {
        if (!addressAutocompleteDisabled) {
            searchAddress(`${postCode} ${city}, ${street} ${houseNumber}, ${country}`, ([firstSearchResult]: GoogleMapsPlacesResult[]) => {
                if (firstSearchResult) {
                    setSelectedLocation({
                        latitude: firstSearchResult.geometry.location.lat,
                        longitude: firstSearchResult.geometry.location.lng,
                    });
                }
            });
        }
    }, [postCode, city, street, houseNumber, country, addressAutocompleteDisabled]);

    const [createOneUserByEmailAddress, { data, loading, error }] = useMutation(CreateOneUserByEmailAddressDocument, {
        variables: {
            request: {
                birthDate: undefined,
                cook: {
                    biography: '',
                    isVisible: true,
                    location: selectedLocation ?? { latitude: 0, longitude: 0 },
                    maximumParticipants,
                    maximumPrice: undefined,
                    maximumTravelDistance,
                    minimumParticipants: undefined,
                    minimumPrice: undefined,
                    rank,
                    travelExpenses: Math.floor(travelExpenses * 100),
                },
                emailAddress: emailAddress,
                firstName,
                gender: 'NO_INFORMATION',
                language: 'GERMAN',
                lastName,
                password,
                profilePictureUrl: undefined,
            },
        },
    });

    return (
        <VStack className="w-full overflow-hidden">
            <PEHeader signedInUser={signedInUser} />

            <VStack className="w-full max-w-5xl mt-[80px] p-4 box-border" style={{ gap: 32, marginBottom: 64 }}>
                <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                    <h1 className="my-0">{t('headline')}</h1>
                    <p className="my-2">Please enter your details</p>
                </VStack>

                <HStack gap={16} className="w-full" style={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <VStack gap={16} style={{ alignItems: 'flex-start', flex: 1, minWidth: 400 }}>
                        <span>{t('first-name-label')}</span>
                        <PETextField value={firstName} onChange={setFirstName} type="text" placeholder={t('first-name-label')} />

                        <span>{t('last-name-label')}</span>
                        <PETextField value={lastName} onChange={setLastName} type={'text'} placeholder={t('last-name-label')} />
                    </VStack>

                    <PEImagePicker onDownloaded={(): void => undefined} />
                </HStack>

                <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                    <p>{t('rank-label')}</p>
                    <PEDropdown
                        title={translateCommon(rank)}
                        defaultExpanded
                        options={cookRanks}
                        getOptionLabel={(rankOption): string => translateCommon(rankOption)}
                        onSelectedOptionsChange={(changedSelectedRanks): void => {
                            if (!changedSelectedRanks.length) return;
                            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                            setRank(changedSelectedRanks[0]!);
                        }}
                        singleSelector
                    />
                </VStack>

                <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                    <p>{t('languages-label')}</p>
                    <PEDropdown
                        title={t('languages-label')}
                        defaultExpanded
                        options={languages}
                        getOptionLabel={({ title }): string => title}
                        onSelectedOptionsChange={undefined}
                        singleSelector
                    />
                </VStack>

                <VStack gap={16} className="w-full">
                    <p className="text-start w-full my-0">Address</p>

                    <HStack className="w-full" gap={16} style={{ flexWrap: 'wrap' }}>
                        <VStack style={{ flex: 1 }} gap={16}>
                            <PETextField value={country} onChange={setCountry} placeholder={'Country'} type="text" autocomplete="country" />
                            <PETextField value={city} onChange={setCity} placeholder={'City'} type="text" autocomplete="city" />
                            <PETextField value={postCode} onChange={setPostCode} placeholder={'Post Code'} type="text" />
                            <HStack gap={16} className="w-full">
                                <PETextField value={street} onChange={setStreet} placeholder={'Street'} type="text" />
                                <PETextField value={houseNumber} onChange={setHouseNumber} placeholder={'House Number'} type="text" />
                            </HStack>
                        </VStack>

                        {!isMobile && (
                            <PEMap
                                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                                style={{ flex: 1 }}
                                location={selectedLocation}
                                markerRadius={(maximumTravelDistance ?? 0) * 1000}
                            />
                        )}

                        {isMobile && (
                            <PEMap
                                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                                style={{ height: 300 }}
                                location={selectedLocation}
                                markerRadius={(maximumTravelDistance ?? 0) * 1000}
                            />
                        )}
                    </HStack>
                </VStack>

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
                    <PESlider min={0} max={200} step={1} value={maximumTravelDistance} onValueChange={setMaximumTravelDistance} />
                </VStack>

                <HStack className="w-full" style={{ alignItems: 'center' }}>
                    <VStack style={{ alignItems: 'flex-start' }}>
                        <span>Max. Customers per mission</span>
                        <span>(Maximum 20)</span>
                    </VStack>
                    <Spacer />
                    <PECounter value={maximumParticipants} onValueChange={setMaximumParticipants} />
                </HStack>

                <div className="flex w-full gap-4 md:flex-col">
                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Email</p>
                        <PEEmailTextField email={emailAddress} onChange={setEmailAddress} placeholder={'Email'} />
                    </VStack>

                    <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                        <p>Phone number</p>
                        <PEPhoneNumberTextField phoneNumber={phoneNumber} onChange={setPhoneNumber} placeholder={'Phone Number'} />
                    </VStack>
                </div>

                <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                    <p>Password</p>
                    <PEPasswordTextField password={password} onChange={setPassword} placeholder={'Password'} />
                </VStack>

                <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                    <p>Repeat Password</p>
                    <PEPasswordTextField password={passwordRepeat} onChange={setPasswordRepeat} placeholder={'Repeat Password'} />
                </VStack>

                <VStack
                    style={{
                        width: '100%',
                        alignItems: 'flex-start',
                        padding: '16px',
                        border: '1px solid rgba(31, 31, 31, 0.2)',
                        boxSizing: 'border-box',
                        borderRadius: '16px',
                    }}
                >
                    <FormGroup>
                        <FormControlLabel
                            control={<PECheckbox checked={acceptedPrivacyPolicy} onCheckedChange={setAcceptedPrivacyPolicy} />}
                            label="I have read and accept the Privacy Policy"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={<PECheckbox checked={acceptedTerms} onCheckedChange={setAcceptedTerms} />}
                            label="I have read and accept the Terms and Conditions"
                        />
                    </FormGroup>
                </VStack>

                <PEButton
                    className="w-full max-w-[400px]"
                    title={'Complete'}
                    onClick={(): void => void createOneUserByEmailAddress()}
                    disabled={disabled}
                />

                {data && (
                    <Dialog open>
                        {data.users.success && <SignUpPageSuccessDialog />}
                        {!data.users.success && <>Something went wrong</>}
                    </Dialog>
                )}

                {loading && (
                    <Dialog open>
                        <DialogContent>
                            <CircularProgress />
                        </DialogContent>
                    </Dialog>
                )}

                {error && <Dialog open>An error ocurred</Dialog>}
            </VStack>
        </VStack>
    );
}
