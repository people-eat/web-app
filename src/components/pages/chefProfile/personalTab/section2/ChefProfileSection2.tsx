import { useMutation } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState, type ReactElement } from 'react';
import { UpdateCookBiographyDocument } from '../../../../../data-source/generated/graphql';
import useResponsive from '../../../../../hooks/useResponsive';
import { Icon } from '../../../../standard/icon/Icon';
import PEIconButton from '../../../../standard/iconButton/PEIconButton';
import PEMultiLineTextField from '../../../../standard/textFields/PEMultiLineTextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';

export interface ChefProfileSection2Props {
    chefBiography: string;
    cookId: string;
}

export default function ChefProfileSection2({ chefBiography, cookId }: ChefProfileSection2Props): ReactElement {
    const { t } = useTranslation('chef-profile');
    const { isMobile } = useResponsive();

    const [edit, setEdit] = useState(false);
    const [biography, setBiography] = useState(chefBiography);

    function handleSaveChefBiography(): void {
        setEdit(!edit);
        void updateCookBiography();
    }

    function handleUnSaveChefBiography(): void {
        setEdit(!edit);
        setBiography(chefBiography);
    }

    useEffect(() => {
        setBiography(chefBiography);
    }, [chefBiography]);

    const [updateCookBiography] = useMutation(UpdateCookBiographyDocument, {
        variables: { biography, cookId },
    });

    return (
        <VStack
            className="w-full bg-white shadow-primary box-border p-8 md:p-4 rounded-4"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <HStack className="w-full md:mb-2">
                <p className="text-heading-ss w-full justify-start my-0">Bio</p>
                {isMobile && (
                    <>
                        {edit && (
                            <HStack className="gap-3">
                                <PEIconButton
                                    onClick={(): void => handleSaveChefBiography()}
                                    icon={Icon.checkGreen}
                                    border="1px solid green"
                                    bg="white"
                                    size={'36px'}
                                />
                                <PEIconButton
                                    onClick={(): void => handleUnSaveChefBiography()}
                                    icon={Icon.closeRed}
                                    border="1px solid red"
                                    bg="white"
                                    size={'36px'}
                                />
                            </HStack>
                        )}
                        {!edit && <PEIconButton onClick={(): void => setEdit(!edit)} icon={Icon.editPencil} iconSize={24} withoutShadow />}
                    </>
                )}
            </HStack>

            <VStack className="w-full gap-3">
                <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <p className="my-0 text-text-sm-bold">{t('section-bio-description')}</p>
                    {!isMobile && (
                        <>
                            {edit && (
                                <HStack className="gap-3">
                                    <PEIconButton
                                        onClick={(): void => handleSaveChefBiography()}
                                        icon={Icon.checkGreen}
                                        border="1px solid green"
                                        bg="white"
                                        size={'36px'}
                                    />
                                    <PEIconButton
                                        onClick={(): void => handleUnSaveChefBiography()}
                                        icon={Icon.closeRed}
                                        border="1px solid red"
                                        bg="white"
                                        size={'36px'}
                                    />
                                </HStack>
                            )}
                            {!edit && (
                                <PEIconButton onClick={(): void => setEdit(!edit)} icon={Icon.editPencil} iconSize={24} withoutShadow />
                            )}
                        </>
                    )}
                </HStack>

                {edit && <PEMultiLineTextField value={biography} onChange={(value): void => setBiography(value)} />}

                {!edit && (
                    <VStack
                        className="border-solid min-h-[128px] border-disabled border-[1px] py-4 px-[14px] rounded-3 w-full box-border"
                        style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}
                    >
                        <p className="text-start m-0">{biography}</p>
                    </VStack>
                )}
            </VStack>
        </VStack>
    );
}
