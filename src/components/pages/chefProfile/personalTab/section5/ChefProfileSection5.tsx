import { useMutation, useQuery } from '@apollo/client';
import { useState, type ReactElement } from 'react';
import { FindLanguagesDocument, RemoveOneCookLanguageDocument } from '../../../../../data-source/generated/graphql';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import PEIconButton from '../../../../standard/iconButton/PEIconButton';
import PEAutoCompleteTextField from '../../../../standard/textFields/PEAutoCompleteTextField';
import PETextField from '../../../../standard/textFields/PETextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';

export interface ChefProfileSection5Props {
    chefProfile: {
        cookId: string;
        languages: { languageId: string; title: string }[];
    };
}

export default function ChefProfileSection5({ chefProfile }: ChefProfileSection5Props): ReactElement {
    const [edit, setEdit] = useState(false);
    const [languageSearchText, setLanguageSearchText] = useState('');

    const { data } = useQuery(FindLanguagesDocument);

    const languages = data?.languages.findAll ?? [];

    const [removeOneCookLanguage] = useMutation(RemoveOneCookLanguageDocument);

    // const [addOneCookLanguage] = useMutation(AddOneCookLanguageDocument);

    return (
        <VStack
            className="w-full bg-white shadow-primary box-border p-8 rounded-4"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <p className="text-heading-ss w-full justify-start my-0">Language</p>
            <VStack className="w-full gap-3">
                <HStack className="w-full mt-[-36px]" style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    {edit && (
                        <HStack className="gap-3">
                            <PEIconButton
                                onClick={(): void => setEdit(false)}
                                icon={Icon.checkGreen}
                                border="1px solid green"
                                bg="white"
                                size={'36px'}
                            />
                        </HStack>
                    )}
                    {!edit && <PEIconButton onClick={(): void => setEdit(!edit)} icon={Icon.editPencil} iconSize={24} withoutShadow />}
                </HStack>
                <VStack className="w-full mt-4" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <PEAutoCompleteTextField
                        startContent={<PEIcon icon={Icon.search} />}
                        searchText={languageSearchText}
                        onSearchTextChange={(changedSearchText: string): void => {
                            setLanguageSearchText(changedSearchText);
                        }}
                        options={languages}
                        getOptionLabel={({ title }): string => title}
                        onOptionSelect={(): void => undefined}
                        placeholder={'Add language'}
                        className="mb-4"
                    />

                    {chefProfile.languages.map(({ languageId, title }, index) => (
                        <HStack key={index} className="w-full gap-4" style={{ alignItems: 'center' }}>
                            <PETextField className="mb-4" value={title} type={'text'} />
                            {edit && (
                                <div className="mb-4">
                                    <PEIconButton
                                        icon={Icon.trash}
                                        withoutShadow
                                        size={'40px'}
                                        iconSize={24}
                                        onClick={(): void =>
                                            void removeOneCookLanguage({ variables: { cookId: chefProfile.cookId, languageId } })
                                        }
                                    />
                                </div>
                            )}
                        </HStack>
                    ))}
                </VStack>
            </VStack>
        </VStack>
    );
}
