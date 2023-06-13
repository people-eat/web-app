import { useState, type ReactElement } from 'react';
import PECheckbox from '../../../../standard/checkbox/PECheckbox';
import PETextField from '../../../../standard/textFields/PETextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';
import { type MealEntity } from '../ChefProfilePageMenusTab';
import { checkboxesTitle, textField01, textField02, textField02Bottom, textField03, textField04 } from '../meals.mock';

export interface ChefProfilePageCreateMenusStep3Props {
    cookId: string;
    onSelectedMeals: (selectedMeals: MealEntity[]) => void;
}

export default function ChefProfilePageCreateMenusStep3(): ReactElement {
    const [field01, setField01] = useState('100');
    const [field02, setField02] = useState('2');
    const [field03, setField03] = useState('50');
    const [field04, setField04] = useState('50');
    const [discountForChildren, setDiscountForChildren] = useState(true);
    const [publish, setPublish] = useState(true);

    return (
        <VStack className="w-full gap-2" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <HStack className="w-full gap-4 md:flex-wrap">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold m-0 my-3">{textField01}</p>
                    <PETextField
                        type="number"
                        endContent={<p className="m-0 text-green">EUR</p>}
                        onChange={(value): void => setField01(value)}
                        value={field01}
                    />
                </VStack>
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold m-0 my-3">für</p>
                    <PETextField
                        type="number"
                        endContent={<p className="m-0 text-disabled">{textField02}</p>}
                        onChange={(value): void => setField02(value)}
                        value={field02}
                    />
                    <p className="text-text-sm text-disabled w-full m-0 my-2 text-right">{textField02Bottom}</p>
                </VStack>
            </HStack>
            <VStack className="w-1/2 md:w-full">
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <p className="text-text-m-bold m-0 my-3">{textField03}</p>
                    <PETextField
                        type="number"
                        endContent={<p className="m-0 text-green">EUR</p>}
                        onChange={(value): void => setField03(value)}
                        value={field03}
                    />
                </VStack>
                <p className="text-text-m-bold text-orange m-0 mt-6 w-full text-left">{checkboxesTitle}</p>
                <HStack className="w-full gap-[150px] my-4" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <HStack style={{ alignItems: 'center' }}>
                        <PECheckbox checked={discountForChildren} onCheckedChange={(): void => setDiscountForChildren(true)} />
                        <p className="m-0">Ja</p>
                    </HStack>
                    <HStack style={{ alignItems: 'center' }}>
                        <PECheckbox checked={!discountForChildren} onCheckedChange={(): void => setDiscountForChildren(false)} />
                        <p className="m-0">Nein</p>
                    </HStack>
                </HStack>
                <VStack className="w-full" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <PETextField
                        type="number"
                        endContent={<p className="m-0 text-disabled">%</p>}
                        onChange={(value): void => setField04(value)}
                        value={field04}
                    />
                </VStack>
                <HStack className="w-full mt-4" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
                    <PECheckbox checked={publish} onCheckedChange={(): void => setPublish(!publish)} />
                    <p className="text-text-m-bold m-0 my-3">{textField04}</p>
                </HStack>
            </VStack>
        </VStack>
    );
}
