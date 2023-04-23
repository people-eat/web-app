import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIconButton from '../../standard/iconButton/PEIconButton';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export default function SignUpPage(): ReactElement {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    return (
        <HStack style={{ height: '100%' }}>
            <VStack style={{ flex: 1, padding: '32px', overflowY: 'scroll' }}>
                <VStack style={{ gap: '32px', width: '100%', maxWidth: '800px' }}>
                    <HStack style={{ width: '100%' }}>
                        <Image src={'/people-eat-logo-title.jpeg'} alt="" width={200} height={100} />
                        <Spacer />
                    </HStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <h2>Find a private chef!</h2>
                        <p>Please enter your details</p>
                    </VStack>

                    <HStack style={{ gap: '32px' }}>
                        <PEIconButton icon={Icon.apple} />
                        <PEIconButton icon={Icon.google} />
                    </HStack>

                    <HStack style={{ width: '100%', alignItems: 'center', gap: '32px' }}>
                        <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                        <p>with</p>
                        <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                    </HStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>First Name</p>
                        <TextField
                            style={{ width: '100%' }}
                            value={firstName}
                            onChange={(event): void => {
                                setFirstName(event.target.value);
                            }}
                            variant="outlined"
                        />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Last Name</p>
                        <TextField
                            style={{ width: '100%' }}
                            value={lastName}
                            onChange={(event): void => {
                                setLastName(event.target.value);
                            }}
                            variant="outlined"
                        />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Email</p>
                        <TextField
                            style={{ width: '100%' }}
                            value={emailAddress}
                            onChange={(event): void => {
                                setEmailAddress(event.target.value);
                            }}
                            variant="outlined"
                        />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Password</p>
                        <TextField
                            style={{ width: '100%' }}
                            type="password"
                            value={password}
                            onChange={(event): void => {
                                setPassword(event.target.value);
                            }}
                            variant="outlined"
                        />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Repeat Password</p>
                        <TextField
                            style={{ width: '100%' }}
                            type="password"
                            value={passwordRepeat}
                            onChange={(event): void => {
                                setPasswordRepeat(event.target.value);
                            }}
                            variant="outlined"
                        />
                    </VStack>

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
                                control={
                                    <Checkbox value={acceptedTerms} onChange={(event): void => setAcceptedTerms(event.target.checked)} />
                                }
                                label="I have read and accept the Terms and Conditions"
                            />
                        </FormGroup>
                    </VStack>

                    <Button variant="contained" style={{ width: '100%' }}>
                        Sign up
                    </Button>

                    <HStack style={{ alignItems: 'center' }}>
                        You already have a profile? &nbsp;
                        <Link href={'/sign-in'}>
                            <Button>Sign in here</Button>
                        </Link>
                    </HStack>
                </VStack>
            </VStack>

            <VStack style={{ flex: 1, backgroundImage: 'url(/picture-1.png)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <Spacer />
                <VStack
                    style={{
                        width: 'calc(100% - 64px)',
                        margin: '32px',
                        backgroundColor: 'rgba(163, 163, 163, 0.5)',
                        backdropFilter: 'blur(15px)',
                        borderRadius: '16px',
                        padding: '16px',
                        height: '256px',
                    }}
                >
                    <HStack></HStack>
                </VStack>
            </VStack>
        </HStack>
    );
}
