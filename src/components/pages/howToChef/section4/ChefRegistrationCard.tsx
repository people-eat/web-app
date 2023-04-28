import { type ReactElement } from 'react';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import { cemSecondName, chefRegistration, firstName, profile, secondName } from '../translations.mock';

export default function ChefRegistrationCard(): ReactElement {
    return (
        <div className="flex min-w-[250px] w-[250px] h-[310px] gap-2 flex-col bg-white p-3 box-border rounded-3 shadow-primary cursor-pointer hover:shadow-active">
            <VStack className="w-full">
                <span className="w-full text-text-m-bold mt-2">{chefRegistration}</span>
                <p className="w-full text-text-ss m-0 text-disabled">Please enter your details</p>
            </VStack>
            <HStack className="w-full gap-2">
                <VStack className="w-1/2">
                    <p className="w-full pb-2 text-text-sss m-0">{firstName}</p>
                    <p className="text-text-sss box-border m-0 w-full p-2 border-solid border-disabled border-[0.5px] rounded-2">Cem</p>
                </VStack>
                <VStack className="w-1/2">
                    <p className="w-full pb-2 text-text-sss m-0">{secondName}</p>
                    <p className="text-text-sss box-border m-0 w-full p-2 border-solid border-disabled border-[0.5px] rounded-2">
                        {cemSecondName}
                    </p>
                </VStack>
            </HStack>
            <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                <p className="w-full pb-2 text-text-sss m-0">{profile}</p>
                <span className="px-5 py-6 border-disabled border-solid border-[0.5px] rounded-2">
                    <div className="mt-[-12px]">
                        <PEIcon icon={Icon.plus} edgeLength={12} />
                    </div>
                </span>
            </VStack>
            <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                <p className="w-full pb-2 text-text-sss m-0">PeopleEat Level</p>
                <div className="w-full box-border px-2 py-[6px] justify-center items-center rounded-t-[5px] border-solid border-orange border-[0.5px]">
                    <p className="w-full text-text-sss m-0">Hobby Chef</p>
                </div>
                <div className="w-full flex gap-2 flex-row h-8 box-border px-2 py-[6px] justify-center items-center mt-[-1px] border-solid border-disabled border-[0.5px]">
                    <div className="relative bg-orange h-3 w-3 rounded-1">
                        <div className="absolute mt-[-6px]">
                            <PEIcon icon={Icon.checkWhite} edgeLength={10} />
                        </div>
                    </div>
                    <p className="w-full text-text-sss m-0">Hobby Chef</p>
                </div>
            </VStack>
        </div>
    );
}
