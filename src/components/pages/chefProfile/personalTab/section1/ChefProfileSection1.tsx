import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { type CookRank } from '../../../../../data-source/generated/graphql';
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
}

export default function ChefProfileSection1({ chefProfile }: ChefProfileSection1Props): ReactElement {
    const [edit, setEdit] = useState(false);
    const [_firstName, setFirstName] = useState(chefProfile.user.firstName);
    const [_lastName, setLastName] = useState(chefProfile.user.lastName);

    const [editFirstName, setEditFirstName] = useState(chefProfile.user.firstName);
    const [editLastName, setEditLastName] = useState(chefProfile.user.lastName);
    const [_editedProfilePicture, setEditedProfilePicture] = useState<File | undefined>();

    const { t: commonTranslate } = useTranslation('common');

    function handleSaveChefName(): void {
        setFirstName(editFirstName);
        setLastName(editLastName);
        setEdit(!edit);
    }

    function handleUnSaveChefName(): void {
        setEditFirstName(chefProfile.user.firstName);
        setEditLastName(chefProfile.user.lastName);
        setEdit(!edit);
    }

    return (
        <>
            <HStack className="w-full bg-white shadow-primary box-border p-8 rounded-4" gap={16}>
                {chefProfile.user.profilePictureUrl && (
                    <Image
                        style={{ width: '120px', height: '120px', borderRadius: 4, objectPosition: 'center', objectFit: 'cover' }}
                        src={chefProfile.user.profilePictureUrl}
                        alt={'Profile Picture'}
                        width={120}
                        height={120}
                    />
                )}

                {!chefProfile.user.profilePictureUrl && (
                    <div className="bg-base rounded-2 flex justify-center items-center min-h-[120px] w-[120px]">
                        <PEIcon edgeLength={32} icon={Icon.profileLight} />
                    </div>
                )}

                <VStack style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <HStack className="gap-4" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <VStack style={{ alignItems: 'flex-start' }}>
                            <p className="text-heading-m my-0">{chefProfile.user.firstName}</p>
                            <p className="text-start text-text-m text-disabled my-0">{chefProfile.user.lastName}</p>
                        </VStack>
                        <PEIconButton icon={Icon.editPencil} onClick={(): void => setEdit(!edit)} iconSize={24} withoutShadow />
                    </HStack>
                    <span>{commonTranslate(chefProfile.rank)}</span>
                </VStack>

                <Spacer />

                <VStack style={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Link href="/profile" className="no-underline">
                        <PEButton
                            iconLeft={Icon.profileOrange}
                            iconSize={16}
                            type="secondary"
                            onClick={(): void => undefined}
                            title={'Customer Profile'}
                        />
                    </Link>

                    <HStack gap={2} className="flex-row mt-4">
                        <PEIcon icon={Icon.star} edgeLength={20} />
                        <span className="text-preBlack">{chefProfile.ratingAverage / 3}</span>
                        <span className="text-disabled">({chefProfile.ratingCount})</span>
                    </HStack>
                </VStack>
            </HStack>

            <PEModalPopUp openMenu={edit} handleOpenMenu={handleUnSaveChefName}>
                <VStack className="w-[750px] px-10 py-15 box-border relative">
                    <h2 className="m-0 pb-5">Change profile name</h2>
                    <VStack className="w-full gap-4" style={{ alignItems: 'flex-start' }}>
                        <PETextField type={'text'} value={editFirstName} onChange={(value): void => setEditFirstName(value)} />
                        <PETextField type={'text'} value={editLastName} onChange={(value): void => setEditLastName(value)} />
                        <PEImagePicker onPick={setEditedProfilePicture} defaultImage={chefProfile.user.profilePictureUrl ?? undefined} />
                    </VStack>
                    <PEButton className="max-w-[250px] mt-10" onClick={handleSaveChefName} title="Save" />
                </VStack>
            </PEModalPopUp>
        </>
    );
}
