import { useState, type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import PECounter from '../../../standard/counter/PECounter';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import {
    addition,
    buttonTitle,
    calculate,
    calculateTitle,
    dataTitle,
    example,
    ordersCountTitle,
    perMonth,
    qualification,
    travel,
} from '../translations.mock';

export default function HowToChefSection2(): ReactElement {
    const [income, setIncome] = useState('2400');
    const [activeTab, setActiveTab] = useState('Master Chef');
    const [personsCount, setPersonsCount] = useState('4');

    function changePersonsCount(value: string, persons: string): string {
        return value.replace('{{personsCount}}', persons);
    }

    function calculateCountPrice(): void {
        const price = activeTab === 'Master Chef' ? 500 : activeTab === 'Chef' ? 400 : 300;
        setIncome(String(price * Number(personsCount)));
    }

    return (
        <VStack className="w-full max-w-screen-xl box-border">
            <VStack className="w-full gap-8">
                <div className="flex w-full lg:justify-center mt-[160px] mb-15">
                    <h2 className="w-full text-center lg:text-black lg:text-center w-full lg:text-heading-xm text-heading-xl m-0 p-0 lg:uppercase">
                        {calculate}
                    </h2>
                </div>
                <HStack className="w-full lg:flex-wrap lg:bg-howToChef lg:py-8 box-border ">
                    <VStack className="w-[50%] lg:w-full lg:px-10 box-border min-w-[460px] gap-12" style={{ alignItems: 'flex-start' }}>
                        <h3 className="text-heading-ss-bold m-0 py-0 lg:text-center lg:uppercase">{calculateTitle}</h3>
                        <VStack style={{ alignItems: 'flex-start' }}>
                            <p className="py-0">{qualification}</p>
                            <HStack className=" gap-3">
                                <PETabItem
                                    active={activeTab === 'Master Chef'}
                                    title={'Master Chef'}
                                    onClick={(): void => setActiveTab('Master Chef')}
                                />
                                <PETabItem active={activeTab === 'Chef'} title={'Chef'} onClick={(): void => setActiveTab('Chef')} />
                                <PETabItem
                                    active={activeTab === 'Hobby Chef'}
                                    title={'Hobby Chef'}
                                    onClick={(): void => setActiveTab('Hobby Chef')}
                                />
                            </HStack>
                        </VStack>
                        <VStack className="gap-3" style={{ alignItems: 'start' }}>
                            <p className="my-0 text-text-sm py-0 md:text-text-sm">{ordersCountTitle}</p>
                            <PECounter value={Number(personsCount)} onValueChange={(value): void => setPersonsCount(String(value))} />
                        </VStack>
                        <PEButton
                            className="max-w-[300px] md:max-w-full"
                            onClick={(): void => calculateCountPrice()}
                            title={buttonTitle}
                            type="secondary"
                        />
                    </VStack>
                    <VStack className="bg-howToChef w-[50%] lg:w-full min-w-[460px] p-15 md:p-8 box-border rounded-3">
                        <VStack
                            style={{ alignItems: 'flex-start' }}
                            className="w-full justify-between relative bg-white h-[250px] shadow-primary rounded-2 py-11 px-8 box-border"
                        >
                            <p className="absolute top-10 right-8 text-heading-xl md:text-text-m-bold my-0">{income}€</p>
                            <VStack style={{ alignItems: 'flex-start' }} className="w-full">
                                <p className="text-heading-m my-0 text-left w-full md:text-text-m-bold">{perMonth}</p>
                                <p className="text-disabled text-text-s w-[200px] my-2">{changePersonsCount(example, personsCount)}</p>
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start' }}>
                                <p className="text-text-m-bold my-3">{addition}</p>
                                <HStack className="w-full gap-12">
                                    <HStack className="gap-3" style={{ alignItems: 'center' }}>
                                        <VStack className="justify-center bg-orange w-6 h-6 rounded-6">
                                            <PEIcon icon={Icon.dataOrange} edgeLength={18} />
                                        </VStack>
                                        <p className="my-0 text-text-sm">{dataTitle}</p>
                                    </HStack>
                                    <HStack className="gap-3" style={{ alignItems: 'center' }}>
                                        <VStack className="justify-center bg-orange w-6 h-6 rounded-6">
                                            <PEIcon icon={Icon.travel} edgeLength={18} />
                                        </VStack>
                                        <p className="my-0 text-text-sm">{travel}</p>
                                    </HStack>
                                </HStack>
                            </VStack>
                        </VStack>
                    </VStack>
                </HStack>
            </VStack>
        </VStack>
    );
}
