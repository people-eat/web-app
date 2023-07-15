import { useMutation } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState, type ReactElement } from 'react';
import {
    UpdateCookMenuBasePriceCustomersDocument,
    UpdateCookMenuBasePriceDocument,
    UpdateCookMenuPricePerAdultDocument,
    UpdateCookMenuPricePerChildDocument,
    type CurrencyCode,
} from '../../../../../../data-source/generated/graphql';
import useResponsive from '../../../../../../hooks/useResponsive';
import PEButton from '../../../../../standard/buttons/PEButton';
import PECheckbox from '../../../../../standard/checkbox/PECheckbox';
import PENumberTextField from '../../../../../standard/textFields/PENumberTextField';
import HStack from '../../../../../utility/hStack/HStack';
import VStack from '../../../../../utility/vStack/VStack';
import { type MenuEntity } from '../../ChefProfilePageMenusTab';
import { calculateMenuPrice } from '../../createMenu/createMenuStep3/ChefProfilePageCreateMenuStep3';

export interface ChefProfilePageEditMenusStep3Props {
    menu: MenuEntity;
    cookId: string;
    onChangesApplied: () => void;
}

// eslint-disable-next-line max-statements
export default function ChefProfilePageEditMenusStep3({
    cookId,
    menu,
    onChangesApplied,
}: ChefProfilePageEditMenusStep3Props): ReactElement {
    const { isMobile } = useResponsive();
    const { t } = useTranslation('chef-profile');
    const { t: commonTranslations } = useTranslation('common');
    // in cents: 10000 -> 100.00 EUR
    const [basePrice, setBasePrice] = useState(menu.basePrice);
    const [basePriceCustomers, setBasePriceCustomers] = useState(menu.basePriceCustomers);
    const [pricePerAdult, setPricePerAdult] = useState(menu.pricePerAdult);
    const [pricePerChild, setPricePerChild] = useState<undefined | number>(menu.pricePerChild ?? undefined);
    const [currencyCode, setCurrencyCode] = useState<CurrencyCode>(menu.currencyCode);

    const [childrenDiscount, setChildrenDiscount] = useState(20);

    const [adults, setAdults] = useState(4);
    const [children, setChildren] = useState(0);
    const price = calculateMenuPrice(adults, children, basePrice, basePriceCustomers, pricePerAdult, pricePerChild ?? 0);

    const cookPrice = price * 0.82;

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

    function handleSaveUpdates(): void {
        if (menu.basePrice !== basePrice) {
            void updateBasePrice()
                .then((result) => result.data?.cooks.menus.success && void onChangesApplied())
                .catch((e) => console.error(e));
        }

        if (menu.basePriceCustomers !== basePriceCustomers) {
            void updateBasePriceCustomers()
                .then((result) => result.data?.cooks.menus.success && void onChangesApplied())
                .catch((e) => console.error(e));
        }

        if (menu.pricePerAdult !== pricePerAdult) {
            void updatePricePerAdult()
                .then((result) => result.data?.cooks.menus.success && void onChangesApplied())
                .catch((e) => console.error(e));
        }

        if (menu.pricePerChild !== pricePerChild) {
            void updatePricePerChild()
                .then((result) => result.data?.cooks.menus.success && void onChangesApplied())
                .catch((e) => console.error(e));
        }
    }

    useEffect(() => {
        setBasePrice(menu.basePrice);
        setBasePriceCustomers(menu.basePriceCustomers);
        setPricePerAdult(menu.pricePerAdult);
        setPricePerChild(menu.pricePerChild ?? undefined);
        setCurrencyCode(menu.currencyCode);
    }, [menu]);

    return (
        <VStack gap={32} className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <HStack gap={32} className="w-full" style={{ flexWrap: 'wrap' }}>
                <VStack gap={16} style={{ flex: 1, alignItems: 'flex-start', minWidth: isMobile ? 200 : 512 }}>
                    <p className="text-heading-l mb-2 md:text-text-m-bold">{t('create-menu-price-configuration-headline')}</p>

                    <p className="text-text-sm-bold">{t('create-menu-base-price')}</p>
                    <PENumberTextField
                        min={25}
                        step={10}
                        max={10000}
                        endContent={<p className="text-green">{currencyCode}</p>}
                        onChange={(changedBasePrice): void => setBasePrice(changedBasePrice * 100)}
                        value={basePrice / 100}
                    />

                    <p className="text-text-sm-bold">{t('create-menu-base-price-customers')}</p>
                    <PENumberTextField
                        min={1}
                        step={1}
                        max={100}
                        endContent={<p className="text-disabled">{t('create-menu-participants')}</p>}
                        onChange={setBasePriceCustomers}
                        value={basePriceCustomers}
                    />
                    <p className="text-text-sm text-disabled text-right">{t('create-menu-maximum-participants-label', { count: 20 })}</p>

                    <p className="text-text-sm-bold">{t('create-menu-price-per-adult')}</p>
                    <PENumberTextField
                        min={25}
                        step={10}
                        max={10000}
                        endContent={<p className="text-green">{currencyCode}</p>}
                        onChange={(changedPricePerAdult): void => {
                            setPricePerAdult(changedPricePerAdult * 100);
                            setPricePerChild(((100 - childrenDiscount) / 100) * changedPricePerAdult * 100);
                        }}
                        value={pricePerAdult / 100}
                    />

                    <p className="text-text-sm-bold text-orange">{t('create-menu-children-discount-label')}</p>

                    <HStack className="w-full">
                        <VStack style={{ alignItems: 'flex-start', justifyContent: 'center', flex: 1 }} gap={20}>
                            <HStack style={{ alignItems: 'center' }}>
                                <PECheckbox checked={!Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(undefined)} />
                                <span>{t('create-menu-no')}</span>
                            </HStack>

                            <HStack style={{ alignItems: 'center' }}>
                                <PECheckbox checked={Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(2000)} />
                                <span>{t('create-menu-yes')}</span>
                            </HStack>
                        </VStack>

                        <VStack style={{ flex: 1 }} className="gap-4">
                            {pricePerChild !== undefined && pricePerChild !== null && (
                                <>
                                    <PENumberTextField
                                        min={1}
                                        step={1}
                                        max={100}
                                        endContent={<>%</>}
                                        onChange={(changedChildrenDiscount): void => {
                                            setChildrenDiscount(changedChildrenDiscount);
                                            setPricePerChild(((100 - changedChildrenDiscount) / 100) * pricePerAdult);
                                        }}
                                        value={childrenDiscount}
                                    />
                                    <PENumberTextField
                                        min={0}
                                        step={0}
                                        max={0}
                                        endContent={<p className="text-green">{currencyCode}</p>}
                                        onChange={(): void => undefined}
                                        value={pricePerChild / 100}
                                        disabled
                                    />
                                </>
                            )}

                            {pricePerChild === undefined ||
                                (pricePerChild === null && (
                                    <>
                                        <PENumberTextField
                                            min={1}
                                            step={1}
                                            max={100}
                                            endContent={<p className="text-disabled">%</p>}
                                            onChange={setPricePerChild}
                                            value={0}
                                            disabled
                                        />
                                        <PENumberTextField
                                            min={0}
                                            step={0}
                                            max={0}
                                            endContent={<p className="text-green">{currencyCode}</p>}
                                            onChange={(): void => undefined}
                                            value={0}
                                            disabled
                                        />
                                    </>
                                ))}
                        </VStack>
                    </HStack>
                </VStack>

                <VStack gap={16} style={{ flex: 1, alignItems: 'flex-start', minWidth: isMobile ? 200 : 512 }}>
                    <p className="text-heading-l mb-2 md:text-text-m-bold">{t('create-menu-price-simulation-headline')}</p>

                    <p className="text-text-sm-bold">{t('create-menu-price-simulation-adult-participants')}</p>
                    <PENumberTextField min={1} step={1} max={10000} onChange={setAdults} value={adults} />

                    <p className="text-text-sm-bold">{t('create-menu-price-simulation-children')}</p>
                    <PENumberTextField min={0} step={1} max={10000} onChange={setChildren} value={children} />

                    <p className="text-text-sm-bold">{t('create-menu-price-simulation-cook-payment')}</p>
                    <PENumberTextField
                        min={0}
                        step={0}
                        max={0}
                        onChange={(): void => undefined}
                        value={cookPrice / 100}
                        disabled
                        endContent={<p className="text-green">{currencyCode}</p>}
                    />
                </VStack>
            </HStack>

            <HStack className="w-full" style={{ marginTop: 32 }}>
                <PEButton
                    title={commonTranslations('save')}
                    onClick={handleSaveUpdates}
                    disabled={
                        menu.basePrice === basePrice &&
                        menu.basePriceCustomers === basePriceCustomers &&
                        menu.pricePerAdult === pricePerAdult &&
                        (menu.pricePerChild ?? undefined) === pricePerChild &&
                        menu.currencyCode === currencyCode
                    }
                />
            </HStack>
        </VStack>
    );
}
