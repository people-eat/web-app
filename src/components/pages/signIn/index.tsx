import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, type ReactElement } from 'react';
import { AssignOneSessionByEmailAddressDocument } from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';
import PEButton from '../../standard/buttons/PEButton';
import PELineButton from '../../standard/buttons/PELineButton';
import PECheckbox from '../../standard/checkbox/PECheckbox';
import PEEmailTextField from '../../standard/textFields/PEEmailTextField';
import PEPasswordTextField from '../../standard/textFields/PEPasswordTextField';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export default function SignInPage(): ReactElement {
    const { isDesktop } = useResponsive();
    const router = useRouter();
    const { t } = useTranslation('sign-in');

    const [emailAddress, setEmailAddress] = useState({ value: '', isValid: false });
    const [password, setPassword] = useState('');
    const [staySignedIn, setStaySignedIn] = useState(true);

    const disabled = !emailAddress.isValid || password.length < 1;

    const [assignOneSessionByEmailAddress, { data, loading, error }] = useMutation(AssignOneSessionByEmailAddressDocument, {
        variables: {
            request: {
                emailAddress: emailAddress.value,
                password,
                platform: 'BROWSER',
                title: '',
            },
        },
    });

    if (data?.sessions.success) {
        router
            .push({ pathname: '/profile' })
            .then()
            .catch((err) => console.error(err));
    }

    return (
        <HStack className="h-full">
            <VStack style={{ flex: 1, padding: '32px', overflowY: 'scroll' }}>
                <VStack className="gap-8 lg:gap-4" style={{ width: '100%', maxWidth: '800px' }}>
                    <HStack style={{ width: '100%' }}>
                        <Link href={'/'}>
                            <Image src={'/logo.svg'} alt="" width={203} height={46} />
                        </Link>
                        <Spacer />
                    </HStack>

                    <VStack className="mt-[32px] lg:my-6" style={{ width: '100%', maxWidth: '400px', alignItems: 'flex-start' }}>
                        <h2 className="text-heading-xl lg:text-heading-s lg:mb-2 my-1">{t('headline')}</h2>
                        <p className="text-preBlack my-1">{t('sub-headline')}</p>
                    </VStack>

                    {/* <HStack style={{ gap: '12px' }}>
                        <PEIconButton icon={Icon.appleWhiteIcon} size={'54px'} bg={'#000'} iconSize={24} />
                        <PEIconButton icon={Icon.facebook} size={'54px'} bg={'#3B5998'} iconSize={48} />
                        <PEIconButton icon={Icon.google} size={'54px'} bg={'#F5F5F5'} iconSize={24} />
                    </HStack>

                    <HStack className="gap-8" style={{ width: '100%', maxWidth: '400px', alignItems: 'center' }}>
                        <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                        <p className="lg:my-2">with</p>
                        <div style={{ height: '1px', backgroundColor: '#F5F5F5', flex: 1 }}></div>
                    </HStack> */}

                    <VStack style={{ width: '100%', maxWidth: '400px', alignItems: 'flex-start' }}>
                        <p>{t('email-address-label')}</p>
                        <PEEmailTextField
                            email={emailAddress.value}
                            onChange={(changedEmailAddress, isValid): void => setEmailAddress({ value: changedEmailAddress, isValid })}
                            placeholder={t('email-address-placeholder')}
                        />
                    </VStack>

                    <VStack style={{ width: '100%', maxWidth: '400px', alignItems: 'flex-start' }}>
                        <p>{t('password-label')}</p>
                        <PEPasswordTextField password={password} onChange={setPassword} placeholder={t('password-placeholder')} />
                    </VStack>

                    <div className="flex justify-between w-full max-w-[400px]">
                        <HStack className="items-center">
                            <PECheckbox checked={staySignedIn} onCheckedChange={setStaySignedIn} />
                            <p>{t('stay-signed-in')}</p>
                        </HStack>
                        {isDesktop && (
                            <>
                                <Spacer />
                                <Spacer />
                            </>
                        )}
                        <PELineButton
                            title={t('forgot-password-label')}
                            fontSize={'text-text-m'}
                            onClick={function (): void {
                                throw new Error('Function not implemented.');
                            }}
                        />
                    </div>

                    <PEButton
                        className="w-full max-w-[400px]"
                        title={t('sign-in-button-label')}
                        onClick={(): void => void assignOneSessionByEmailAddress()}
                        disabled={disabled}
                    />

                    <HStack style={{ alignItems: 'center' }}>
                        <p className="text-disabled">{t('sign-up-label-1')} &nbsp;</p>
                        <Link href={'/sign-up'} className={'no-underline'}>
                            <PELineButton title={t('sign-up-label-2')} fontSize={'text-text-m'} />
                        </Link>
                    </HStack>
                </VStack>
            </VStack>

            {isDesktop && (
                <VStack
                    className={'p-5 box-border'}
                    style={{ flex: 1, backgroundImage: 'url(/koch-münchen.png)', backgroundPosition: 'center', backgroundSize: 'cover' }}
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
                    ></VStack>
                </VStack>
            )}

            {loading && (
                <Dialog open>
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}

            {(error || (data && !data.sessions.success)) && (
                <Dialog open>
                    <DialogContent>An error ocurred</DialogContent>
                </Dialog>
            )}
        </HStack>
    );
}
