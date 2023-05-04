import { useMutation } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import PEButton from '~/components/standard/buttons/PEButton';
import PECheckbox from '~/components/standard/checkbox/PECheckbox';
import PEInput from '~/components/standard/input/PEInput';
import { AssignOneSessionByEmailAddressDocument } from '../../../data-source/generated/graphql';
import PELineButton from '../../standard/buttons/PELineButton';
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
                    <HStack style={{ width: '100%', maxWidth: '400px' }}>
                        <Image src={'/people-eat-logo-title.png'} alt="" width={203} height={46} />
                        <Spacer />
                    </HStack>

                    <VStack style={{ width: '100%', maxWidth: '400px', alignItems: 'flex-start', marginTop: '100px' }}>
                        <h2 className={'text-heading-xl my-1'}>Find a private chef!</h2>
                        <p className={'text-preBlack my-1'}>Please enter your details</p>
                    </VStack>

                    <HStack style={{ gap: '32px' }}>
                        <PEIconButton icon={Icon.appleWhiteIcon} size={'54px'} bg={'#000'} iconSize={24} />
                        <PEIconButton icon={Icon.facebook} size={'54px'} bg={'#3B5998'} iconSize={48} />
                        <PEIconButton icon={Icon.google} size={'54px'} bg={'#F5F5F5'} iconSize={24} />
                    </HStack>

                    <HStack style={{ width: '100%', maxWidth: '400px', alignItems: 'center', gap: '32px' }}>
                        <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                        <p>with</p>
                        <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                    </HStack>

                    <VStack style={{ width: '100%', maxWidth: '400px', alignItems: 'flex-start' }}>
                        <p>Email</p>
                        <PEInput value={emailAddress} onChange={setEmailAddress} type={'email'} placeholder={'Enter your email'} />
                    </VStack>

                    <VStack style={{ width: '100%', maxWidth: '400px', alignItems: 'flex-start' }}>
                        <p>Password</p>
                        <PEInput type={'password'} value={password} onChange={setPassword} placeholder={'Enter your email'} />
                    </VStack>

                    <HStack style={{ width: '400px' }}>
                        <HStack className={'items-center'}>
                            <PECheckbox defaultChecked />
                            <p>Remember me</p>
                        </HStack>
                        <Spacer />
                        <div style={{ flex: 1 }}></div>
                        <PELineButton
                            title={'Forgot password?'}
                            fontSize={'text-text-m'}
                            onClick={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
                    </HStack>

                    <PEButton className={'w-full max-w-[400px]'} title={'Sign in'} onClick={(): any => assignOneSessionByEmailAddress()} />

                    <HStack style={{ alignItems: 'center' }}>
                        <p className={'text-disabled'}>No profile yet? &nbsp;</p>
                        <Link href={'/sign-up'} className={'no-underline'}>
                            <PELineButton
                                title={'Register here'}
                                fontSize={'text-text-m'}
                                onClick={function (): void {
                                    throw new Error('Function not implemented.');
                                }}
                            />
                        </Link>
                    </HStack>
                </VStack>
            </VStack>

            <VStack style={{ flex: 1, backgroundImage: 'url(/picture-1.png)', backgroundPosition: 'center', backgroundSize: 'cover' }}>
                <Spacer />
                <VStack
                    style={{
                        width: 'calc(100% - 64px)',
                        margin: '42px',
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
