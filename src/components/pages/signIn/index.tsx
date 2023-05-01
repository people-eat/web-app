import { useMutation } from '@apollo/client';
import { Button, Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { AssignOneSessionByEmailAddressDocument } from '../../../data-source/generated/graphql';
import { Icon } from '../../standard/icon/Icon';
import PEIconButton from '../../standard/iconButton/PEIconButton';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export default function SignInPage(): ReactElement {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');

    const [assignOneSessionByEmailAddress, { data, loading, error }] = useMutation(AssignOneSessionByEmailAddressDocument, {
        variables: {
            request: {
                emailAddress,
                password,
                platform: 'BROWSER',
                title: '',
            },
        },
    });

    if (loading) return <>Loading...</>;

    if (error) return <>Error</>;

    if (data) console.log(data);

    return (
        <HStack style={{ height: '100%' }}>
            <VStack style={{ flex: 1, padding: '32px', overflowY: 'scroll' }}>
                <VStack style={{ gap: '32px', width: '100%', maxWidth: '800px' }}>
                    <HStack style={{ width: '100%' }}>
                        <Image src={'/people-eat-logo-title.png'} alt="" width={203} height={46} />
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

                    <Button variant="contained" style={{ width: '100%' }} onClick={(): any => assignOneSessionByEmailAddress()}>
                        Sign in
                    </Button>

                    <HStack style={{ alignItems: 'center' }}>
                        No profile yet? &nbsp;
                        <Link href={'/sign-up'}>
                            <Button>Register here</Button>
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
