import { useMutation } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import {
    UpdateCookMenuBasePriceCustomersDocument,
    UpdateCookMenuBasePriceDocument,
    UpdateCookMenuIsVisibleDocument,
    UpdateCookMenuPricePerAdultDocument,
    UpdateCookMenuPricePerChildDocument,
} from '../../../../../data-source/generated/graphql';
import PEButton from '../../../../standard/buttons/PEButton';
import PECheckbox from '../../../../standard/checkbox/PECheckbox';
import PENumberTextField from '../../../../standard/textFields/PENumberTextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';
import { type MenuEntity } from '../ChefProfilePageMenusTab';

export interface ChefProfilePageEditMenusStep3Props {
    menu: MenuEntity;
    cookId: string;
    onSaveUpdates: () => void;
}

export default function ChefProfilePageEditMenusStep3({ cookId, menu, onSaveUpdates }: ChefProfilePageEditMenusStep3Props): ReactElement {
    const { t } = useTranslation('chef-profile');

    // in cents: 10000 -> 100.00 EUR
    const [basePrice, setBasePrice] = useState(menu.basePrice ?? 100);
    const [basePriceCustomers, setBasePriceCustomers] = useState(menu.basePriceCustomers ?? 2);
    const [pricePerAdult, setPricePerAdult] = useState(menu.pricePerAdult ?? 5000);
    const [pricePerChild, setPricePerChild] = useState<undefined | number>(menu.pricePerChild ?? 0);

    const [isVisible, setIsVisible] = useState(menu.isVisible ?? true);

    const [updateBasePrice] = useMutation(UpdateCookMenuBasePriceDocument, {
        variables: { cookId, menuId: menu.menuId, basePrice },
    });
    const [updateBasePriceCustomers] = useMutation(UpdateCookMenuBasePriceCustomersDocument, {
        variables: { cookId, menuId: menu.menuId, basePriceCustomers },
    });
    const [updatePricePerAdult] = useMutation(UpdateCookMenuPricePerAdultDocument, {
        variables: { cookId, menuId: menu.menuId, pricePerAdult },
    });
    const [updatePricePerChild] = useMutation(UpdateCookMenuPricePerChildDocument, {
        variables: { cookId, menuId: menu.menuId, pricePerChild },
    });
    const [updateIsVisible] = useMutation(UpdateCookMenuIsVisibleDocument, {
        variables: { cookId, menuId: menu.menuId, isVisible },
    });

    function handleSaveUpdates(): void {
        try {
            if (menu.basePrice !== basePrice) void updateBasePrice();
            if (menu.basePriceCustomers !== basePriceCustomers) void updateBasePriceCustomers();
            if (menu.pricePerAdult !== pricePerAdult) void updatePricePerAdult();
            if (menu.pricePerChild !== pricePerChild) void updatePricePerChild();
            if (menu.isVisible !== isVisible) void updateIsVisible();
        } catch (e) {
            console.error(e);
        }

        onSaveUpdates();
    }

    return (
        <VStack className="w-full gap-2" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <HStack className="w-full gap-4 md:flex-wrap">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold m-0 my-3">{t('base-price')}</p>
                    <PENumberTextField endContent={<p className="m-0 text-green">EUR</p>} onChange={setBasePrice} value={basePrice} />
                </VStack>
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold m-0 my-3">für</p>
                    <PENumberTextField
                        endContent={<p className="m-0 text-disabled">{t('person')}</p>}
                        onChange={setBasePriceCustomers}
                        value={basePriceCustomers}
                    />
                    <p className="text-text-sm text-disabled w-full m-0 my-2 text-right">{t('max-count-persons', { count: 20 })}</p>
                </VStack>
            </HStack>
            <VStack className="w-1/2 md:w-full">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold m-0 my-3">{t('additional-person')}</p>
                    <PENumberTextField
                        endContent={<p className="m-0 text-green">EUR</p>}
                        onChange={setPricePerAdult}
                        value={pricePerAdult}
                    />
                </VStack>
                <p className="text-text-m-bold text-orange m-0 mt-6 w-full text-left">{t('children-discount')}</p>
                <HStack className="w-full gap-[150px] my-4" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <HStack style={{ alignItems: 'center' }}>
                        <PECheckbox checked={Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(2000)} />
                        <p className="m-0">Ja</p>
                    </HStack>
                    <HStack style={{ alignItems: 'center' }}>
                        <PECheckbox checked={!Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(undefined)} />
                        <p className="m-0">{t('no-button')}</p>
                    </HStack>
                </HStack>
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    {pricePerChild && (
                        <PENumberTextField
                            endContent={<p className="m-0 text-disabled">%</p>}
                            onChange={setPricePerChild}
                            value={pricePerChild}
                        />
                    )}
                    {!pricePerChild && (
                        <PENumberTextField
                            endContent={<p className="m-0 text-disabled">%</p>}
                            onChange={setPricePerChild}
                            value={0}
                            disabled
                        />
                    )}
                </VStack>
                <HStack className="w-full mt-4" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    <PECheckbox checked={isVisible} onCheckedChange={(): void => setIsVisible(!isVisible)} />
                    <p className="text-text-m-bold m-0 my-3">{t('publish-menu')}</p>
                </HStack>
            </VStack>

            <PEButton title="Save" onClick={handleSaveUpdates} />
        </VStack>
    );
}
