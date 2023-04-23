import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { type NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Icon } from '../../components/standard/icon/Icon';
import PeopleEatIcon from '../../components/standard/icon/PeopleEatIcon';
import HStack from '../../components/utility/hStack/HStack';
import Spacer from '../../components/utility/spacer/Spacer';
import VStack from '../../components/utility/vStack/VStack';

const SignInPage: NextPage = () => {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    return (
        <>
            <Head>
                <title>PeopleEat - Sign In</title>
                <meta name="description" content="PeopleEat - Sign In" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main style={{ display: 'flex', height: '100%' }}>
                <VStack style={{ flex: 1, padding: '32px', overflowY: 'scroll' }}>
                    <VStack style={{ gap: '32px', width: '100%', maxWidth: '800px' }}>
                        <HStack style={{ width: '100%' }}>
                            <Image src={'/people-eat-logo-title.jpeg'} alt={''} width={610} height={220} />
                            <Spacer />
                        </HStack>

                        <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                            <h2>Find a private chef!</h2>
                            <p>Please enter your details</p>
                        </VStack>

                        <HStack style={{ gap: '32px' }}>
                            <PeopleEatIcon edgeLength={54} icon={Icon.apple} />
                            <PeopleEatIcon edgeLength={54} icon={Icon.google} />
                        </HStack>

                        <HStack style={{ width: '100%', alignItems: 'center', gap: '32px' }}>
                            <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                            <p>with</p>
                            <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                        </HStack>

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

                        <HStack style={{ width: '100%' }}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />
                            </FormGroup>
                            <Spacer />
                            <div style={{ flex: 1 }}></div>
                            <Button>Forgot password?</Button>
                        </HStack>

                        <Button variant="contained" style={{ width: '100%' }}>
                            Sign in
                        </Button>

                        <HStack>
                            No profile yet? &nbsp;
                            <Link href={'/sign-up'}>Register here</Link>
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

export default SignInPage;
