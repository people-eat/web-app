import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { useState, type ReactElement } from 'react';
import { type CookRank } from '../../../../../data-source/generated/graphql';
import PEButton from '../../../../standard/buttons/PEButton';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import PEIconButton from '../../../../standard/iconButton/PEIconButton';
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
        biography: string;
        maximumParticipants?: number | null;
        maximumPrice?: number | null;
        maximumTravelDistance?: number | null;
        minimumParticipants?: number | null;
        minimumPrice?: number | null;
        rank: CookRank;
        travelExpenses: number;
        user: {
            firstName: string;
            lastName: string;
            profilePictureUrl?: string | null;
            addresses: Address[];
        };
    };
}

export interface Address {
    addressId: string;
    title: string;
    country: string;
    city: string;
    postCode: string;
    street: string;
    houseNumber: string;
    createdAt: Date;
    location: {
        latitude: number;
        longitude: number;
    };
}

export default function ChefProfileSection1({ chefProfile }: ChefProfileSection1Props): ReactElement {
    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState(chefProfile.user.firstName);
    const [lastName, setLastName] = useState(chefProfile.user.lastName);

    const [editFirstName, setEditFirstName] = useState(chefProfile.user.firstName);
    const [editLastName, setEditLastName] = useState(chefProfile.user.lastName);

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
        <HStack
            className="w-full bg-white shadow-primary box-border p-8 rounded-4"
            style={{ alignItems: 'flex-start', justifyContent: 'space-between' }}
            gap={16}
        >
            {chefProfile.user.profilePictureUrl && (
                <Image
                    style={{
                        minWidth: '130px',
                        width: '130px',
                        height: '130px',
                        borderRadius: '8px',
                        objectPosition: 'center',
                        objectFit: 'cover',
                    }}
                    src={chefProfile.user.profilePictureUrl}
                    alt={chefProfile.user.profilePictureUrl}
                    width={130}
                    height={130}
                />
            )}
            {!chefProfile.user.profilePictureUrl && (
                <div className={classNames('bg-base rounded-2 flex justify-center items-center min-h-[120px] min-w-[120px] w-[120px]')}>
                    <PEIcon edgeLength={32} icon={Icon.profileLight} />
                </div>
            )}

            <VStack className="relative w-full box-border" style={{ alignItems: 'flex-start' }}>
                <PEModalPopUp openMenu={edit} handleOpenMenu={handleUnSaveChefName}>
                    <VStack className="w-[750px] px-10 py-15 box-border relative">
                        <h2 className="m-0 pb-5">Change profile name</h2>
                        <VStack className="w-full gap-4" style={{ alignItems: 'flex-start' }}>
                            <PETextField type={'text'} value={editFirstName} onChange={(value): void => setEditFirstName(value)} />
                            <PETextField type={'text'} value={editLastName} onChange={(value): void => setEditLastName(value)} />
                            <VStack className="w-[200px] h-[200px] hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition border-solid border-[1px] border-disabled justify-center rounded-4">
                                <PEIcon icon={Icon.plus} />
                            </VStack>
                        </VStack>
                        <VStack className="w-full">
                            <p>Save profile data</p>
                            <PEButton className="max-w-[250px]" onClick={handleSaveChefName} title="Save" />
                        </VStack>
                    </VStack>
                </PEModalPopUp>

                <VStack style={{ alignItems: 'flex-start' }}>
                    <HStack className="gap-4" style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <VStack style={{ alignItems: 'flex-start' }}>
                            <p className="text-heading-m my-0">{firstName}</p>
                            <p className="text-start text-text-m text-disabled my-0">{lastName}</p>
                        </VStack>
                        <PEIconButton onClick={(): void => setEdit(!edit)} icon={Icon.editPencil} iconSize={24} withoutShadow />
                    </HStack>
                    <span>{commonTranslate(chefProfile.rank)}</span>
                </VStack>

                <HStack gap={2} className="flex-row mt-4">
                    <PEIcon icon={Icon.star} edgeLength={20} />
                    <span className="text-preBlack">5.0</span>
                    <span className="text-disabled">(25)</span>
                </HStack>
            </VStack>

            <Spacer />

            <div>
                <Link href="/profile" className="no-underline">
                    <PEButton
                        iconLeft={Icon.profileOrange}
                        iconSize={16}
                        type="secondary"
                        className="min-w-[250px]"
                        onClick={(): void => undefined}
                        title={'Customer Profile'}
                    />
                </Link>
            </div>
        </HStack>
    );
}
