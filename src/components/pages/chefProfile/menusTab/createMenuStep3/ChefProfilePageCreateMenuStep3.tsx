import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
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

    const [adults, setAdults] = useState(4);
    const [children, setChildren] = useState(0);

    const price = menuPriceCalculation(adults, children, basePrice, basePriceCustomers, pricePerAdult, pricePerChild);

    const cookPrice = price * 0.82;

    return (
        <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <HStack gap={16} className="w-full md:flex-wrap">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">{t('base-price')}</p>
                    <PENumberTextField
                        endContent={<p className="text-green">EUR</p>}
                        onChange={(changedBasePrice): void => setBasePrice(changedBasePrice * 100)}
                        value={basePrice / 100}
                    />
                </VStack>

                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">für</p>

                    <PENumberTextField
                        endContent={<p className="text-disabled">{t('person')}</p>}
                        onChange={setBasePriceCustomers}
                        value={basePriceCustomers}
                    />

                    <p className="text-text-sm text-disabled w-full text-right">{t('max-count-persons', { count: 20 })}</p>
                </VStack>
            </HStack>

            <VStack className="w-1/2 md:w-full">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">{t('additional-person')}</p>
                    <PENumberTextField
                        endContent={<p className="text-green">EUR</p>}
                        onChange={(changedPricePerAdult): void => setPricePerAdult(changedPricePerAdult * 100)}
                        value={pricePerAdult / 100}
                    />
                </VStack>

                <p className="text-text-m-bold text-orange w-full text-left">{t('children-discount')}</p>

                <HStack className="w-full gap-[150px]" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <HStack style={{ alignItems: 'center' }}>
                        <PECheckbox checked={Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(2000)} />
                        <span>Yes</span>
                    </HStack>

                    <HStack style={{ alignItems: 'center' }}>
                        <PECheckbox checked={!Boolean(pricePerChild)} onCheckedChange={(): void => setPricePerChild(undefined)} />
                        <span>{t('no-button')}</span>
                    </HStack>
                </HStack>

                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    {pricePerChild && (
                        <PENumberTextField
                            endContent={<p className="text-green">EUR</p>}
                            onChange={(changedPricePerChild): void => setPricePerChild(changedPricePerChild * 100)}
                            value={pricePerChild / 100}
                        />
                    )}

                    {!pricePerChild && (
                        <PENumberTextField endContent={<p className="text-disabled">%</p>} onChange={setPricePerChild} value={0} disabled />
                    )}
                </VStack>

                <HStack className="w-full mt-4" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    <PECheckbox checked={isVisible} onCheckedChange={(): void => setIsVisible(!isVisible)} />
                    <p className="text-text-m-bold">{t('publish-menu')}</p>
                </HStack>
            </VStack>

            <p className="w-full text-heading-l mb-2">Price Simulation</p>

            <HStack gap={16} className="w-full md:flex-wrap">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">{'Adult Participants'}</p>
                    <PENumberTextField onChange={setAdults} value={adults} />
                </VStack>

                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">{'Children'}</p>
                    <PENumberTextField onChange={setChildren} value={children} />
                </VStack>
            </HStack>

            <HStack gap={16} className="w-full md:flex-wrap">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold">{'What you get'}</p>
                    <PENumberTextField
                        onChange={(): void => undefined}
                        value={cookPrice / 100}
                        disabled
                        endContent={<p className="text-green">EUR</p>}
                    />
                </VStack>
            </HStack>

            <PEButton title="Complete" onClick={onComplete} />
        </VStack>
    );
}
