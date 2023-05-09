import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { type CookRank } from '../../../../data-source/generated/graphql';
import { cookRanks } from '../../../../shared/cookRanks';
import PECounter from '../../../standard/counter/PECounter';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import {
    addition,
    calculate,
    calculateTitle,
    dataTitle,
    example,
    ordersCountTitle,
    perMonth,
    qualification,
    travel,
} from '../translations.mock';
import { CalculatorRoulette } from './CalculatorRoulette';

const incomePerParticipantMap: Record<CookRank, number> = {
    ['HOBBY']: 300,
    ['PROFESSIONAL']: 400,
    ['MASTER']: 500,
};

export default function HowToChefSection2(): ReactElement {
    const { t: commonTranslation } = useTranslation('common');

    const [selectedCookRank, setSelectedCookRank] = useState<CookRank>('MASTER');
    const [participantCount, setParticipantCount] = useState(4);
    const [income, setIncome] = useState({ prev: 2000, next: 2000 });

    function changePersonsCount(value: string, persons: number): string {
        return value.replace('{{personsCount}}', String(persons));
    }

    function calculateCountPrice(rank: CookRank, participants: number): void {
        setIncome({ prev: income.next, next: incomePerParticipantMap[rank] * participants });
    }

    return (
        <VStack className="w-full max-w-screen-xl box-border">
            <VStack className="w-full gap-8">
                <div className="flex w-full lg:justify-center mt-[160px] mb-15 md:mt-15 md:mb-10">
                    <h2 className="w-full text-center lg:text-black lg:text-center lg:text-heading-xm text-heading-xl m-0 p-0">
                        {calculate}
                    </h2>
                </div>

                <HStack className="w-full lg:flex-wrap lg:bg-howToChef lg:py-5 box-border ">
                    <VStack
                        className="w-[50%] lg:w-full lg:px-5 box-border min-w-[460px] lg:min-w-full gap-12"
                        style={{ alignItems: 'flex-start' }}
                    >
                        <h3 className="text-heading-ss-bold m-0 py-0 lg:text-center lg:uppercase">{calculateTitle}</h3>
                        <VStack style={{ alignItems: 'flex-start' }}>
                            <p className="py-0">{qualification}</p>
                            <HStack className=" gap-3">
                                {cookRanks.map((rank, index) => (
                                    <PETabItem
                                        key={index}
                                        active={selectedCookRank === rank}
                                        title={commonTranslation(rank)}
                                        onClick={(): void => {
                                            setSelectedCookRank(rank);
                                            calculateCountPrice(rank, participantCount);
                                        }}
                                    />
                                ))}
                            </HStack>
                        </VStack>
                        <VStack className="gap-3" style={{ alignItems: 'start' }}>
                            <p className="my-0 text-text-sm py-0 md:text-text-sm">{ordersCountTitle}</p>
                            <PECounter
                                value={Number(participantCount)}
                                onValueChange={(participants): void => {
                                    setParticipantCount(participants);
                                    calculateCountPrice(selectedCookRank, participants);
                                }}
                            />
                        </VStack>
                        {/* <PEButton
                            className="max-w-[300px] md:max-w-full"
                            onClick={(): void => calculateCountPrice()}
                            title={buttonTitle}
                            type="secondary"
                        /> */}
                    </VStack>

                    <VStack className="bg-howToChef w-[50%] lg:w-full min-w-[460px] md:min-w-full p-15 md:p-5 box-border rounded-3">
                        <VStack
                            style={{ alignItems: 'flex-start' }}
                            className="w-full justify-between relative bg-white h-[250px] md:h-[200px] shadow-primary rounded-2 py-11 md:py-6 px-8 md:px-5 box-border"
                        >
                            <CalculatorRoulette startValue={income.prev} endValue={income.next} />
                            <VStack style={{ alignItems: 'flex-start' }} className="w-full">
                                <p className="text-heading-m my-0 text-left w-full md:text-text-m-bold">{perMonth}</p>
                                <p className="text-disabled text-text-s w-[200px] my-2">{changePersonsCount(example, participantCount)}</p>
                            </VStack>
                            <VStack style={{ alignItems: 'flex-start' }}>
                                <p className="text-text-m-bold my-3">{addition}</p>
                                <HStack className="w-full gap-12 md:gap-4">
                                    <HStack className="gap-3" style={{ alignItems: 'center' }}>
                                        <VStack className="justify-center bg-orange w-6 h-6 rounded-6">
                                            <PEIcon icon={Icon.dataWhite} edgeLength={18} />
                                        </VStack>
                                        <p className="my-0 text-text-sm">{dataTitle}</p>
                                    </HStack>
                                    <HStack className="gap-3" style={{ alignItems: 'center' }}>
                                        <VStack className="justify-center bg-orange w-6 h-6 rounded-6">
                                            <PEIcon icon={Icon.travelWhite} edgeLength={18} />
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
