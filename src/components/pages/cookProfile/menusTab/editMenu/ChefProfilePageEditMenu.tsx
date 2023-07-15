import { useQuery } from '@apollo/client';
import { CircularProgress, Tab, Tabs } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { FindCookMenuDocument } from '../../../../../data-source/generated/graphql';
import { Icon } from '../../../../standard/icon/Icon';
import PEIconButton from '../../../../standard/iconButton/PEIconButton';
import VStack from '../../../../utility/vStack/VStack';
import ChefProfilePageEditMenusStep1 from './editMenuStep1/ChefProfilePageEditMenusStep1';
import ChefProfilePageEditMenusStep2 from './editMenuStep2/ChefProfilePageEditMenusStep2';
import ChefProfilePageEditMenusStep3 from './editMenuStep3/ChefProfilePageEditMenusStep3';

interface ChefProfilePageEditMenuProps {
    cookId: string;
    menuId: string;
    onSaveUpdates: () => void;
}

export default function ChefProfilePageEditMenu({ cookId, menuId, onSaveUpdates }: ChefProfilePageEditMenuProps): ReactElement {
    const [step, setStep] = useState(0);
    const { t } = useTranslation('chef-profile');
    const { data, loading, refetch } = useQuery(FindCookMenuDocument, { variables: { menuId, cookId } });
    const menu = data?.cooks.menus.findOne;

    return (
        <VStack className="w-full relative gap-8" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack
                className="w-full relative bg-white shadow-primary md:shadow-none box-border p-8 md:p-0 rounded-4 gap-6"
                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <div className="absolute top-8 right-8 md:top-2 md:right-0">
                    <PEIconButton icon={Icon.close} onClick={onSaveUpdates} withoutShadow bg="white" iconSize={24} />
                </div>

                <VStack className="w-full mb-6" style={{ alignItems: 'flex-start' }}>
                    <p className="w-full text-heading-xl md:text-heading-s my-0 mb-6">{t('edit-menu-title')}</p>
                    <Tabs value={step}>
                        <Tab label="Common" onClick={(): void => setStep(0)} style={{ textTransform: 'none' }} />
                        <Tab label="Courses" onClick={(): void => setStep(1)} style={{ textTransform: 'none' }} />
                        <Tab label="Price" onClick={(): void => setStep(2)} style={{ textTransform: 'none' }} />
                    </Tabs>
                </VStack>

                {step === 0 && menu && (
                    <ChefProfilePageEditMenusStep1 menu={menu} cookId={cookId} onChangesApplied={(): void => void refetch()} />
                )}

                {step === 1 && menu && (
                    <ChefProfilePageEditMenusStep2 menu={menu} cookId={cookId} onChangesApplied={(): void => void refetch()} />
                )}

                {step === 2 && menu && (
                    <ChefProfilePageEditMenusStep3 menu={menu} cookId={cookId} onChangesApplied={(): void => void refetch()} />
                )}

                {loading && <CircularProgress />}
            </VStack>
        </VStack>
    );
}
