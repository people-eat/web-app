import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import { type Category } from '../../../../../../shared-domain/Category';
import { type Kitchen } from '../../../../../../shared-domain/Kitchen';
import PEButton from '../../../../../standard/buttons/PEButton';
import PETabItem from '../../../../../standard/tabItem/PETabItem';
import PETextField from '../../../../../standard/textFields/PETextField';
import HStack from '../../../../../utility/hStack/HStack';
import VStack from '../../../../../utility/vStack/VStack';

export interface ChefProfilePageCreateMenusStep1Props {
    title: string;
    setTitle: (changedTitle: string) => void;

    categories: Category[];
    selectedCategories: Category[];
    setSelectedCategories: (changedSelectedCategories: Category[]) => void;

    kitchens: Kitchen[];
    selectedKitchen?: Kitchen;
    setSelectedKitchen: (changedSelectedKitchen?: Kitchen) => void;

    onContinue: () => void;
}

export default function ChefProfilePageCreateMenusStep1({
    title,
    setTitle,
    categories,
    selectedCategories,
    setSelectedCategories,
    kitchens,
    selectedKitchen,
    setSelectedKitchen,
    onContinue,
}: ChefProfilePageCreateMenusStep1Props): ReactElement {
    const { t } = useTranslation('chef-profile');

    return (
        <VStack gap={32} className="w-full" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">{t('create-menu-title')}</p>
                <PETextField type={'text'} value={title} onChange={setTitle} />
            </VStack>

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">{t('create-menu-categories')}</p>
                <HStack gap={16} style={{ width: '100%', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {categories.map((category) => (
                        <PETabItem
                            key={category.categoryId}
                            title={category.title}
                            onClick={(): void => {
                                const isSelected = !!selectedCategories.find(
                                    (selectedCategory) => selectedCategory.categoryId === category.categoryId,
                                );
                                if (isSelected) {
                                    setSelectedCategories(
                                        selectedCategories.filter(
                                            (selectedCategory) => selectedCategory.categoryId !== category.categoryId,
                                        ),
                                    );
                                } else setSelectedCategories([...selectedCategories, category]);
                            }}
                            active={!!selectedCategories.find((selectedCategory) => selectedCategory.categoryId === category.categoryId)}
                        />
                    ))}
                </HStack>
            </VStack>

            {/* <PEDropdown
                title={t('create-menu-categories')}
                defaultExpanded
                options={categories}
                getOptionLabel={(category): string => category.title}
                optionsEqual={(categoryA, categoryB): boolean => categoryA.categoryId === categoryB.categoryId}
                setSelectedOptions={setSelectedCategories}
                showSelectedCount
                selectedOptions={selectedCategories}
            /> */}

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">{t('create-menu-kitchen')}</p>
                <HStack gap={16} style={{ width: '100%', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                    {kitchens.map((kitchen) => (
                        <PETabItem
                            key={kitchen.kitchenId}
                            title={kitchen.title}
                            onClick={(): void => {
                                if (selectedKitchen?.kitchenId === kitchen.kitchenId) setSelectedKitchen(undefined);
                                else setSelectedKitchen(kitchen);
                            }}
                            active={selectedKitchen?.kitchenId === kitchen.kitchenId}
                        />
                    ))}
                </HStack>
            </VStack>

            {/* <PESingleSelectDropdown
                title={t('create-menu-kitchen')}
                options={kitchens}
                getOptionLabel={(kitchen): string => kitchen.title}
                optionsEqual={(kitchenA, kitchenB): boolean => kitchenA.kitchenId === kitchenB.kitchenId}
                selectedOption={selectedKitchen}
                setSelectedOption={setSelectedKitchen}
                defaultExpanded
            /> */}

            <PEButton title={t('create-menu-continue')} onClick={onContinue} />
        </VStack>
    );
}
