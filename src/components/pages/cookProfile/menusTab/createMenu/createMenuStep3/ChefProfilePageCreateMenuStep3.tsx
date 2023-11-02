import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Button, Divider, MenuItem, Select } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { type CurrencyCode, type Price } from '../../../../../../data-source/generated/graphql';
import useResponsive from '../../../../../../hooks/useResponsive';
import PEButton from '../../../../../standard/buttons/PEButton';
import PECheckbox from '../../../../../standard/checkbox/PECheckbox';
import PECounter from '../../../../../standard/counter/PECounter';
import { Icon } from '../../../../../standard/icon/Icon';
import PEIcon from '../../../../../standard/icon/PEIcon';
import PENumberTextField from '../../../../../standard/textFields/PENumberTextField';
import HStack from '../../../../../utility/hStack/HStack';
import Spacer from '../../../../../utility/spacer/Spacer';
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

    const [costDetailsShown, setCostDetailsShown] = useState(false);

    const price = calculateMenuPrice(adults, children, basePrice, basePriceCustomers, pricePerAdult, pricePerChild);

    const cookPrice = price * 0.82;

    const formatPrice = (p: Price): string => (p.amount / 100).toFixed(2) + ' ' + p.currencyCode;

    const formattedFee = formatPrice({ amount: price * 0.18, currencyCode: 'EUR' });

    const formattedPrice = formatPrice({ amount: price, currencyCode: 'EUR' });

    const formattedCookPrice = formatPrice({ amount: cookPrice, currencyCode: 'EUR' });

    return (
        <VStack gap={32} className="w-full" style={{ justifyContent: 'flex-end', alignItems: 'flex-start' }}>
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

            <Divider className="w-full mt-4 md:mt-0" />

            <HStack className="w-full gap-8 md:gap-0" style={{ alignItems: 'flex-end', flexWrap: 'wrap' }}>
                <VStack className="h-full" style={{ flex: 1, alignItems: 'flex-start', minWidth: isMobile ? 200 : 512 }}>
                    <p className="text-text-m-bold">{t('create-menu-preparation-time')}</p>
                    <Select
                        value={String(preparationTime)}
                        onChange={(event): void => setPreparationTime(Number(event.target.value))}
                        sx={{
                            '&.Mui-focused': {
                                '.MuiOutlinedInput-notchedOutline': {
                                    border: '1px solid black',
                                    borderColor: 'black',
                                },
                            },
                            borderRadius: '12px',
                            width: '100%',
                        }}
                    >
                        <MenuItem value={30}>30 Min</MenuItem>
                        <MenuItem value={60}>1 Std</MenuItem>
                        <MenuItem value={90}>1 Std 30 Min</MenuItem>
                        <MenuItem value={120}>2 Std</MenuItem>
                        <MenuItem value={150}>2 Std 30 Min</MenuItem>
                        <MenuItem value={180}>3 Std</MenuItem>
                    </Select>
                </VStack>

                <HStack style={{ alignItems: 'center', justifyContent: 'flex-start', flex: 1, minWidth: isMobile ? 200 : 512 }}>
                    <PECheckbox checked={isVisible} onCheckedChange={(): void => setIsVisible(!isVisible)} />
                    <p className="text-text-m-bold">{t('create-menu-is-visible')}</p>
                </HStack>
            </HStack>
            <PEButton title={t('create-menu-complete')} onClick={onComplete} />
        </VStack>
    );
}
