import { useMutation } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { type Moment } from 'moment/moment';
import useTranslation from 'next-translate/useTranslation';
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
import PEEmailTextField from '../../standard/textFields/PEEmailTextField';
import PEPasswordTextField from '../../standard/textFields/PEPasswordTextField';
import PEPhoneNumberTextField from '../../standard/textFields/PEPhoneNumberTextField';
import PETextField from '../../standard/textFields/PETextField';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import SignUpPageSuccessDialog from './successDialog/SignUpPageSuccessDialog';

// eslint-disable-next-line max-statements
export default function SignUpPage(): ReactElement {
    const { t } = useTranslation('chef-sign-up');
    const { isDesktop } = useResponsive();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState(moment().set('year', 2000).set('dayOfYear', 1));
    const [emailAddress, setEmailAddress] = useState({ value: '', isValid: false });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [acceptedPrivacyPolicy, setAcceptedPrivacyPolicy] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    const disabled =
        !emailAddress.isValid ||
        password.length < 1 ||
        password !== passwordRepeat ||
        firstName.length < 1 ||
        lastName.length < 1 ||
        !acceptedTerms ||
        !acceptedPrivacyPolicy;

    const [createOneUserByEmailAddress, { data, loading, error }] = useMutation(CreateOneUserByEmailAddressDocument, {
        variables: {
            request: {
                birthDate: birthDate.format(moment.HTML5_FMT.DATE),
                cook: undefined,
                emailAddress: emailAddress.value,
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
        <HStack className="w-full h-full relative" style={{ justifyContent: 'space-between' }}>
            <VStack className="w-full" style={{ flex: 1, padding: '32px', overflowY: 'scroll' }}>
                <VStack style={{ gap: '32px', width: '100%', maxWidth: '400px' }}>
                    <HStack style={{ width: '100%' }}>
                        <Link href={'/'}>
                            <Image src={'/logo.svg'} alt="" width={203} height={46} />
                        </Link>
                        <Spacer />
                    </HStack>

                    <VStack className="mt-[32px] lg:my-6" style={{ width: '100%', maxWidth: '400px', alignItems: 'flex-start' }}>
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
                        <p>{t('first-name')}</p>
                        <PETextField value={firstName} onChange={setFirstName} type="text" placeholder={t('first-name')} />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>{t('last-name')}</p>
                        <PETextField value={lastName} onChange={setLastName} type={'text'} placeholder={t('last-name')} />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>Date of birth</p>
                        <div className="border-solid w-full box-border border-[1px] border-disabled p-[11px] rounded-3 hover:border-black">
                            <DatePicker
                                sx={{ width: '100%' }}
                                value={birthDate}
                                onChange={(changedDate: Moment | null): void => {
                                    if (changedDate) setBirthDate(changedDate);
                                }}
                                slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                            />
                        </div>
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>{t('phone-number')}</p>
                        <PEPhoneNumberTextField phoneNumber={phoneNumber} onChange={setPhoneNumber} placeholder={t('phone-number')} />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>{t('email-address')}</p>
                        <PEEmailTextField
                            email={emailAddress.value}
                            onChange={(changedEmailAddress, isValid): void => setEmailAddress({ value: changedEmailAddress, isValid })}
                            placeholder={t('email-address')}
                        />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>{t('password')}</p>
                        <PEPasswordTextField password={password} onChange={setPassword} placeholder={t('password')} />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                        <p>{t('password-repeat')}</p>
                        <PEPasswordTextField password={passwordRepeat} onChange={setPasswordRepeat} placeholder={t('password-repeat')} />
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
                                control={<PECheckbox checked={acceptedPrivacyPolicy} onCheckedChange={setAcceptedPrivacyPolicy} />}
                                label={
                                    <Link className="no-underline" href={'/data-privacy-policy'}>
                                        {t('privacy-policy-label')}
                                    </Link>
                                }
                            />
                        </FormGroup>
                        <FormGroup>
                            <FormControlLabel
                                control={<PECheckbox checked={acceptedTerms} onCheckedChange={setAcceptedTerms} />}
                                label={
                                    <Link className="no-underline" href={'/terms-and-conditions'}>
                                        {t('terms-and-conditions-label')}
                                    </Link>
                                }
                            />
                        </FormGroup>
                    </VStack>

                    <PEButton
                        className="w-full"
                        title={t('complete-button-label')}
                        onClick={(): void => void createOneUserByEmailAddress()}
                        disabled={disabled}
                    />

                    <HStack style={{ alignItems: 'center' }}>
                        <p className="text-disabled">You already have a profile? &nbsp;</p>
                        <Link href={'/sign-in'} className={'no-underline'}>
                            <PELineButton title={'Sign in here'} fontSize={'text-text-m'} />
                        </Link>
                    </HStack>
                </VStack>
            </VStack>

            {isDesktop && (
                <VStack
                    className={'p-5 box-border'}
                    style={{ flex: 1, backgroundImage: 'url(/picture-1.png)', backgroundPosition: 'center', backgroundSize: 'cover' }}
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
                </VStack>
            )}

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

            {(error || (data && !data.users.success)) && (
                <Dialog open>
                    <DialogContent>An error ocurred</DialogContent>
                </Dialog>
            )}
        </HStack>
    );
}
