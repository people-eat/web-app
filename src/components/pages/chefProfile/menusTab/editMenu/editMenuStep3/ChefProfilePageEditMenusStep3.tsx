import { useMutation, type ApolloQueryResult } from '@apollo/client';
import { Divider } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import {
    UpdateCookMenuBasePriceCustomersDocument,
    UpdateCookMenuBasePriceDocument,
    UpdateCookMenuIsVisibleDocument,
    UpdateCookMenuPricePerAdultDocument,
    UpdateCookMenuPricePerChildDocument,
    type CurrencyCode,
    type FindCookMenuQuery,
} from '../../../../../../data-source/generated/graphql';
import useResponsive from '../../../../../../hooks/useResponsive';
import PEButton from '../../../../../standard/buttons/PEButton';
import PECheckbox from '../../../../../standard/checkbox/PECheckbox';
import PENumberTextField from '../../../../../standard/textFields/PENumberTextField';
import HStack from '../../../../../utility/hStack/HStack';
import VStack from '../../../../../utility/vStack/VStack';
import { type MenuEntity } from '../../ChefProfilePageMenusTab';
import { menuPriceCalculation } from '../../createMenu/createMenuStep3/ChefProfilePageCreateMenuStep3';

export interface ChefProfilePageEditMenusStep3Props {
    menu: MenuEntity;
    cookId: string;
    refetchMenus: (variables?: Partial<{ menuId: string; cookId: string }> | undefined) => Promise<ApolloQueryResult<FindCookMenuQuery>>;
}

// eslint-disable-next-line max-statements
export default function ChefProfilePageEditMenusStep3({ cookId, menu, refetchMenus }: ChefProfilePageEditMenusStep3Props): ReactElement {
    const { isMobile } = useResponsive();
    const { t } = useTranslation('chef-profile');

    // in cents: 10000 -> 100.00 EUR
    const [basePrice, setBasePrice] = useState(menu.basePrice ?? 100);
    const [basePriceCustomers, setBasePriceCustomers] = useState(menu.basePriceCustomers ?? 2);
    const [pricePerAdult, setPricePerAdult] = useState(menu.pricePerAdult ?? 5000);
    const [pricePerChild, setPricePerChild] = useState<undefined | number>(menu.pricePerChild ?? 0);
    const [currencyCode] = useState<CurrencyCode>('EUR');
    const [childrenDiscount, setChildrenDiscount] = useState(20);
    const [preparationTime, setPreparationTime] = useState(menu?.preparationTime ?? 60);
    const [adults, setAdults] = useState(4);
    const [children, setChildren] = useState(0);
    const [isVisible, setIsVisible] = useState(menu.isVisible ?? true);
    const price = menuPriceCalculation(adults, children, basePrice, basePriceCustomers, pricePerAdult, pricePerChild);

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
    const [updateIsVisible] = useMutation(UpdateCookMenuIsVisibleDocument, {
        variables: { cookId, menuId: menu.menuId, isVisible },
    });

    function handleSaveUpdates(): void {
        if (menu.basePrice !== basePrice) {
            void updateBasePrice()
                .then((result) => result.data?.cooks.menus.success && void refetchMenus())
                .catch((e) => console.error(e));
        }

        if (menu.basePriceCustomers !== basePriceCustomers) {
            void updateBasePriceCustomers()
                .then((result) => result.data?.cooks.menus.success && void refetchMenus())
                .catch((e) => console.error(e));
        }

        if (menu.pricePerAdult !== pricePerAdult) {
            void updatePricePerAdult()
                .then((result) => result.data?.cooks.menus.success && void refetchMenus())
                .catch((e) => console.error(e));
        }

        if (menu.pricePerChild !== pricePerChild) {
            void updatePricePerChild()
                .then((result) => result.data?.cooks.menus.success && void refetchMenus())
                .catch((e) => console.error(e));
        }

        if (menu.isVisible !== isVisible) {
            void updateIsVisible()
                .then((result) => result.data?.cooks.menus.success && void refetchMenus())
                .catch((e) => console.error(e));
        }
    }

    return (
        <VStack className="w-full gap-2" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <HStack className="w-full gap-8 md:gap-0" style={{ alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <VStack className="h-full" style={{ flex: 1, alignItems: 'flex-start', minWidth: isMobile ? 200 : 512 }}>
                    <p className="text-text-m-bold">{'Preparation Time'}</p>
                    <PENumberTextField onChange={setPreparationTime} value={preparationTime} endContent={<>min</>} />
                </VStack>

                <HStack style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, minWidth: isMobile ? 200 : 512 }}>
                    <PECheckbox checked={isVisible} onCheckedChange={(): void => setIsVisible(!isVisible)} />
                    <p className="text-text-m-bold">{'Publish menu immediately after creation'}</p>
                </HStack>
            </HStack>

            <Divider className="w-full mt-4 md:mt-0" />

            <HStack className="w-full gap-8 md:gap-4" style={{ flexWrap: 'wrap' }}>
                <VStack className="gap-4 md:gap-0" style={{ flex: 1, alignItems: 'flex-start', minWidth: isMobile ? 200 : 512 }}>
                    <p className="text-heading-l mb-2 md:text-text-m-bold">{'Price Configuration'}</p>

                    <p className="text-text-sm-bold">{t('create-menu-base-price')}</p>
                    <PENumberTextField
                        endContent={<p className="text-green">{currencyCode}</p>}
                        onChange={(changedBasePrice): void => setBasePrice(changedBasePrice * 100)}
                        value={basePrice / 100}
                    />

                    <p className="text-text-sm-bold">{t('create-menu-base-price-customers')}</p>
                    <PENumberTextField
                        endContent={<p className="text-disabled">{t('create-menu-participants')}</p>}
                        onChange={setBasePriceCustomers}
                        value={basePriceCustomers}
                    />
                    <p className="text-text-sm text-disabled text-right">{t('create-menu-maximum-participants-label', { count: 20 })}</p>

                    <p className="text-text-sm-bold">{t('create-menu-price-per-adult')}</p>
                    <PENumberTextField
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

                        <VStack style={{ flex: 1 }} className="gap-4 md:gap-0">
                            {pricePerChild !== undefined && (
                                <>
                                    <PENumberTextField
                                        endContent={<>%</>}
                                        onChange={(changedChildrenDiscount): void => {
                                            setChildrenDiscount(changedChildrenDiscount);
                                            setPricePerChild(((100 - changedChildrenDiscount) / 100) * pricePerAdult);
                                        }}
                                        value={childrenDiscount}
                                    />
                                    <PENumberTextField
                                        endContent={<p className="text-green">{currencyCode}</p>}
                                        onChange={(): void => undefined}
                                        value={pricePerChild / 100}
                                        disabled
                                    />
                                </>
                            )}

                            {pricePerChild === undefined && (
                                <>
                                    <PENumberTextField
                                        endContent={<p className="text-disabled">%</p>}
                                        onChange={setPricePerChild}
                                        value={0}
                                        disabled
                                    />
                                    <PENumberTextField
                                        endContent={<p className="text-green">{currencyCode}</p>}
                                        onChange={(): void => undefined}
                                        value={0}
                                        disabled
                                    />
                                </>
                            )}
                        </VStack>
                    </HStack>
                </VStack>

                <VStack style={{ flex: 1, alignItems: 'flex-start', minWidth: isMobile ? 200 : 512 }} className="gap-4 md:gap-0">
                    <p className="text-heading-l mb-2 md:text-text-m-bold">{t('create-menu-price-simulation-headline')}</p>

                    <p className="text-text-sm-bold">{t('create-menu-price-simulation-adult-participants')}</p>
                    <PENumberTextField onChange={setAdults} value={adults} />

                    <p className="text-text-sm-bold">{t('create-menu-price-simulation-children')}</p>
                    <PENumberTextField onChange={setChildren} value={children} />

                    <p className="text-text-sm-bold">{t('create-menu-price-simulation-cook-payment')}</p>
                    <PENumberTextField
                        onChange={(): void => undefined}
                        value={cookPrice / 100}
                        disabled
                        endContent={<p className="text-green">{currencyCode}</p>}
                    />
                </VStack>
            </HStack>

            <PEButton
                title="Save"
                onClick={handleSaveUpdates}
                disabled={
                    menu.basePrice === basePrice &&
                    menu.basePriceCustomers === basePriceCustomers &&
                    menu.pricePerAdult === pricePerAdult &&
                    menu.pricePerChild === pricePerChild &&
                    menu.isVisible === isVisible
                }
            />
        </VStack>
    );
}
