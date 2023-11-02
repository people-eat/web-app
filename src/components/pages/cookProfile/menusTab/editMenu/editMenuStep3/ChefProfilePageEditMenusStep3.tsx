import { useMutation } from '@apollo/client';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Divider } from '@mui/material';
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
import { formatPrice } from '../../../../../../shared-domain/formatPrice';
import PEButton from '../../../../../standard/buttons/PEButton';
import PECheckbox from '../../../../../standard/checkbox/PECheckbox';
import PECounter from '../../../../../standard/counter/PECounter';
import { Icon } from '../../../../../standard/icon/Icon';
import PEIcon from '../../../../../standard/icon/PEIcon';
import PENumberTextField from '../../../../../standard/textFields/PENumberTextField';
import HStack from '../../../../../utility/hStack/HStack';
import Spacer from '../../../../../utility/spacer/Spacer';
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
    // const price = calculateMenuPrice(adults, children, basePrice, basePriceCustomers, pricePerAdult, pricePerChild ?? 0);

    // const cookPrice = price * 0.82;

    const [costDetailsShown, setCostDetailsShown] = useState(false);

    const price = calculateMenuPrice(adults, children, basePrice, basePriceCustomers, pricePerAdult, pricePerChild);

    const cookPrice = price * 0.82;

    const formattedFee = formatPrice({ amount: price * 0.18, currencyCode: 'EUR' });

    const formattedPrice = formatPrice({ amount: price, currencyCode: 'EUR' });

    const formattedCookPrice = formatPrice({ amount: cookPrice, currencyCode: 'EUR' });
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
            {isMobile && (
                <VStack gap={16}>
                    <span>Menü Basispreis</span>
                    <PENumberTextField
                        min={25}
                        max={10000}
                        step={10}
                        onChange={(changedBasePrice): void => setBasePrice(changedBasePrice * 100)}
                        value={basePrice / 100}
                        endContent={<p className="text-black">{currencyCode}</p>}
                        style={{ width: 100 }}
                    />
                    <span>Für wie viele Personen?</span>
                    <PENumberTextField
                        min={1}
                        max={100}
                        step={1}
                        onChange={setBasePriceCustomers}
                        value={basePriceCustomers}
                        style={{ width: 100 }}
                    />
                    <span>Für jede weitere Person</span>
                    <PENumberTextField
                        min={25}
                        max={10000}
                        step={20}
                        onChange={(changedPricePerAdult): void => {
                            setPricePerAdult(changedPricePerAdult * 100);
                            setPricePerChild(((100 - childrenDiscount) / 100) * changedPricePerAdult * 100);
                        }}
                        endContent={<p className="text-black">{currencyCode}</p>}
                        value={pricePerAdult / 100}
                        style={{ width: 100 }}
                    />
                    <span className="text-heading-l mb-2 md:text-text-m-bold">Möchtest du einen Kinderrabat anbieten?</span>
                    <HStack gap={16} style={{ alignItems: 'center' }}>
                        <PECheckbox checked={Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(2000)} />
                        <span>{t('create-menu-yes')}</span>

                        <PECheckbox checked={!Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(undefined)} />
                        <span>{t('create-menu-no')}</span>
                    </HStack>

                    {pricePerChild && (
                        <>
                            <span>Kinder im Alter von 6-12 Jahren erhalten eine Ermäßigung in Höhe von</span>
                            <PENumberTextField
                                min={1}
                                max={100}
                                step={1}
                                onChange={(changedChildrenDiscount): void => {
                                    setChildrenDiscount(changedChildrenDiscount);
                                    setPricePerChild(((100 - changedChildrenDiscount) / 100) * pricePerAdult);
                                }}
                                value={childrenDiscount}
                                style={{ width: 100 }}
                                endContent={<>%</>}
                            />
                            <span className="text-text-sm" style={{ color: 'gray' }}>
                                Der Kinderrabatt (z.B. 50%) berechnet sich auf Grundlage des angesetzten Betrags den du für jede weitere
                                Person (z.B. 50 EUR) angegeben hast.
                            </span>
                            <span className="text-text-sm" style={{ color: 'gray' }}>
                                Mit dem gegebenen Beispielrabatt würde der Preis pro Kind beträgt 25 EUR betragen.
                            </span>
                        </>
                    )}

                    <p className="text-heading-l mb-2 md:text-text-m-bold">Dein erwarteter Umsatz</p>

                    <VStack gap={16}>
                        <VStack gap={16} className="bg-white shadow-primary rounded-2" style={{ padding: 32, alignItems: 'flex-start' }}>
                            {costDetailsShown && (
                                <>
                                    <HStack style={{ justifyContent: 'space-between', width: '100%', color: 'gray' }}>
                                        <span>Menüpreis</span>
                                        <span>{formattedPrice}</span>
                                    </HStack>
                                    <HStack style={{ justifyContent: 'space-between', width: '100%', color: 'gray' }}>
                                        <span>Servicegühr für Köche</span>
                                        <span>{formattedFee}</span>
                                    </HStack>
                                    <Divider flexItem />
                                </>
                            )}

                            <HStack
                                className="text-heading-xl md:text-text-m-bold"
                                style={{ width: '100%', justifyContent: 'space-between' }}
                            >
                                <span>Du erhältst</span>
                                <span>{formattedCookPrice}</span>
                            </HStack>

                            <span className="text-text-m-bold">Hinzu kommen</span>

                            <HStack gap={8} style={{ alignItems: 'center' }}>
                                <VStack className="justify-center bg-orange w-6 h-6 rounded-6">
                                    <PEIcon icon={Icon.dataWhite} edgeLength={18} />
                                </VStack>

                                <p className="my-0 text-text-sm">Trinkgeld</p>

                                <VStack className="justify-center bg-orange w-6 h-6 rounded-6">
                                    <PEIcon icon={Icon.travelWhite} edgeLength={18} />
                                </VStack>

                                <p className="my-0 text-text-sm">Fahrtkosten</p>
                            </HStack>
                            <span className="text-text-sm" style={{ color: 'gray' }}>
                                Für Fahrtkosten und Trinkgeld fallen keine Servicegebühren an
                            </span>
                        </VStack>
                        <Button style={{ color: 'gray' }} onClick={(): void => setCostDetailsShown(!costDetailsShown)}>
                            {!costDetailsShown && (
                                <VStack>
                                    <span>Mehr anzeigen</span>
                                    <KeyboardArrowDownIcon />
                                </VStack>
                            )}
                            {costDetailsShown && (
                                <VStack>
                                    <span>Weniger anzeigen</span>
                                    <KeyboardArrowUpIcon />
                                </VStack>
                            )}
                        </Button>
                    </VStack>

                    <HStack gap={32} style={{ width: '100%', alignItems: 'top', flexWrap: 'wrap' }}>
                        <VStack style={{ justifyContent: 'space-evenly', height: 120, alignItems: 'flex-start' }}>
                            <span>Erwachsene</span>
                            <span>Kinder</span>
                        </VStack>
                        <VStack style={{ justifyContent: 'space-evenly', height: 120 }}>
                            <PECounter value={adults} onValueChange={setAdults} />
                            <PECounter value={children} onValueChange={setChildren} />
                        </VStack>
                    </HStack>
                </VStack>
            )}
            {!isMobile && (
                <>
                    <HStack gap={8} style={{ alignItems: 'center' }}>
                        <span>Der Menüpreis beträgt</span>
                        <PENumberTextField
                            min={25}
                            max={10000}
                            step={10}
                            onChange={(changedBasePrice): void => setBasePrice(changedBasePrice * 100)}
                            value={basePrice / 100}
                            endContent={<p className="text-black">{currencyCode}</p>}
                            style={{ width: 120 }}
                        />
                        <span> für</span>
                        <PENumberTextField
                            min={1}
                            max={100}
                            step={1}
                            onChange={setBasePriceCustomers}
                            value={basePriceCustomers}
                            style={{ width: 80 }}
                        />
                        <span>Personen.</span>
                    </HStack>
                    <HStack gap={8} style={{ alignItems: 'center' }}>
                        <span>Für jede weitere Person wird ein Preis in Höhe von</span>
                        <PENumberTextField
                            min={25}
                            max={10000}
                            step={20}
                            onChange={(changedPricePerAdult): void => {
                                setPricePerAdult(changedPricePerAdult * 100);
                                setPricePerChild(((100 - childrenDiscount) / 100) * changedPricePerAdult * 100);
                            }}
                            endContent={<p className="text-black">{currencyCode}</p>}
                            value={pricePerAdult / 100}
                            style={{ width: 120 }}
                        />
                        <span> angesetzt.</span>
                    </HStack>
                    <VStack style={{ alignItems: 'flex-start' }}>
                        <span className="text-heading-l mb-2 md:text-text-m-bold">Möchtest du einen Kinderrabat anbieten?</span>
                        <HStack gap={16} style={{ alignItems: 'center' }}>
                            <PECheckbox checked={Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(2000)} />
                            <span>{t('create-menu-yes')}</span>

                            <PECheckbox checked={!Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(undefined)} />
                            <span>{t('create-menu-no')}</span>
                        </HStack>
                    </VStack>
                    {pricePerChild && (
                        <VStack style={{ alignItems: 'flex-start' }}>
                            <HStack gap={8} style={{ alignItems: 'center' }}>
                                Kinder im Alter von 6-12 Jahren erhalten eine Ermäßigung in Höhe von
                                <PENumberTextField
                                    min={1}
                                    max={100}
                                    step={1}
                                    onChange={(changedChildrenDiscount): void => {
                                        setChildrenDiscount(changedChildrenDiscount);
                                        setPricePerChild(((100 - changedChildrenDiscount) / 100) * pricePerAdult);
                                    }}
                                    value={childrenDiscount}
                                    style={{ width: 80 }}
                                />
                                %.
                            </HStack>
                            <VStack className="text-text-sm" style={{ alignItems: 'flex-start', color: 'gray' }}>
                                <span>Beispiel:</span>
                                <span>
                                    Der Kinderrabatt (z.B. 50%) berechnet sich auf Grundlage des angesetzten Betrags den du für jede weitere
                                    Person (z.B. 50 EUR) angegeben hast.
                                </span>
                                <span>Mit dem gegebenen Beispielrabatt würde der Preis pro Kind beträgt 25 EUR betragen.</span>
                            </VStack>
                        </VStack>
                    )}

                    <p className="text-heading-l mb-2 md:text-text-m-bold">Dein erwarteter Umsatz</p>
                    <HStack gap={32} style={{ width: '100%', alignItems: 'top', flexWrap: 'wrap' }}>
                        <VStack style={{ justifyContent: 'space-evenly', height: 120, alignItems: 'flex-start' }}>
                            <span>Erwachsene</span>
                            <span>Kinder</span>
                        </VStack>
                        <VStack style={{ justifyContent: 'space-evenly', height: 120 }}>
                            <PECounter value={adults} onValueChange={setAdults} />
                            <PECounter value={children} onValueChange={setChildren} />
                        </VStack>

                        <Spacer />

                        <VStack gap={16}>
                            <VStack
                                gap={16}
                                className="bg-white shadow-primary rounded-2"
                                style={{ padding: 32, alignItems: 'flex-start' }}
                            >
                                {costDetailsShown && (
                                    <>
                                        <HStack style={{ justifyContent: 'space-between', width: '100%', color: 'gray' }}>
                                            <span>Menüpreis</span>
                                            <span>{formattedPrice}</span>
                                        </HStack>
                                        <HStack style={{ justifyContent: 'space-between', width: '100%', color: 'gray' }}>
                                            <span>Servicegühr für Köche</span>
                                            <span>{formattedFee}</span>
                                        </HStack>
                                        <Divider flexItem />
                                    </>
                                )}

                                <HStack
                                    className="text-heading-xl md:text-text-m-bold"
                                    style={{ width: 600, justifyContent: 'space-between' }}
                                >
                                    <span>Du erhältst</span>
                                    <span>{formattedCookPrice}</span>
                                </HStack>
                                <span className="text-text-m-bold">Hinzu kommen</span>
                                <HStack gap={8} style={{ alignItems: 'center' }}>
                                    <VStack className="justify-center bg-orange w-6 h-6 rounded-6">
                                        <PEIcon icon={Icon.dataWhite} edgeLength={18} />
                                    </VStack>

                                    <p className="my-0 text-text-sm">Trinkgeld</p>

                                    <VStack className="justify-center bg-orange w-6 h-6 rounded-6">
                                        <PEIcon icon={Icon.travelWhite} edgeLength={18} />
                                    </VStack>

                                    <p className="my-0 text-text-sm">Fahrtkosten</p>
                                </HStack>
                                <span className="text-text-sm" style={{ color: 'gray' }}>
                                    Für Fahrtkosten und Trinkgeld fallen keine Servicegebühren an
                                </span>
                            </VStack>
                            <Button style={{ color: 'gray' }} onClick={(): void => setCostDetailsShown(!costDetailsShown)}>
                                {!costDetailsShown && (
                                    <VStack>
                                        <span>Mehr anzeigen</span>
                                        <KeyboardArrowDownIcon />
                                    </VStack>
                                )}
                                {costDetailsShown && (
                                    <VStack>
                                        <span>Weniger anzeigen</span>
                                        <KeyboardArrowUpIcon />
                                    </VStack>
                                )}
                            </Button>
                        </VStack>
                    </HStack>
                </>
            )}

            {/* <HStack gap={32} className="w-full" style={{ flexWrap: 'wrap' }}>
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
            </HStack> */}

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
