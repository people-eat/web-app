import { type ReactElement } from 'react';
import PEButton from '../../standard/buttons/PEButton';
import HStack from '../../utility/hStack/HStack';

export default function PEPointsCard(): ReactElement {
    return (
        <div className="flex flex-col justify-start items-start lg:w-full w-[580px] sm_max:bg-yellowLight sm:bg-white gap-3 p-6 box-border rounded-3 shadow-primary">
            <h2 className={'text-heading-ss my-0 font-manrope leading-15'}>Can&apos;t find the right menu?</h2>
            <div className={'flex gap-4 sm:flex-col w-full'}>
                <HStack className={'gap-2 lg:border-disabled lg:border-solid rounded-2 lg:p-3 lg:w-full box-border'}>
                    <span className="flex justify-center items-center h-[38px] min-w-[38px] border-solid border-orange text-text-s text-orange p-[9px] rounded-2 box-border">
                        01
                    </span>
                    <span className={'max-w-[240px] text-preBlack text-text-s leading-5'}>Set your budget and individual preferences</span>
                </HStack>
                <HStack className={'gap-2 lg:border-disabled lg:border-solid rounded-2 lg:p-3 lg:w-full box-border'}>
                    <span className="flex justify-center items-center h-[38px] min-w-[38px] border-solid border-orange text-text-s text-orange p-[9px] rounded-2 box-border">
                        02
                    </span>
                    <span className={'max-w-[240px] text-preBlack text-text-s leading-5'}>
                        Confirm and vote directly with your PeopleEat boss via chat.
                    </span>
                </HStack>
            </div>
            <HStack className={'gap-2 lg:border-disabled lg:border-solid rounded-2 lg:p-3 lg:w-full box-border'}>
                <span className="flex justify-center items-center h-[38px] min-w-[38px] border-solid border-orange text-text-s text-orange p-[9px] rounded-2 box-border">
                    03
                </span>
                <span className={'max-w-[240px] text-preBlack text-text-s leading-5'}>Receive a personalized menu suggestion</span>
            </HStack>
            <PEButton
                className={'mt-8 sm:max-w-full max-w-[270px] bg-transparent'}
                type={'secondary'}
                onClick={(): void => undefined}
                title={'Send an individual request'}
            />
        </div>
    );
}
