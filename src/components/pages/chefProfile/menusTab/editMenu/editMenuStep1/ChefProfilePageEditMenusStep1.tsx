import { useMutation, useQuery, type ApolloQueryResult } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import {
    GetCreateMenuPageDataDocument,
    UpdateCookMenuKitchenIdDocument,
    UpdateCookMenuTitleDocument,
    type FindCookMenuQuery,
} from '../../../../../../data-source/generated/graphql';
import PEButton from '../../../../../standard/buttons/PEButton';
import PEDropdown from '../../../../../standard/dropdown/PEDropdown';
import PESingleSelectDropdown from '../../../../../standard/dropdown/PESingleSelectDropdown';
import PETextField from '../../../../../standard/textFields/PETextField';
import VStack from '../../../../../utility/vStack/VStack';
import { type MenuEntity } from '../../ChefProfilePageMenusTab';

export interface ChefProfilePageEditMenusStep1Props {
    menu: MenuEntity;
    cookId: string;
    refetchMenus: (variables?: Partial<{ menuId: string; cookId: string }> | undefined) => Promise<ApolloQueryResult<FindCookMenuQuery>>;
}

export default function ChefProfilePageEditMenusStep1({ cookId, menu, refetchMenus }: ChefProfilePageEditMenusStep1Props): ReactElement {
    const { t } = useTranslation('chef-profile');

    const [title, setTitle] = useState(menu.title ?? '');
    const [selectedKitchen, setSelectedKitchen] = useState<{ kitchenId: string; title: string } | undefined | null>(menu.kitchen);
    const [selectedCategories, setSelectedCategories] = useState<{ categoryId: string; title: string }[]>(menu.categories ?? []);

    const [updateTitle] = useMutation(UpdateCookMenuTitleDocument, { variables: { cookId, menuId: menu.menuId, title } });
    const [updateKitchenId] = useMutation(UpdateCookMenuKitchenIdDocument, {
        variables: { cookId, menuId: menu.menuId, kitchenId: selectedKitchen?.kitchenId ?? undefined },
    });

    const { data, refetch: refetchLists } = useQuery(GetCreateMenuPageDataDocument);

    const kitchens = data?.kitchens.findAll ?? [];
    const categories = data?.categories.findAll ?? [];

    function handleSaveUpdates(): void {
        if (menu.title !== title) {
            void updateTitle()
                .then((result) => {
                    if (result.data?.cooks.menus.success) {
                        void refetchMenus();
                        void refetchLists();
                    }
                })
                .catch((e) => console.error(e));
        }

        if (menu.kitchen?.kitchenId !== selectedKitchen?.kitchenId) {
            void updateKitchenId()
                .then((result) => {
                    if (result.data?.cooks.menus.success) {
                        void refetchMenus();
                        void refetchLists();
                    }
                })
                .catch((e) => console.error(e));
        }
    }

    return (
        <VStack className="w-full gap-6" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">{t('create-menu-title')}</p>
                <PETextField type={'text'} value={title} onChange={setTitle} />
            </VStack>

            <PEDropdown
                title={'Categories'}
                defaultExpanded
                options={categories}
                getOptionLabel={(category): string => category.title}
                optionsEqual={(categoryA, categoryB): boolean => categoryA.categoryId === categoryB.categoryId}
                setSelectedOptions={setSelectedCategories}
                showSelectedCount
                selectedOptions={selectedCategories}
            />

            <PESingleSelectDropdown
                title={'Kitchen'}
                options={kitchens}
                getOptionLabel={(kitchen): string => kitchen?.title ?? ''}
                optionsEqual={(kitchenA, kitchenB): boolean => kitchenA?.kitchenId === kitchenB?.kitchenId}
                selectedOption={selectedKitchen}
                setSelectedOption={setSelectedKitchen}
                defaultExpanded
            />

            <PEButton title="Save" onClick={handleSaveUpdates} disabled={menu.title === title && menu.kitchen === selectedKitchen} />
        </VStack>
    );
}
