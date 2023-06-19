import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import useResponsive from '../../../../../hooks/useResponsive';
import PEButton from '../../../../standard/buttons/PEButton';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import PEIconButton from '../../../../standard/iconButton/PEIconButton';
import PEModalPopUp from '../../../../standard/modal/PEModalPopUp';
import PETextField from '../../../../standard/textFields/PETextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';

export default function ChefProfileSection3(): ReactElement {
    const { t } = useTranslation('chef-profile');
    const { isMobile } = useResponsive();

    const [openPopUp, setOpenPopUp] = useState(false);
    const [editMode, _setEditMode] = useState<null | number>(null);
    const [diplomaName, setDiplomaName] = useState('');
    const [data, setData] = useState('');
    const [diplomas, _setDiplomas] = useState(['Bio']);

    function handleOpenModal(): void {
        setOpenPopUp(!openPopUp);
    }

    function handleAddNewDiploma(): void {
        setOpenPopUp(!openPopUp);
    }

    function handleSaveDiploma(): void {
        setOpenPopUp(!openPopUp);
    }

    function handleUnSaveChefName(): void {
        setOpenPopUp(!openPopUp);
    }

    return (
        <VStack
            className="w-full bg-white shadow-primary box-border p-8 md:p-4 rounded-4 gap-3"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <PEModalPopUp width={isMobile ? '100%' : '750px'} openMenu={openPopUp} handleOpenMenu={handleUnSaveChefName}>
                <VStack className="w-[750px] md:w-full px-10 md:p-4 py-15 box-border relative">
                    <h2 className="m-0 mt-[-40px] pb-5 w-full text-heading-ss">{t('popup-training')}</h2>
                    <VStack className="w-full gap-2 pb-5">
                        <h2 className="m-0 w-full text-heading-ss">{t('popup-training-title')}</h2>
                        <h2 className="m-0 w-full text-text-m text-disabled">{t('popup-training-pre-title')}</h2>
                    </VStack>
                    <VStack className="w-full gap-4" style={{ alignItems: 'flex-start' }}>
                        <PETextField
                            type={'text'}
                            value={diplomaName}
                            placeholder={t('popup-training-field01')}
                            onChange={(value): void => setDiplomaName(value)}
                        />
                        <PETextField
                            type={'text'}
                            value={data}
                            placeholder={t('popup-training-field02')}
                            onChange={(value): void => setData(value)}
                        />
                        <h2 className="m-0 w-full text-heading-ss">{t('popup-training-photo')}</h2>
                        <VStack className="w-[200px] h-[200px] hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition border-solid border-[1px] border-disabled justify-center rounded-4">
                            <PEIcon icon={Icon.plus} />
                        </VStack>
                        <VStack className="w-full">
                            <p>{t('popup-training-displayed-info')}</p>
                            {editMode ? (
                                <PEButton className="max-w-[250px]" onClick={handleSaveDiploma} title={t('tickets-button')} />
                            ) : (
                                <PEButton className="max-w-[250px]" onClick={handleAddNewDiploma} title={t('tickets-button')} />
                            )}
                        </VStack>
                    </VStack>
                </VStack>
            </PEModalPopUp>
            <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <p className="text-heading-ss w-full justify-start my-0">{t('popup-training')}</p>
                <PEIconButton onClick={(): void => setOpenPopUp(!openPopUp)} icon={Icon.plus} iconSize={24} withoutShadow />
            </HStack>
            {diplomas.map((item, index) => (
                <HStack key={`${item}_${index}`} className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <HStack className="gap-3">
                        <PEIcon icon={Icon.checkGreen} />
                        <p className="w-full justify-start m-0">{item}</p>
                    </HStack>
                    <PEIconButton onClick={handleOpenModal} icon={Icon.editPencil} iconSize={24} withoutShadow />
                </HStack>
            ))}
        </VStack>
    );
}
