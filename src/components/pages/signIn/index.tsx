import { useMutation } from '@apollo/client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { AssignOneSessionByEmailAddressDocument } from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';
import PEButton from '../../standard/buttons/PEButton';
import PELineButton from '../../standard/buttons/PELineButton';
import PECheckbox from '../../standard/checkbox/PECheckbox';
import { Icon } from '../../standard/icon/Icon';
import PEIconButton from '../../standard/iconButton/PEIconButton';
import PEInput from '../../standard/input/PEInput';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export default function SignInPage(): ReactElement {
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [staySignedIn, setStaySignedIn] = useState(true);
    const responsive = useResponsive();

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
                <VStack className="gap-8 lg:gap-4" style={{ width: '100%', maxWidth: '800px' }}>
                    <HStack style={{ width: '100%', maxWidth: '400px' }}>
                        <Image src={'/people-eat-logo-title.png'} alt="" width={203} height={46} />
                        <Spacer />
                    </HStack>

                    <VStack className="mt-[100px] lg:my-6" style={{ width: '100%', maxWidth: '400px', alignItems: 'flex-start' }}>
                        <h2 className="text-heading-xl lg:text-heading-s lg:mb-2 my-1">Find a private chef!</h2>
                        <p className="text-preBlack my-1">Please enter your details</p>
                    </VStack>

                    <HStack style={{ gap: '12px' }}>
                        <PEIconButton icon={Icon.appleWhiteIcon} size={'54px'} bg={'#000'} iconSize={24} />
                        <PEIconButton icon={Icon.facebook} size={'54px'} bg={'#3B5998'} iconSize={48} />
                        <PEIconButton icon={Icon.google} size={'54px'} bg={'#F5F5F5'} iconSize={24} />
                    </HStack>

                    <HStack className="gap-8" style={{ width: '100%', maxWidth: '400px', alignItems: 'center' }}>
                        <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                        <p className="lg:my-2">with</p>
                        <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                    </HStack>

                    <VStack style={{ width: '100%', maxWidth: '400px', alignItems: 'flex-start' }}>
                        <p>Email</p>
                        <PEInput value={emailAddress} onChange={setEmailAddress} type={'email'} placeholder={'Enter your email'} />
                    </VStack>

                    <VStack style={{ width: '100%', maxWidth: '400px', alignItems: 'flex-start' }}>
                        <p>Password</p>
                        <PEInput type={'password'} value={password} onChange={setPassword} placeholder={'Enter your password'} />
                    </VStack>

                    <div className="flex justify-between w-full max-w-[400px]">
                        <HStack className="items-center">
                            <PECheckbox checked={staySignedIn} onCheckedChange={setStaySignedIn} />
                            <p>Remember me</p>
                        </HStack>
                        {responsive.isDesktop ? <Spacer /> : null}
                        {responsive.isDesktop ? <div style={{ flex: 1 }}></div> : null}
                        <PELineButton
                            title={'Forgot password?'}
                            fontSize={'text-text-m'}
                            onClick={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
                    </div>

                    <PEButton className="w-full max-w-[400px]" title={'Sign in'} onClick={(): any => assignOneSessionByEmailAddress()} />

                    <HStack style={{ alignItems: 'center' }}>
                        <p className="text-disabled">No profile yet? &nbsp;</p>
                        <Link href={'/sign-up'} className={'no-underline'}>
                            <PELineButton title={'Register here'} fontSize={'text-text-m'} />
                        </Link>
                    </HStack>
                </VStack>
            </VStack>
            {responsive.isDesktop ? (
                <div
                    className="flex justify-center flex-col"
                    style={{
                        flex: 1,
                        backgroundImage: 'url(/picture-1.png)',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                    }}
                >
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
                </div>
            ) : null}
        </HStack>
    );
}
