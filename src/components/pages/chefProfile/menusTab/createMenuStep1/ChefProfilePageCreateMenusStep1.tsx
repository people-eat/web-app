import { type ReactElement } from 'react';
import PEButton from '../../../../standard/buttons/PEButton';
import PEDropdown from '../../../../standard/dropdown/PEDropdown';
import PETextField from '../../../../standard/textFields/PETextField';
import VStack from '../../../../utility/vStack/VStack';

const CATEGORIES: { categoryId: string; title: string }[] = [
    { categoryId: 'A', title: 'Vegetarian' },
    { categoryId: 'B', title: 'Kosher' },
    { categoryId: 'C', title: 'Vegetarian' },
    { categoryId: 'D', title: 'Kosher' },
];

const KITCHENS: { kitchenId: string; title: string }[] = [
    { kitchenId: 'A', title: 'European' },
    { kitchenId: 'B', title: 'Asian' },
    { kitchenId: 'C', title: 'European' },
    { kitchenId: 'D', title: 'Asian' },
];

export interface ChefProfilePageCreateMenusStep1Props {
    title: string;
    setTitle: (changedTitle: string) => void;

    selectedKitchen?: { kitchenId: string; title: string };
    setSelectedKitchen: (changedSelectedKitchen?: { kitchenId: string; title: string }) => void;

    onContinue: () => void;
}

export default function ChefProfilePageCreateMenusStep1({
    title,
    setTitle,
    onContinue,
}: ChefProfilePageCreateMenusStep1Props): ReactElement {
    return (
        <VStack className="w-full gap-6" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Menu name</p>
                <PETextField type={'text'} value={title} onChange={setTitle} />
            </VStack>

            <PEDropdown title={'Categories'} options={CATEGORIES} getOptionLabel={(category): string => category.title} defaultExpanded />

            <PEDropdown title={'Kitchen'} options={KITCHENS} getOptionLabel={(kitchen): string => kitchen.title} defaultExpanded />

            <PEButton title="Continue" onClick={onContinue} />
        </VStack>
    );
}
