import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { useState, type ReactElement } from 'react';
import PEHeader from '../../header/PEHeader';
import PECounter from '../../standard/counter/PECounter';
import PEDropdown from '../../standard/dropdown/PEDropdown';
import PESlider from '../../standard/slider/PESlider';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export default function CookSignUpPage(): ReactElement {
    const [description, setDescription] = useState('');
    const [maximumCustomers, setMaximumCustomers] = useState(12);

    const [travelExpenses, setTravelExpenses] = useState(12);
    const [maximumTravelDistance, setMaximumTravelDistance] = useState(12);

    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    return (
        <VStack className="w-full">
            <PEHeader />

            <VStack className="w-full max-w-screen-xl" style={{ gap: 32, marginBottom: 64 }}>
                <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                    <h1>Chef Registration</h1>
                    <p>Please enter your details</p>
                </VStack>

                <PEDropdown items={[]} />

                <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                    <p>Profile Description</p>
                    <TextField
                        style={{ width: '100%' }}
                        value={description}
                        onChange={(event): void => {
                            setDescription(event.target.value);
                        }}
                        variant="outlined"
                        multiline
                    />
                </VStack>

                <PEDropdown items={[]} />

                <PESlider value={travelExpenses} onValueChange={setTravelExpenses} />
                <PESlider value={maximumTravelDistance} onValueChange={setMaximumTravelDistance} />

                <VStack style={{ width: '100%', alignItems: 'flex-start', padding: '16px', borderColor: 'gray', borderWidth: 1 }}>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value={acceptedPrivacyPolicy}
                                    onChange={(event): void => setAcceptedPrivacyPolicy(event.target.checked)}
                                />
                            }
                            label="I have read and accept the Privacy Policy"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControlLabel
                            control={<Checkbox value={acceptedTerms} onChange={(event): void => setAcceptedTerms(event.target.checked)} />}
                            label="I have read and accept the Terms and Conditions"
                        />
                    </FormGroup>
                </VStack>

                <HStack className="w-full" style={{ alignItems: 'center' }}>
                    <VStack style={{ alignItems: 'flex-start' }}>
                        <span>Maximum Customers per mission</span>
                        <span>(Maximum 20)</span>
                    </VStack>
                    <Spacer />
                    <PECounter value={maximumCustomers} onValueChange={setMaximumCustomers} />
                </HStack>

                <Button variant="contained" style={{ width: '100%' }}>
                    Complete
                </Button>
            </VStack>
        </VStack>
    );
}
