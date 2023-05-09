import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PECheckbox from '../../../../standard/checkbox/PECheckbox';
import PENumberTextField from '../../../../standard/textFields/PENumberTextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';

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
}: ChefProfilePageCreateMenusStep3Props): ReactElement {
    const { t } = useTranslation('chef-profile');

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
        </VStack>
    );
}
