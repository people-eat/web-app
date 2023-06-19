import { useMutation } from '@apollo/client';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { UpdateUserProfilePictureDocument, type CookRank } from '../../../../../data-source/generated/graphql';
import useResponsive from '../../../../../hooks/useResponsive';
import PEButton from '../../../../standard/buttons/PEButton';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import PEIconButton from '../../../../standard/iconButton/PEIconButton';
import PEImagePicker from '../../../../standard/imagePicker/PEImagePicker';
import PEModalPopUp from '../../../../standard/modal/PEModalPopUp';
import PETextField from '../../../../standard/textFields/PETextField';
import HStack from '../../../../utility/hStack/HStack';
import Spacer from '../../../../utility/spacer/Spacer';
import VStack from '../../../../utility/vStack/VStack';

export interface ChefProfileSection1Props {
    chefProfile: {
        cookId: string;
        isLocked: boolean;
        isVisible: boolean;
        rank: CookRank;
        user: {
            firstName: string;
            lastName: string;
            profilePictureUrl?: string | null;
        };
        ratingAverage: number;
        ratingCount: number;
    };
    refetch: () => void;
}

export default function ChefProfileSection1({ chefProfile, refetch }: ChefProfileSection1Props): ReactElement {
    const { t } = useTranslation('chef-profile');
    const { isMobile } = useResponsive();

    const [image] = useState<string | undefined>(chefProfile.user.profilePictureUrl ?? undefined);
    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState(chefProfile.user.firstName);
    const [lastName, setLastName] = useState(chefProfile.user.lastName);

    const [editFirstName, setEditFirstName] = useState(chefProfile.user.firstName);
    const [editLastName, setEditLastName] = useState(chefProfile.user.lastName);
    const [editedProfilePicture, setEditedProfilePicture] = useState<File | undefined | null>(null);

    const { t: commonTranslate } = useTranslation('common');

    const handleClose = (): void => {
        setEdit(false);
    };

    function handleUnSaveChefName(): void {
        setEditFirstName(chefProfile.user.firstName);
        setEditLastName(chefProfile.user.lastName);
        setEdit(!edit);
    }

    const [updateProfilePicture] = useMutation(UpdateUserProfilePictureDocument);

    function handleSaveProfileInfo(): void {
        if (editedProfilePicture !== null) {
            void updateProfilePicture({
                variables: { userId: chefProfile.cookId, profilePicture: editedProfilePicture },
            })
                .then((result) => {
                    result.data?.users.success && void refetch();
                })
                .catch((e) => console.error(e));
        }

        setEditedProfilePicture(null);
        setFirstName(editFirstName);
        setLastName(editLastName);
        setEdit(!edit);
    }

    return (
        <>
            <VStack className="w-full bg-white shadow-primary box-border p-8 md:px-4 md:py-6 rounded-4" gap={16}>
                <HStack className="w-full gap-4">
                    {image && (
                        <Image
                            style={{
                                width: isMobile ? '60px' : '120px',
                                height: isMobile ? '60px' : '120px',
                                borderRadius: 4,
                                objectPosition: 'center',
                                objectFit: 'cover',
                            }}
                            src={image}
                            alt={'Profile Picture'}
                            width={isMobile ? 60 : 120}
                            height={isMobile ? 60 : 120}
                        />
                    )}

                    {!image && (
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

                    <VStack style={{ justifyContent: 'space-between', alignItems: 'flex-start', width: isMobile ? '100%' : 'auto' }}>
                        <HStack
                            className="gap-4"
                            style={{
                                justifyContent: 'space-between',
                                alignItems: isMobile ? 'center' : 'flex-start',
                                width: isMobile ? '100%' : 'auto',
                                height: '100%',
                            }}
                        >
                            <VStack style={{ alignItems: 'flex-start' }}>
                                <p className="text-heading-m my-0">{firstName}</p>
                                <p className="text-start text-text-m text-disabled my-0">{lastName}</p>
                            </VStack>
                            <div className="mt-2">
                                <PEIconButton icon={Icon.editPencil} onClick={(): void => setEdit(!edit)} iconSize={24} withoutShadow />
                            </div>
                        </HStack>
                        {!isMobile ? <span>{commonTranslate(chefProfile.rank)}</span> : null}
                    </VStack>

                    {!isMobile ? <Spacer /> : null}

                    {!isMobile && (
                        <VStack style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                            <Link href="/profile" className="no-underline">
                                <PEButton
                                    className="min-w-[250px]"
                                    iconLeft={Icon.profileOrange}
                                    iconSize={16}
                                    type="secondary"
                                    onClick={(): void => undefined}
                                    title={t('role-switch-button-customer')}
                                />
                            </Link>

                            <Spacer />

                            <HStack gap={2} className="flex-row mt-4">
                                <PEIcon icon={Icon.star} edgeLength={20} />
                                <span className="text-preBlack">{(chefProfile.ratingAverage / 3).toFixed(2)}</span>
                                <span className="text-disabled">({chefProfile.ratingCount})</span>
                            </HStack>
                        </VStack>
                    )}
                </HStack>

                {isMobile && (
                    <HStack className="w-full gap-6" style={{ justifyContent: 'flex-start' }}>
                        <span>{commonTranslate(chefProfile.rank)}</span>
                        <HStack gap={2} className="flex-row">
                            <PEIcon icon={Icon.star} edgeLength={20} />
                            <span className="text-preBlack">{(chefProfile.ratingAverage / 3).toFixed(2)}</span>
                            <span className="text-disabled">({chefProfile.ratingCount})</span>
                        </HStack>
                    </HStack>
                )}
            </VStack>

            {!isMobile && (
                <PEModalPopUp width={isMobile ? '100%' : 750} openMenu={edit} handleOpenMenu={handleUnSaveChefName}>
                    <VStack className="w-[750px] md:w-full md:h-full px-10 md:px-4 py-15 md:py-4 box-border relative">
                        <h2 className="m-0 pb-5 w-full">{t('popup-edit-user-profile')}</h2>
                        <VStack className="w-full gap-4" style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                            <PETextField type={'text'} value={editFirstName} onChange={(value): void => setEditFirstName(value)} />
                            <PETextField type={'text'} value={editLastName} onChange={(value): void => setEditLastName(value)} />
                            <PEImagePicker
                                onPick={setEditedProfilePicture}
                                defaultImage={image}
                                onRemoveDefaultImage={(): void => setEditedProfilePicture(undefined)}
                            />
                        </VStack>
                        <PEButton
                            className="max-w-[250px] mt-10"
                            onClick={handleSaveProfileInfo}
                            title={t('popup-edit-button')}
                            disabled={editedProfilePicture === null && firstName === editFirstName && lastName === editLastName}
                        />
                    </VStack>
                </PEModalPopUp>
            )}

            {isMobile && (
                <Dialog
                    sx={{
                        height: '100vh',
                        width: '100%',
                        minHeight: '90%',
                        minWidth: '100%',
                        overflow: 'hidden',
                        position: 'relative',
                        '& .MuiPaper-root': {
                            margin: '5vh 0 0',
                            borderRadius: '16px 16px 0 0',
                            padding: '16px',
                            boxSizing: 'border-box',
                            minHeight: '95vh',
                            minWidth: '100%',
                        },
                    }}
                    open={edit}
                    onClose={handleClose}
                >
                    <List
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexDirection: 'column',
                            minHeight: '90%',
                            minWidth: '100%',
                            height: '80vh',
                        }}
                    >
                        <VStack className="w-[750px] md:w-full md:h-full px-10 md:px-4 py-15 md:py-4 box-border relative">
                            <div className="absolute top-8 right-8 md:top-2 md:right-0">
                                <PEIconButton icon={Icon.close} onClick={handleClose} withoutShadow bg="white" iconSize={24} />
                            </div>
                            <h2 className="m-0 pb-5 w-full">{t('popup-edit-user-profile')}</h2>
                            <VStack className="w-full gap-4" style={{ alignItems: 'flex-start', justifyContent: 'center' }}>
                                <PETextField type={'text'} value={editFirstName} onChange={(value): void => setEditFirstName(value)} />
                                <PETextField type={'text'} value={editLastName} onChange={(value): void => setEditLastName(value)} />
                                <PEImagePicker
                                    onPick={setEditedProfilePicture}
                                    defaultImage={image}
                                    onRemoveDefaultImage={(): void => setEditedProfilePicture(undefined)}
                                />
                            </VStack>
                            <PEButton
                                className="max-w-[250px] mt-10"
                                onClick={handleSaveProfileInfo}
                                title={t('popup-edit-button')}
                                disabled={editedProfilePicture === null && firstName === editFirstName && lastName === editLastName}
                            />
                        </VStack>
                    </List>
                </Dialog>
            )}
        </>
    );
}
