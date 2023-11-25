import { useMutation, useQuery } from '@apollo/client';
import { Alert, Dialog, DialogContent, Divider, MenuItem, Select, Snackbar } from '@mui/material';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState, type ReactElement } from 'react';
import {
    DeleteOneCookMenuDocument,
    GetCreateMenuPageDataDocument,
    UpdateCookMenuDescriptionDocument,
    UpdateCookMenuIsVisibleDocument,
    UpdateCookMenuKitchenIdDocument,
    UpdateCookMenuPreparationTimeDocument,
    UpdateCookMenuTitleDocument,
} from '../../../../../../data-source/generated/graphql';
import { type Category } from '../../../../../../shared-domain/Category';
import { type Kitchen } from '../../../../../../shared-domain/Kitchen';
import PEButton from '../../../../../standard/buttons/PEButton';
import PECheckbox from '../../../../../standard/checkbox/PECheckbox';
import { Icon } from '../../../../../standard/icon/Icon';
import PEIconButton from '../../../../../standard/iconButton/PEIconButton';
import PETabItem from '../../../../../standard/tabItem/PETabItem';
import PEMultiLineTextField from '../../../../../standard/textFields/PEMultiLineTextField';
import PETextField from '../../../../../standard/textFields/PETextField';
import HStack from '../../../../../utility/hStack/HStack';
import VStack from '../../../../../utility/vStack/VStack';
import { type MenuEntity } from '../../createMenu/createMenuStep2/CreateCookMenuCourse';

export interface ChefProfilePageEditMenusStep1Props {
    menu: MenuEntity;
    cookId: string;
    onChangesApplied: () => void;
    onDelete: () => void;
}

// eslint-disable-next-line max-statements
export default function ChefProfilePageEditMenusStep1({
    cookId,
    menu,
    onChangesApplied,
    onDelete,
}: ChefProfilePageEditMenusStep1Props): ReactElement {
    const { t } = useTranslation('chef-profile');
    const { t: commonTranslations } = useTranslation('common');
    const [title, setTitle] = useState(menu.title);
    const [description, setDescription] = useState(menu.description);

    const [selectedKitchen, setSelectedKitchen] = useState<Kitchen | undefined>(menu.kitchen ?? undefined);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>(menu.categories);

    const [preparationTime, setPreparationTime] = useState(menu.preparationTime);
    const [isVisible, setIsVisible] = useState(menu.isVisible);

    const [updateTitle] = useMutation(UpdateCookMenuTitleDocument, { variables: { cookId, menuId: menu.menuId, title } });
    const [updateDescription] = useMutation(UpdateCookMenuDescriptionDocument, { variables: { cookId, menuId: menu.menuId, description } });
    const [updateKitchenId] = useMutation(UpdateCookMenuKitchenIdDocument, {
        variables: { cookId, menuId: menu.menuId, kitchenId: selectedKitchen?.kitchenId },
    });
    const [updateIsVisible] = useMutation(UpdateCookMenuIsVisibleDocument, { variables: { cookId, menuId: menu.menuId, isVisible } });
    const [updatePreparationTime] = useMutation(UpdateCookMenuPreparationTimeDocument, {
        variables: { cookId, menuId: menu.menuId, preparationTime },
    });

    const [deleteMenu] = useMutation(DeleteOneCookMenuDocument, { variables: { cookId, menuId: menu.menuId } });
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const { data } = useQuery(GetCreateMenuPageDataDocument);

    const kitchens = data?.kitchens.findAll ?? [];
    const categories = data?.categories.findAll ?? [];

    const [changesHaveBeenSaved, setChangesHaveBeenSaved] = useState(false);

    function handleSaveUpdates(): void {
        if (menu.title !== title) {
            void updateTitle()
                .then((result) => result.data?.cooks.menus.success && void onChangesApplied())
                .catch((e) => console.error(e));
        }

        if (menu.description !== description) {
            void updateDescription()
                .then((result) => result.data?.cooks.menus.success && void onChangesApplied())
                .catch((e) => console.error(e));
        }

        if (menu.kitchen?.kitchenId !== selectedKitchen?.kitchenId) {
            void updateKitchenId()
                .then((result) => result.data?.cooks.menus.success && void onChangesApplied())
                .catch((e) => console.error(e));
        }

        if (menu.isVisible !== isVisible) {
            void updateIsVisible()
                .then((result) => result.data?.cooks.menus.success && void onChangesApplied())
                .catch((e) => console.error(e));
        }

        if (menu.preparationTime !== preparationTime) {
            void updatePreparationTime()
                .then((result) => result.data?.cooks.menus.success && void onChangesApplied())
                .catch((e) => console.error(e));
        }

        setChangesHaveBeenSaved(true);
        setTimeout(() => setChangesHaveBeenSaved(false), 2000);
    }

    useEffect(() => {
        setTitle(menu.title);
        setDescription(menu.description);
        setSelectedKitchen(menu.kitchen ?? undefined);
        setSelectedCategories(menu.categories);
        setPreparationTime(menu.preparationTime);
        setIsVisible(menu.isVisible);
    }, [menu]);

    return (
        <VStack className="w-full" gap={32} style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">{t('create-menu-title')}</p>
                <PETextField type={'text'} value={title} onChange={setTitle} />
            </VStack>

            <VStack style={{ alignItems: 'flex-start' }} className="w-full">
                <p className="text-text-m-bold">{t('create-menu-description')}</p>
                <PEMultiLineTextField value={description} onChange={setDescription} />
            </VStack>

            <Divider className="w-full" />

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

            <Divider className="w-full" />

            <VStack className="h-full" style={{ flex: 1, alignItems: 'flex-start', minWidth: 400 }}>
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

            <HStack style={{ alignItems: 'center' }}>
                <PECheckbox checked={isVisible} onCheckedChange={(): void => setIsVisible(!isVisible)} />
                <p className="text-text-m-bold">{isVisible ? t('menu-detail-is-visible-label') : t('menu-detail-is-not-visible-label')}</p>
            </HStack>

            <HStack className="w-full" gap={16} style={{ marginTop: 32 }}>
                <PEButton title={commonTranslations('delete')} type="secondary" onClick={(): void => setShowDeleteDialog(true)} />
                <PEButton
                    title={commonTranslations('save')}
                    onClick={handleSaveUpdates}
                    disabled={
                        menu.title === title &&
                        menu.description === description &&
                        menu.kitchen?.kitchenId === selectedKitchen?.kitchenId &&
                        menu.preparationTime === preparationTime &&
                        menu.isVisible === isVisible
                    }
                />
            </HStack>

            <Snackbar open={changesHaveBeenSaved} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert severity="success">Änderungen erfolgreich gespeichert</Alert>
            </Snackbar>

            <Dialog open={showDeleteDialog} onClose={(): void => setShowDeleteDialog(false)}>
                <DialogContent>
                    <VStack className="gap-8 relative box-border">
                        <VStack className="absolute top-0 right-0">
                            <PEIconButton
                                iconSize={24}
                                icon={Icon.close}
                                onClick={(): void => setShowDeleteDialog(false)}
                                withoutShadow
                                bg="white"
                            />
                        </VStack>

                        <p className="m-0 mt-2 text-text-m-bold w-full text-start">Menü löschen</p>

                        <p className="m-0 w-full text-start">Soll {menu.title} wirklich gelöscht werden?</p>

                        <HStack className="w-full gap-4">
                            <PEButton onClick={(): void => setShowDeleteDialog(false)} title={t('cancel-button')} type="secondary" />
                            <PEButton
                                title={t('create-meal-dropdown-delete')}
                                onClick={(): void => {
                                    deleteMenu()
                                        .then(({ data: deleteData }) => {
                                            if (deleteData?.cooks?.menus?.success) onDelete();
                                        })
                                        .catch((error) => console.log(error));
                                }}
                            />
                        </HStack>
                    </VStack>
                </DialogContent>
            </Dialog>
        </VStack>
    );
}
