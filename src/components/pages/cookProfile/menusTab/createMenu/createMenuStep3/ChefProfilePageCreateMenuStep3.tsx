import { Divider } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { type CurrencyCode } from '../../../../../../data-source/generated/graphql';
import useResponsive from '../../../../../../hooks/useResponsive';
import PEButton from '../../../../../standard/buttons/PEButton';
import PECheckbox from '../../../../../standard/checkbox/PECheckbox';
import PENumberTextField from '../../../../../standard/textFields/PENumberTextField';
import HStack from '../../../../../utility/hStack/HStack';
import VStack from '../../../../../utility/vStack/VStack';

export function calculateMenuPrice(
    adultParticipants: number,
    underagedParticipants: number,
    basePrice: number,
    basePriceCustomers: number,
    pricePerAdult: number,
    pricePerUnderaged?: number,
): number {
    if (adultParticipants + underagedParticipants <= basePriceCustomers) return basePrice;

    if (!pricePerUnderaged) return basePrice + (adultParticipants + underagedParticipants - basePriceCustomers) * pricePerAdult;

    if (adultParticipants - basePriceCustomers >= 0)
        return basePrice + (adultParticipants - basePriceCustomers) * pricePerAdult + underagedParticipants * pricePerUnderaged;

    return (underagedParticipants - basePriceCustomers - adultParticipants) * pricePerUnderaged + basePrice;
}

export interface ChefProfilePageCreateMenusStep3Props {
    currencyCode: CurrencyCode;

    basePrice: number;
    setBasePrice: (changedBasePrice: number) => void;

    basePriceCustomers: number;
    setBasePriceCustomers: (changedBasePriceCustomers: number) => void;

    pricePerAdult: number;
    setPricePerAdult: (changedPricePerAdult: number) => void;

    pricePerChild?: number;
    setPricePerChild: (changedPricePerChild?: number) => void;

    preparationTime: number;
    setPreparationTime: (changedPreparationTime: number) => void;

    isVisible: boolean;
    setIsVisible: (changedIsVisible: boolean) => void;

    onComplete: () => void;
}

export default function ChefProfilePageCreateMenusStep3({
    currencyCode,
    basePrice,
    setBasePrice,
    basePriceCustomers,
    setBasePriceCustomers,
    pricePerAdult,
    setPricePerAdult,
    pricePerChild,
    setPricePerChild,
    preparationTime,
    setPreparationTime,
    isVisible,
    setIsVisible,
    onComplete,
}: ChefProfilePageCreateMenusStep3Props): ReactElement {
    const { isMobile } = useResponsive();
    const { t } = useTranslation('chef-profile');

    const [childrenDiscount, setChildrenDiscount] = useState(20);

    const [adults, setAdults] = useState(4);
    const [children, setChildren] = useState(0);

    const price = calculateMenuPrice(adults, children, basePrice, basePriceCustomers, pricePerAdult, pricePerChild);

    const cookPrice = price * 0.82;

    return (
        <VStack gap={32} className="w-full" style={{ justifyContent: 'flex-end' }}>
            <HStack className="w-full gap-8 md:gap-0" style={{ alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <VStack className="h-full" style={{ flex: 1, alignItems: 'flex-start', minWidth: isMobile ? 200 : 512 }}>
                    <p className="text-text-m-bold">{t('create-menu-preparation-time')}</p>
                    <PENumberTextField
                        min={0}
                        max={240}
                        step={15}
                        onChange={setPreparationTime}
                        value={preparationTime}
                        endContent={<>min</>}
                    />
                </VStack>

                <HStack style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, minWidth: isMobile ? 200 : 512 }}>
                    <PECheckbox checked={isVisible} onCheckedChange={(): void => setIsVisible(!isVisible)} />
                    <p className="text-text-m-bold">{t('create-menu-is-visible')}</p>
                </HStack>
            </HStack>

            <Divider className="w-full mt-4 md:mt-0" />

            <HStack className="w-full gap-8 md:gap-4" style={{ flexWrap: 'wrap' }}>
                <VStack className="gap-4 md:gap-2" style={{ flex: 1, alignItems: 'flex-start', minWidth: isMobile ? 200 : 512 }}>
                    <p className="text-heading-l mb-2 md:text-text-m-bold">{t('create-menu-price-configuration-headline')}</p>

                    <p className="text-text-sm-bold">{t('create-menu-base-price')}</p>
                    <PENumberTextField
                        min={25}
                        max={10000}
                        step={10}
                        endContent={<p className="text-green">{currencyCode}</p>}
                        onChange={(changedBasePrice): void => setBasePrice(changedBasePrice * 100)}
                        value={basePrice / 100}
                    />

                    <p className="text-text-sm-bold">{t('create-menu-base-price-customers')}</p>
                    <PENumberTextField
                        min={1}
                        max={100}
                        step={1}
                        endContent={<p className="text-disabled">{t('create-menu-participants')}</p>}
                        onChange={setBasePriceCustomers}
                        value={basePriceCustomers}
                    />
                    <p className="text-text-sm text-disabled text-right">{t('create-menu-maximum-participants-label', { count: 20 })}</p>

                    <p className="text-text-sm-bold">{t('create-menu-price-per-adult')}</p>
                    <PENumberTextField
                        min={25}
                        max={10000}
                        step={20}
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
                            {pricePerChild !== undefined && (
                                <>
                                    <PENumberTextField
                                        min={1}
                                        max={100}
                                        step={1}
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

                            {pricePerChild === undefined && (
                                <>
                                    <PENumberTextField
                                        min={1}
                                        max={100}
                                        step={1}
                                        endContent={<p className="text-disabled">%</p>}
                                        onChange={setPricePerChild}
                                        value={0}
                                        disabled
                                    />
                                    <PENumberTextField
                                        min={0}
                                        max={0}
                                        step={0}
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

                <VStack className="gap-4 md:gap-0" style={{ flex: 1, alignItems: 'flex-start', minWidth: isMobile ? 200 : 512 }}>
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

            <PEButton title={t('create-menu-complete')} onClick={onComplete} />
        </VStack>
    );
}
