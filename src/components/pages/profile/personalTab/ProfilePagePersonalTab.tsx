import { useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { GetProfileQueryDocument } from '../../../../data-source/generated/graphql';
import PEAddressCard from '../../../cards/address/PEAddressCard';
import PEButton from '../../../standard/buttons/PEButton';
import PECreditCard from '../../../standard/creditCard/PECreditCard';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PEPasswordTextField from '../../../standard/textFields/PEPasswordTextField';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import CreateAddressDialog from './CreateAddressDialog';

export default function ProfilePagePersonalTab(): ReactElement {
    const { t: commonTranslation } = useTranslation('common');
    const { t } = useTranslation('profile');

    const [changedPassword, setChangedPassword] = useState('');
    const [addAddressDialogOpen, setAddAddressDialogOpen] = useState(false);

    const { data, loading, error, refetch } = useQuery(GetProfileQueryDocument);

    const userProfile = data?.users.me;

    return (
        <VStack className="w-full max-w-screen-xl" style={{ gap: 16 }}>
            {userProfile && (
                <>
                    <HStack className="w-full bg-white shadow-primary box-border p-8 rounded-4" gap={16}>
                        {userProfile.profilePictureUrl && (
                            <Image
                                style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                src={userProfile.profilePictureUrl}
                                alt={"User's Profile Picture"}
                                width={120}
                                height={120}
                            />
                        )}

                        {!userProfile.profilePictureUrl && (
                            <div className="bg-base rounded-2 flex justify-center items-center min-h-[120px] w-[120px]">
                                <PEIcon edgeLength={32} icon={Icon.profileLight} />
                            </div>
                        )}

                        <VStack style={{ alignItems: 'flex-start' }}>
                            <HStack className="gap-4" style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <VStack style={{ alignItems: 'flex-start' }}>
                                    <p className="text-heading-m my-0">{userProfile.firstName}</p>
                                    <p className="text-start text-text-m text-disabled my-0">{userProfile.lastName}</p>
                                </VStack>
                                <PEIconButton icon={Icon.editPencil} iconSize={24} withoutShadow />
                            </HStack>
                        </VStack>

                        <Spacer />

                        {userProfile.isCook && (
                            <Link href="/chef-profile" className="no-underline">
                                <PEButton
                                    iconLeft={Icon.profileOrange}
                                    iconSize={16}
                                    type="secondary"
                                    onClick={(): void => undefined}
                                    title={'Chef Profile'}
                                />
                            </Link>
                        )}

                        {!userProfile.isCook && (
                            <Link href="/chef-sign-up" className="no-underline">
                                <PEButton onClick={(): void => undefined} title={commonTranslation('how-to-become-a-chef')} />
                            </Link>
                        )}
                    </HStack>

                    <VStack className="w-full bg-white shadow-md" style={{ padding: 16, alignItems: 'center', borderRadius: 16 }}>
                        <HStack className="w-full">
                            <span>{t('personal-information-label')}</span>
                            <Spacer />
                        </HStack>
                        <HStack className="w-full" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                                <span>{t('first-name-label')}</span>
                                <PETextField disabled type="text" value={userProfile.firstName} />
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                                <span>{t('last-name-label')}</span>
                                <PETextField disabled type="text" value={userProfile.lastName} />
                            </VStack>

                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                                <span>{t('birthday-label')}</span>

                                <DatePicker
                                    className="border-solid w-full box-border border-[1px] border-disabled p-[11px] rounded-3 hover:border-black"
                                    sx={{ width: '100%' }}
                                    disabled
                                    value={userProfile.birthDate ? moment(userProfile.birthDate) : undefined}
                                    slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                                />
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                                <span>{t('email-address-label')}</span>
                                <PETextField disabled type="text" value={userProfile.emailAddress ?? undefined} />
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                                <span>{t('phone-number-label')}</span>
                                <PETextField disabled type="text" value={userProfile.phoneNumber ?? undefined} />
                            </VStack>
                        </HStack>
                    </VStack>

                    <VStack
                        className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-3"
                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <p className="text-heading-ss w-full justify-start my-0">{t('addresses-label')}</p>
                            <PEIconButton
                                icon={Icon.plus}
                                iconSize={24}
                                withoutShadow
                                onClick={(): void => setAddAddressDialogOpen(!addAddressDialogOpen)}
                            />
                        </HStack>

                        <CreateAddressDialog
                            open={addAddressDialogOpen}
                            userId={userProfile.userId}
                            onSuccess={(): void => {
                                setAddAddressDialogOpen(false);
                                void refetch();
                            }}
                            onCancel={(): void => setAddAddressDialogOpen(false)}
                        />

                        <VStack className="w-full gap-3">
                            {userProfile.addresses.map(({ title, city, postCode, street, houseNumber }, index) => (
                                <PEAddressCard key={index} address={`${postCode} ${city}, ${street} ${houseNumber}`} title={title} />
                            ))}
                        </VStack>
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
