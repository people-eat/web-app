import { useMutation } from '@apollo/client';
import { FormControlLabel, FormGroup } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { type Moment } from 'moment/moment';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { CreateOneUserByEmailAddressDocument } from '../../../data-source/generated/graphql';
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

export default function SignUpPage(): ReactElement {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(moment());
    const [emailAddress, setEmailAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const responsive = useResponsive();

    const [createOneUserByEmailAddress, { data, loading, error }] = useMutation(CreateOneUserByEmailAddressDocument, {
        variables: {
            request: {
                birthDate: undefined,
                cook: undefined,
                emailAddress,
                firstName,
                gender: 'NO_INFORMATION',
                language: 'GERMAN',
                lastName,
                password,
                profilePictureUrl: undefined,
            },
        },
    });

    if (loading) return <>Loading...</>;

    if (error) return <>Error</>;

    if (data) console.log(data);

    return (
        <HStack className="w-full" style={{ height: '100%' }}>
            <VStack className="w-full" style={{ flex: 1, padding: '32px', overflowY: 'scroll' }}>
                <VStack style={{ gap: '32px', width: '100%', maxWidth: '400px' }}>
                    <HStack style={{ width: '100%' }}>
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

                    <HStack style={{ width: '100%', alignItems: 'center', gap: '32px' }}>
                        <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                        <p>with</p>
                        <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                    </HStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>First Name</p>
                        <PEInput value={firstName} onChange={setFirstName} type={'text'} placeholder={'First name'} />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Last Name</p>
                        <PEInput value={lastName} onChange={setLastName} type={'text'} placeholder={'Last name'} />
                    </VStack>

                    <HStack style={{ gap: '16px', width: '100%', alignItems: 'flex-start' }}>
                        <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                            <p>Date of birth</p>
                            <div className={'border-solid border-[1px] border-disabled p-[11px] rounded-3 hover:border-black'}>
                                <DatePicker
                                    value={birthDate}
                                    onChange={(changedDate: Moment | null): void => {
                                        if (changedDate) setBirthDate(changedDate);
                                    }}
                                    format={'DD.MM.YYYY'}
                                    slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                                />
                            </div>
                        </VStack>

                        <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                            <p>Phone number</p>
                            <PEInput value={phoneNumber} onChange={setPhoneNumber} type="text" placeholder={'+49 __ ___'} />
                        </VStack>
                    </HStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Email</p>
                        <PEInput value={emailAddress} onChange={setEmailAddress} type="email" placeholder={'Email'} />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Password</p>
                        <PEInput type="password" value={password} onChange={setPassword} placeholder={'Password'} />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Repeat Password</p>
                        <PEInput type="password" value={passwordRepeat} onChange={setPasswordRepeat} placeholder={'Repeat Password'} />
                    </VStack>

                    <VStack
                        style={{
                            width: '100%',
                            maxWidth: '400px',
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

                    <PEButton className={'w-full'} title={'Sign up'} onClick={(): any => createOneUserByEmailAddress()} />

                    <HStack style={{ alignItems: 'center' }}>
                        <p className={'text-disabled'}>You already have a profile? &nbsp;</p>
                        <Link href={'/sign-in'} className={'no-underline'}>
                            <PELineButton title={'Sign in here'} fontSize={'text-text-m'} />
                        </Link>
                    </HStack>
                </VStack>
            </VStack>
            {responsive.isDesktop && (
                <div className={'flex flex-col items-center p-5 w-full min-w-[50%] box-border'}>
                    <div
                        className="flex w-full justify-center flex-col rounded-tl-15"
                        style={{
                            flex: 1,
                            backgroundImage: 'url(/picture-1.png)',
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                        }}
                    >
                        <Spacer />
                        <VStack
                            className="box-border"
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
                    </div>
                </div>
            )}
        </HStack>
    );
}
