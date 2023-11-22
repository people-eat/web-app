import { useMutation, useQuery } from '@apollo/client';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import {
    AddOneCookLanguageDocument,
    FindLanguagesDocument,
    RemoveOneCookLanguageDocument,
} from '../../../../../data-source/generated/graphql';
import PEChoice from '../../../../standard/choice/PEChoice';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import PEAutoCompleteTextField from '../../../../standard/textFields/PEAutoCompleteTextField';
import HStack from '../../../../utility/hStack/HStack';
import Spacer from '../../../../utility/spacer/Spacer';
import VStack from '../../../../utility/vStack/VStack';

export interface ChefProfileSection5Props {
    onInvalidate: () => void;
    chefProfile: {
        cookId: string;
        languages: { languageId: string; title: string }[];
    };
}

export default function ChefProfileSection5({ chefProfile, onInvalidate }: ChefProfileSection5Props): ReactElement {
    const { t } = useTranslation('chef-profile');
    const [languageSearchText, setLanguageSearchText] = useState('');

    const { data, loading } = useQuery(FindLanguagesDocument);

    const languages = data?.languages.findAll ?? [];
    const filteredLanguages = languages.filter((language) => language.title.toLowerCase().includes(languageSearchText.toLowerCase()));

    const [removeOneCookLanguage] = useMutation(RemoveOneCookLanguageDocument);

    const [addOneCookLanguage] = useMutation(AddOneCookLanguageDocument);

    function handleAddNewLanguageById({ languageId }: { languageId: string; title: string }): void {
        try {
            void addOneCookLanguage({
                variables: {
                    cookId: chefProfile.cookId,
                    languageId,
                },
            }).then((): void => {
                onInvalidate();
                setLanguageSearchText('');
            });
        } catch (e) {
            console.error(e);
        }
    }

    function handleRemoveLanguageById(languageId: string): void {
        try {
            void removeOneCookLanguage({
                variables: {
                    cookId: chefProfile.cookId,
                    languageId,
                },
            }).then((): void => onInvalidate());
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <VStack
            className="w-full bg-white shadow-primary box-border p-8 md:p-4 rounded-4"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <HStack className="w-full">
                <h2 style={{ lineHeight: 0 }}>{t('section-languages')}</h2>
                <Spacer />
            </HStack>
            {data && !loading && (
                <VStack className="w-full gap-3">
                    <VStack className="w-full mt-4" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        <PEAutoCompleteTextField
                            startContent={<PEIcon icon={Icon.search} />}
                            searchText={languageSearchText}
                            onSearchTextChange={setLanguageSearchText}
                            options={filteredLanguages}
                            getOptionLabel={({ title }): string => title}
                            onOptionSelect={handleAddNewLanguageById}
                            placeholder={t('section-languages-search')}
                            className="mb-4"
                        />
                        <HStack
                            className="w-full gap-4 overflow-x-scroll"
                            style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}
                        >
                            {chefProfile.languages.map(({ languageId, title }, index) => (
                                <HStack key={index} className="gap-4" style={{ alignItems: 'center' }}>
                                    <PEChoice title={title} onClose={(): void => handleRemoveLanguageById(languageId)} />
                                </HStack>
                            ))}
                        </HStack>
                    </VStack>
                </VStack>
            )}
        </VStack>
    );
}
