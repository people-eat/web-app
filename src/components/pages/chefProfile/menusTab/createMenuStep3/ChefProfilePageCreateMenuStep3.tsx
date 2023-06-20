import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { type CurrencyCode } from '../../../../../data-source/generated/graphql';
import PEButton from '../../../../standard/buttons/PEButton';
import PECheckbox from '../../../../standard/checkbox/PECheckbox';
import PENumberTextField from '../../../../standard/textFields/PENumberTextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';

export function menuPriceCalculation(
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
    isVisible,
    setIsVisible,
    onComplete,
}: ChefProfilePageCreateMenusStep3Props): ReactElement {
    const { t } = useTranslation('chef-profile');

    const [childrenDiscount, setChildrenDiscount] = useState(20);

    const [adults, setAdults] = useState(4);
    const [children, setChildren] = useState(0);

    const price = menuPriceCalculation(adults, children, basePrice, basePriceCustomers, pricePerAdult, pricePerChild);

    const cookPrice = price * 0.82;

    return (
        <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <HStack gap={16} className="w-full md:flex-wrap">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">{t('create-menu-base-price')}</p>
                    <PENumberTextField
                        endContent={<p className="text-green">{currencyCode}</p>}
                        onChange={(changedBasePrice): void => setBasePrice(changedBasePrice * 100)}
                        value={basePrice / 100}
                    />
                </VStack>

                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">{t('create-menu-base-price-customers')}</p>

                    <PENumberTextField
                        endContent={<p className="text-disabled">{t('create-menu-participants')}</p>}
                        onChange={setBasePriceCustomers}
                        value={basePriceCustomers}
                    />

                    <p className="text-text-sm text-disabled w-full text-right">
                        {t('create-menu-maximum-participants-label', { count: 20 })}
                    </p>
                </VStack>
            </HStack>

            <VStack className="w-1/2 md:w-full">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">{t('create-menu-price-per-adult')}</p>
                    <PENumberTextField
                        endContent={<p className="text-green">{currencyCode}</p>}
                        onChange={(changedPricePerAdult): void => {
                            setPricePerAdult(changedPricePerAdult * 100);
                            setPricePerChild(((100 - childrenDiscount) / 100) * changedPricePerAdult * 100);
                        }}
                        value={pricePerAdult / 100}
                    />
                </VStack>

                <p className="text-text-m-bold text-orange w-full text-left">{t('create-menu-children-discount-label')}</p>

                <HStack className="w-full gap-[150px]" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <HStack style={{ alignItems: 'center' }}>
                        <PECheckbox checked={Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(2000)} />
                        <span>{t('create-menu-yes')}</span>
                    </HStack>

                    <HStack style={{ alignItems: 'center' }}>
                        <PECheckbox checked={!Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(undefined)} />
                        <span>{t('create-menu-no')}</span>
                    </HStack>
                </HStack>

                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    {pricePerChild && (
                        <>
                            <PENumberTextField
                                endContent={<>%</>}
                                onChange={(changedChildrenDiscount): void => {
                                    setChildrenDiscount(changedChildrenDiscount);
                                    setPricePerChild(((100 - changedChildrenDiscount) / 100) * pricePerAdult);
                                }}
                                value={childrenDiscount}
                            />
                            <p className="text-text-sm text-disabled w-full text-right">
                                {pricePerChild / 100} {currencyCode}
                            </p>
                        </>
                    )}

                    {!pricePerChild && (
                        <PENumberTextField endContent={<p className="text-disabled">%</p>} onChange={setPricePerChild} value={0} disabled />
                    )}
                </VStack>
            </VStack>

            <p className="w-full text-heading-l mb-2">{t('create-menu-price-simulation-headline')}</p>

            <HStack gap={16} className="w-full md:flex-wrap">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">{t('create-menu-price-simulation-adult-participants')}</p>
                    <PENumberTextField onChange={setAdults} value={adults} />
                </VStack>

                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">{t('create-menu-price-simulation-children')}</p>
                    <PENumberTextField onChange={setChildren} value={children} />
                </VStack>
            </HStack>

            <HStack gap={16} className="w-full md:flex-wrap">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">{t('create-menu-price-simulation-cook-payment')}</p>
                    <PENumberTextField
                        onChange={(): void => undefined}
                        value={cookPrice / 100}
                        disabled
                        endContent={<p className="text-green">{currencyCode}</p>}
                    />
                </VStack>
            </HStack>

            <HStack className="w-full mt-4" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                <PECheckbox checked={isVisible} onCheckedChange={(): void => setIsVisible(!isVisible)} />
                <p className="text-text-m-bold">{t('create-menu-publish-menu')}</p>
            </HStack>

            <PEButton title={t('create-menu-complete')} onClick={onComplete} />
        </VStack>
    );
}
