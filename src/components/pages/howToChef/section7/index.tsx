import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import VStack from '../../../utility/vStack/VStack';
import { register, section7Title } from '../translations.mock';

export default function HowToChefSection7(): ReactElement {
    return (
        <VStack className="w-[calc(100%+20px)] h-[270px] relative overflow-hidden max-w-screen-xl lg:px-4 box-border bg-peBlack mt-15 rounded-4">
            <div className="relative flex w-full mt-[70px] lg:justify-center mb-15">
                <h2 className="absolute z-10 w-full md:text-heading-s text-white text-center w-full text-heading-xl m-0 p-0 lg:uppercase">
                    {section7Title}
                </h2>
            </div>
            <PEButton className="max-w-[400px] mt-8" onClick={(): void => undefined} title={register} />
            <VStack className="absolute left-[-525px] -top-[540px] w-[830px] h-[830px] blur-[190px] bg-blurOrange" />
        </VStack>
    );
}
