import { Button, FormControlLabel, FormGroup } from '@mui/material';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import PEHeader from '../../header/PEHeader';
import PEHeaderMobile from '../../header/PEHeaderMobile';
import PEMap from '../../map/PEMap';
import { GoogleMapsPlacesResult } from '../../pages/home';
import PECheckbox from '../../standard/checkbox/PECheckbox';
import PECounter from '../../standard/counter/PECounter';
import PEDropdown from '../../standard/dropdown/PEDropdown';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import PEIconButton from '../../standard/iconButton/PEIconButton';
import PESlider from '../../standard/slider/PESlider';
import PEAutoCompleteTextField from '../../standard/textFields/PEAutoCompleteTextField';
import PEEmailTextField from '../../standard/textFields/PEEmailTextField';
import PEMultiLineTextField from '../../standard/textFields/PEMultiLineTextField';
import PEPasswordTextField from '../../standard/textFields/PEPasswordTextField';
import PEPhoneNumberTextField from '../../standard/textFields/PEPhoneNumberTextField';
import PETextField from '../../standard/textFields/PETextField';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export default function CookSignUpPage(): ReactElement {
    const { isMobile } = useResponsive();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const [description, setDescription] = useState('');
    const [maximumCustomers, setMaximumCustomers] = useState(12);

    const [travelExpenses, setTravelExpenses] = useState(0.42);
    const [maximumTravelDistance, setMaximumTravelDistance] = useState(12);

    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const [addressSearchText, setAddressSearchText] = useState('');
    const [searchResults, setSearchResults] = useState<GoogleMapsPlacesResult[]>([]);

    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');

    const router = useRouter();

    const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number } | undefined>(undefined);

    function handleAddressSearchTextChange(changedSearchText: string): void {
        setAddressSearchText(changedSearchText);

        if (!changedSearchText) {
            setSearchResults([]);
            return;
        }

        fetch(
            encodeURI(
                'google-places-api/place/textsearch/json?query="' +
                    addressSearchText +
                    '"&key=' +
                    (process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''),
            ),
        )
            .then((response) => response.json())
            .then((body: { results: GoogleMapsPlacesResult[] }) => setSearchResults(body.results))
            .catch((error) => console.error(error));
    }

    function handleSearch(): void {
        router
            .push({ pathname: '/individual-request', query: { addressSearchText } })
            .then()
            .catch((error) => console.error(error));
    }

    return (
        <VStack className="w-full">
            {isMobile ? <PEHeaderMobile /> : <PEHeader />}

            <VStack className="w-full max-w-5xl mt-[80px] p-4 box-border" style={{ gap: 32, marginBottom: 64 }}>
                <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                    <h1 className="my-0">Chef Registration</h1>
                    <p className="my-2">Please enter your details</p>
                </VStack>

                <div className="flex w-full gap-4 md:flex-col">
                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>First Name</p>
                        <PETextField value={firstName} onChange={setFirstName} type="text" placeholder={'First name'} />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Last Name</p>
                        <PETextField value={lastName} onChange={setLastName} type={'text'} placeholder={'Last name'} />
                    </VStack>
                </div>

                <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                    <VStack className="w-[200px] h-[200px] hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition border-solid border-[1px] border-disabled justify-center rounded-4">
                        <PEIcon icon={Icon.plus} />
                    </VStack>
                </VStack>

                <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                    <p>PeopleEat Level</p>
                    <PEDropdown expanded title="Hobby Chef" items={['Hobby Chef', 'Chef', 'Master Chef']} singleSelector />
                </VStack>

                <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                    <p>Profile Description</p>
                    <PEMultiLineTextField
                        value={description}
                        onChange={(value): void => {
                            setDescription(value);
                        }}
                        placeholder="Create a profile description. Tell us about your experience and skills."
                    />
                </VStack>

                <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                    <p>Language</p>
                    <PEDropdown expanded title="Language" items={['English', 'Russian', 'Deutsch']} />
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
                    <PECounter value={maximumCustomers} onValueChange={setMaximumCustomers} />
                </HStack>

                <VStack gap={16} className="w-full">
                    <p className="text-start w-full my-0">Address</p>

                    <PEAutoCompleteTextField
                        searchText={addressSearchText}
                        onSearchTextChange={handleAddressSearchTextChange}
                        options={searchResults}
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
                        endContent={<PEIconButton withoutShadow iconSize={24} icon={Icon.search} onClick={handleSearch}></PEIconButton>}
                    />

                    <PEMap
                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                        style={{ height: '500px', borderRadius: 16 }}
                        location={selectedLocation}
                    ></PEMap>
                </VStack>

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
                            sx={{ '& span': { fontSize: '14px' } }}
                            control={<PECheckbox checked={acceptedPrivacyPolicy} onCheckedChange={setAcceptedPrivacyPolicy} />}
                            label="I have read and accept the Privacy Policy"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            sx={{ '& span': { fontSize: '14px' } }}
                            control={<PECheckbox checked={acceptedTerms} onCheckedChange={setAcceptedTerms} />}
                            label="I have read and accept the Terms and Conditions"
                        />
                    </FormGroup>
                </VStack>

                <Button variant="contained" style={{ width: '100%' }}>
                    Complete
                </Button>
            </VStack>
        </VStack>
    );
}
