import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { type NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '../../components/standard/icon/Icon';
import PEIcon from '../../components/standard/icon/PEIcon';
import HStack from '../../components/utility/hStack/HStack';
import Spacer from '../../components/utility/spacer/Spacer';
import VStack from '../../components/utility/vStack/VStack';

const SignUpPage: NextPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    return (
        <>
            <Head>
                <title>PeopleEat - Sign Up</title>
                <meta name="description" content="PeopleEat - Sign Up" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main style={{ display: 'flex', height: '100%' }}>
                <VStack style={{ flex: 1, padding: '32px', overflowY: 'scroll' }}>
                    <VStack style={{ gap: '32px', width: '100%', maxWidth: '800px' }}>
                        <HStack style={{ width: '100%' }}>
                            <Image src={'/people-eat-logo-title.jpeg'} alt={''} width={1429} height={376} />
                            <Spacer />
                        </HStack>

                        <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                            <h2>Find a private chef!</h2>
                            <p>Please enter your details</p>
                        </VStack>

                        <HStack style={{ gap: '32px' }}>
                            <PEIcon edgeLength={54} icon={Icon.apple} />
                            <PEIcon edgeLength={54} icon={Icon.google} />
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
                                        <Checkbox
                                            value={acceptedTerms}
                                            onChange={(event): void => setAcceptedTerms(event.target.checked)}
                                        />
                                    }
                                    label="I have read and accept the Terms and Conditions"
                                />
                            </FormGroup>
                        </VStack>

                        <Button variant="contained" style={{ width: '100%' }}>
                            Sign up
                        </Button>

                        <HStack>
                            You already have a profile? &nbsp;
                            <Link href={'/sign-in'}>Sign in here</Link>
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
            </main>
        </>
    );
};

export default SignUpPage;
