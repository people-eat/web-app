import { useState, type ReactElement } from 'react';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import PEIconButton from '../../../../standard/iconButton/PEIconButton';
import PETextField from '../../../../standard/textFields/PETextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';

export default function ChefProfileSection5(): ReactElement {
    const [edit, setEdit] = useState(false);
    const [languages, setLanguages] = useState(['Russian', 'English']);

    function handleChangeLanguage(values: string): void {
        const result = languages;
        result.push(values);

        setLanguages(result);
    }

    function handleSaveChefName(): void {
        setEdit(!edit);
    }

    function handleUnSaveChefName(): void {
        setEdit(!edit);
    }

    return (
        <VStack
            className="w-full bg-white shadow-primary box-border p-8 rounded-4"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <p className="text-heading-ss w-full justify-start my-0">Language</p>
            <VStack className="w-full gap-3">
                <HStack className="w-full mt-[-36px]" style={{ alignItems: 'center', justifyContent: 'flex-end' }}>
                    {edit ? (
                        <HStack className="gap-3">
                            <PEIconButton
                                onClick={(): void => handleSaveChefName()}
                                icon={Icon.checkGreen}
                                border="1px solid green"
                                bg="white"
                                size={'36px'}
                            />
                            <PEIconButton
                                onClick={(): void => handleUnSaveChefName()}
                                icon={Icon.closeRed}
                                border="1px solid red"
                                bg="white"
                                size={'36px'}
                            />
                        </HStack>
                    ) : (
                        <PEIconButton onClick={(): void => setEdit(!edit)} icon={Icon.editPencil} iconSize={24} withoutShadow />
                    )}
                </HStack>
                <VStack className="w-full mt-4" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <PETextField className="mb-4" type={'text'} placeholder={'Search'} startContent={<PEIcon icon={Icon.search} />} />
                    {edit ? (
                        <>
                            {languages.map((language, index) => (
                                <HStack key={`${language}_${index}`} className="w-full gap-4" style={{ alignItems: 'center' }}>
                                    <PETextField className="mb-4" value={language} type={'text'} onChange={handleChangeLanguage} />
                                    <div className="mb-4">
                                        <PEIconButton icon={Icon.trash} withoutShadow size={'40px'} iconSize={24} />
                                    </div>
                                </HStack>
                            ))}
                        </>
                    ) : (
                        <>
                            {languages.map((language, index) => (
                                <HStack key={`${language}_${index}`} className="w-full gap-4" style={{ alignItems: 'center' }}>
                                    <p className="w-full text-text-m border-[1px] border-solid border-disabled py-[17px] px-[14px] rounded-3 m-0 mb-4">
                                        {language}
                                    </p>
                                    <div className="mb-4">
                                        <PEIconButton icon={Icon.trash} withoutShadow size={'40px'} iconSize={24} />
                                    </div>
                                </HStack>
                            ))}
                        </>
                    )}
                </VStack>
            </VStack>
        </VStack>
    );
}
