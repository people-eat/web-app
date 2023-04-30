import { useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { GetProfileQueryDocument } from '../../../../data-source/generated/graphql';
import PEButton from '../../../standard/buttons/PEButton';
import PECreditCard from '../../../standard/creditCard/PECreditCard';
import PEPasswordTextField from '../../../standard/textFields/PEPasswordTextField';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

export default function ProfilePagePersonalTab(): ReactElement {
    const { t: commonTranslation } = useTranslation('common');
    const { t } = useTranslation('profile');

    const [changedPassword, setChangedPassword] = useState('');

    const { data, loading, error } = useQuery(GetProfileQueryDocument);

    return (
        <VStack className="w-full max-w-screen-xl" style={{ gap: 16 }}>
            {data?.users.me && (
                <>
                    <HStack className="w-full bg-white shadow-md" style={{ padding: 16, alignItems: 'center', borderRadius: 16 }}>
                        <VStack style={{ alignItems: 'flex-start' }}>
                            <span>{data.users.me.firstName}</span>
                            <span>{data.users.me.lastName}</span>
                        </VStack>
                        <Spacer />
                        <Link href="/chef-sign-up" className="no-underline">
                            <PEButton onClick={(): void => undefined} title={commonTranslation('how-to-become-a-chef')} />
                        </Link>
                    </HStack>

                    <VStack className="w-full bg-white shadow-md" style={{ padding: 16, alignItems: 'center', borderRadius: 16 }}>
                        <HStack className="w-full">
                            <span>{t('personal-information-label')}</span>
                            <Spacer />
                        </HStack>
                        <HStack className="w-full" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                                <span>{t('first-name-label')}</span>
                                <PETextField disabled type="text" value={data.users.me.firstName} />
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                                <span>{t('last-name-label')}</span>
                                <PETextField disabled type="text" value={data.users.me.lastName} />
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                                <span>{t('birthday-label')}</span>
                                <PETextField disabled type="text" />
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                                <span>{t('email-address-label')}</span>
                                <PETextField disabled type="text" />
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                                <span>{t('phone-number-label')}</span>
                                <PETextField disabled type="text" />
                            </VStack>
                        </HStack>
                    </VStack>

                    <VStack className="w-full bg-white shadow-md" style={{ padding: 16, alignItems: 'center', borderRadius: 16 }}>
                        <HStack className="w-full">
                            <span>{t('addresses-label')}</span>
                            <Spacer />
                        </HStack>
                    </VStack>

                    <HStack className="w-full gap-6">
                        <VStack
                            className="w-full relative bg-white shadow-primary box-border p-8 rounded-4 gap-3"
                            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <p className="text-heading-ss w-full justify-start my-0">Payment details</p>
                            <p className="w-full justify-start mt-6 mb-0">Card</p>
                            <PECreditCard label="Mastercard" number="*1234" />
                            <HStack className="mt-6">
                                <PEButton
                                    fontSize={'text-text-m'}
                                    className="min-w-[300px]"
                                    onClick={(): void => undefined}
                                    title="Add card"
                                    type="secondary"
                                />
                            </HStack>
                        </VStack>
                        <VStack
                            className="w-full relative bg-white shadow-primary box-border p-8 rounded-4 gap-3"
                            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                        >
                            <p className="text-heading-ss w-full justify-start my-0">Password</p>

                            <VStack style={{ width: '100%', alignItems: 'flex-start' }}>
                                <p>Password</p>
                                <PEPasswordTextField password={changedPassword} onChange={setChangedPassword} placeholder={'Password'} />
                            </VStack>

                            <HStack className="mt-6">
                                <PEButton
                                    fontSize={'text-text-m'}
                                    className="min-w-[300px]"
                                    onClick={(): void => undefined}
                                    title="Change password"
                                    type="secondary"
                                />
                            </HStack>
                        </VStack>
                    </HStack>
                </>
            )}

            {loading && <CircularProgress />}

            {error && <>An error ocurred</>}
        </VStack>
    );
}
