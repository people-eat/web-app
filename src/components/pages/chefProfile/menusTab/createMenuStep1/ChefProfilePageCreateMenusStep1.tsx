import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import PEButton from '../../../../standard/buttons/PEButton';
import PEDropdown from '../../../../standard/dropdown/PEDropdown';
import PESingleSelectDropdown from '../../../../standard/dropdown/PESingleSelectDropdown';
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

    selectedCategories: { categoryId: string; title: string }[];
    setSelectedCategories: (changedSelectedCategories: { categoryId: string; title: string }[]) => void;

    selectedKitchen?: { kitchenId: string; title: string };
    setSelectedKitchen: (changedSelectedKitchen?: { kitchenId: string; title: string }) => void;

    onContinue: () => void;
}

export default function ChefProfilePageCreateMenusStep1({
    title,
    setTitle,
    selectedCategories,
    setSelectedCategories,
    selectedKitchen,
    setSelectedKitchen,
    onContinue,
}: ChefProfilePageCreateMenusStep1Props): ReactElement {
    const { t } = useTranslation('chef-profile');

    return (
        <VStack className="w-full gap-6" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">{t('create-menu-title')}</p>
                <PETextField type={'text'} value={title} onChange={setTitle} />
            </VStack>

            <PEDropdown
                title={t('create-menu-categories')}
                defaultExpanded
                options={CATEGORIES}
                getOptionLabel={(category): string => category.title}
                optionsEqual={(categoryA, categoryB): boolean => categoryA.categoryId === categoryB.categoryId}
                setSelectedOptions={setSelectedCategories}
                showSelectedCount
                selectedOptions={selectedCategories}
            />

            <PESingleSelectDropdown
                title={t('create-menu-kitchen')}
                options={KITCHENS}
                getOptionLabel={(kitchen): string => kitchen.title}
                optionsEqual={(kitchenA, kitchenB): boolean => kitchenA.kitchenId === kitchenB.kitchenId}
                selectedOption={selectedKitchen}
                setSelectedOption={setSelectedKitchen}
                defaultExpanded
            />

            <PEButton title={t('create-menu-continue')} onClick={onContinue} />
        </VStack>
    );
}
