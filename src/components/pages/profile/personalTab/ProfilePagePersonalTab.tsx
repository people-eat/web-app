import { useMutation, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import { DatePicker } from '@mui/x-date-pickers';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { GetProfileQueryDocument, UpdateUserProfilePictureDocument } from '../../../../data-source/generated/graphql';
import useResponsive from '../../../../hooks/useResponsive';
import PEAddressCard from '../../../cards/address/PEAddressCard';
import PEButton from '../../../standard/buttons/PEButton';
import PECreditCard from '../../../standard/creditCard/PECreditCard';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PEImagePicker from '../../../standard/imagePicker/PEImagePicker';
import PEModalPopUp from '../../../standard/modal/PEModalPopUp';
import PEPasswordTextField from '../../../standard/textFields/PEPasswordTextField';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import CreateAddressDialog from './CreateAddressDialog';
import UpdateAddressDialog from './UpdateAddressDialog';

export interface ProfilePagePersonalTabProps {
    userId: string;
}

// eslint-disable-next-line max-statements
export default function ProfilePagePersonalTab({}: ProfilePagePersonalTabProps): ReactElement {
    const { t: commonTranslation } = useTranslation('common');
    const { t } = useTranslation('profile');
    const { isMobile } = useResponsive();

    const [changedPassword, setChangedPassword] = useState('');

    const [addAddressDialogOpen, setAddAddressDialogOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<
        | {
              addressId: string;
              title: string;
              country: string;
              city: string;
              postCode: string;
              street: string;
              houseNumber: string;
              createdAt: Date;
              location: { latitude: number; longitude: number };
          }
        | undefined
    >(undefined);

    const { data, loading, error, refetch } = useQuery(GetProfileQueryDocument);

    const userProfile = data?.users.me;

    const [image] = useState<string | undefined>(userProfile?.profilePictureUrl ?? undefined);
    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState(userProfile?.firstName);
    const [lastName, setLastName] = useState(userProfile?.lastName);

    const [editFirstName, setEditFirstName] = useState(userProfile?.firstName);
    const [editLastName, setEditLastName] = useState(userProfile?.lastName);
    const [editedProfilePicture, setEditedProfilePicture] = useState<File | undefined | null>(null);

    function handleUnSaveChefName(): void {
        setEditFirstName(userProfile?.firstName ?? '');
        setEditLastName(userProfile?.lastName ?? '');
        setEdit(!edit);
    }

    const [updateProfilePicture] = useMutation(UpdateUserProfilePictureDocument);

    function handleSaveProfileInfo(): void {
        if (editedProfilePicture !== null) {
            void updateProfilePicture({
                variables: { userId: userProfile?.userId ?? '', profilePicture: editedProfilePicture },
            })
                .then((result) => result.data?.users.success && void refetch())
                .catch((e) => console.error(e));
        }

        setEditedProfilePicture(undefined);
        setFirstName(editFirstName);
        setLastName(editLastName);
        setEdit(!edit);
    }

    return (
        <VStack className="w-full md:overflow-hidden relative max-w-screen-xl gap-6 lg:px-4 md:py-6 box-border">
            {userProfile && (
                <>
                    <HStack className="w-full bg-white shadow-primary box-border p-8 md:p-4 rounded-4" gap={16}>
                        {userProfile.profilePictureUrl && (
                            <Image
                                style={{
                                    width: isMobile ? '60px' : '120px',
                                    height: isMobile ? '60px' : '120px',
                                    borderRadius: 4,
                                    objectPosition: 'center',
                                    objectFit: 'cover',
                                }}
                                src={userProfile.profilePictureUrl}
                                alt={'Profile Picture'}
                                width={isMobile ? 60 : 120}
                                height={isMobile ? 60 : 120}
                            />
                        )}

                        {!userProfile.profilePictureUrl && (
                            <div
                                className="bg-base rounded-2 flex justify-center items-center"
                                style={{
                                    minHeight: isMobile ? '60px' : '120px',
                                    height: isMobile ? '60px' : '120px',
                                    minWidth: isMobile ? '60px' : '120px',
                                }}
                            >
                                <PEIcon edgeLength={32} icon={Icon.profileLight} />
                            </div>
                        )}

                        <VStack className="md:w-full" style={{ alignItems: 'flex-start' }}>
                            <HStack
                                className="gap-4 md:w-full"
                                style={{ justifyContent: isMobile ? 'space-between' : 'center', alignItems: 'center' }}
                            >
                                <VStack style={{ alignItems: 'flex-start' }}>
                                    <p className="text-heading-m my-0">{firstName}</p>
                                    <p className="text-start text-text-m text-disabled my-0">{lastName}</p>
                                </VStack>
                                {isMobile && <Spacer />}
                                <PEIconButton
                                    icon={Icon.editPencil}
                                    onClick={(): void => setEdit(!edit)}
                                    iconSize={24}
                                    withoutShadow
                                />{' '}
                            </HStack>
                        </VStack>

                        {!isMobile && (
                            <>
                                <Spacer />

                                {userProfile.isCook && (
                                    <Link href="/chef-profile" className="no-underline">
                                        <PEButton
                                            iconLeft={Icon.profileOrange}
                                            iconSize={16}
                                            className="min-w-[250px]"
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
                            </>
                        )}
                    </HStack>

                    <VStack
                        className="w-full bg-white shadow-primary box-border px-8 md:px-4 py-4"
                        style={{ alignItems: 'center', borderRadius: 16 }}
                    >
                        <HStack className="w-full">
                            <p className="text-heading-ss w-full justify-start my-2 mb-6">{t('personal-information-label')}</p>
                            <Spacer />
                        </HStack>
                        <HStack className="w-full" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: isMobile ? 200 : 420 }}>
                                <p className="m-0 mb-3">{t('first-name-label')}</p>
                                <PETextField disabled type="text" value={userProfile.firstName} />
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: isMobile ? 200 : 420 }}>
                                <p className="m-0 mb-3">{t('last-name-label')}</p>
                                <PETextField disabled type="text" value={userProfile.lastName} />
                            </VStack>

                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: isMobile ? 200 : 420 }}>
                                <p className="m-0 mb-3">{t('birthday-label')}</p>

                                <DatePicker
                                    className="border-solid w-full box-border border-[1px] border-disabled p-[11px] rounded-3 hover:border-black"
                                    sx={{ width: '100%' }}
                                    disabled
                                    value={userProfile.birthDate ? moment(userProfile.birthDate) : undefined}
                                    slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                                />
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: isMobile ? 200 : 420 }}>
                                <p className="m-0 mb-3">{t('email-address-label')}</p>
                                <PETextField disabled type="text" value={userProfile.emailAddress ?? undefined} />
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: isMobile ? 200 : 420 }}>
                                <p className="m-0 mb-3">{t('phone-number-label')}</p>
                                <PETextField disabled type="text" value={userProfile.phoneNumber ?? undefined} />
                            </VStack>
                        </HStack>
                    </VStack>

                    <VStack
                        gap={16}
                        className="w-full bg-white shadow-primary box-border p-8 md:p-4 rounded-4"
                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <HStack gap={8} className="w-full" style={{ alignItems: 'start' }}>
                            <p className="text-heading-ss w-full justify-start my-0">{t('addresses-label')}</p>

                            <Spacer />

                            <PEIconButton icon={Icon.plus} withoutShadow onClick={(): void => setAddAddressDialogOpen(true)} />
                        </HStack>

                        {addAddressDialogOpen && (
                            <CreateAddressDialog
                                open={addAddressDialogOpen}
                                userId={userProfile.userId}
                                onSuccess={(): void => {
                                    setAddAddressDialogOpen(false);
                                    void refetch();
                                }}
                                onCancel={(): void => setAddAddressDialogOpen(false)}
                            />
                        )}

                        {selectedAddress && (
                            <UpdateAddressDialog
                                open={Boolean(selectedAddress)}
                                userId={userProfile.userId}
                                onSuccess={(): void => {
                                    setSelectedAddress(undefined);
                                    void refetch();
                                }}
                                onCancel={(): void => setSelectedAddress(undefined)}
                                address={selectedAddress}
                            />
                        )}

                        {Boolean(userProfile.addresses.length) && (
                            <VStack gap={16} className="w-full">
                                {userProfile.addresses.map((address, index) => (
                                    <PEAddressCard
                                        key={index}
                                        address={`${address.postCode} ${address.city}, ${address.street} ${address.houseNumber}`}
                                        title={address.title}
                                        onHouseClick={(): void => setSelectedAddress(address)}
                                    />
                                ))}
                            </VStack>
                        )}
                    </VStack>

                    <HStack className="w-full gap-6 md:flex-wrap">
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

                    <PEModalPopUp width={isMobile ? '100%' : 750} openMenu={edit} handleOpenMenu={handleUnSaveChefName}>
                        <VStack className="w-[750px] md:w-full md:h-full px-10 md:px-4 py-15 md:py-4 box-border relative">
                            <h2 className="m-0 pb-5">Change profile info</h2>
                            <VStack className="w-full gap-4" style={{ alignItems: 'flex-start' }}>
                                <PETextField type={'text'} value={editFirstName} onChange={setEditFirstName} />
                                <PETextField type={'text'} value={editLastName} onChange={setEditLastName} />
                                <PEImagePicker
                                    onPick={setEditedProfilePicture}
                                    defaultImage={image}
                                    onRemoveDefaultImage={(): void => setEditedProfilePicture(undefined)}
                                />
                            </VStack>
                            <PEButton className="max-w-[250px] mt-10" onClick={handleSaveProfileInfo} title="Save" />
                        </VStack>
                    </PEModalPopUp>
                </>
            )}

            {loading && <CircularProgress />}

            {error && <>An error ocurred</>}
        </VStack>
    );
}
