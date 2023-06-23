import Link from 'next/link';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';

export default function PEPointsCard(): ReactElement {
    return (
        <div className="flex flex-col big:w-[45%] justify-start items-start lg:w-full w-[580px] max-w-[580px] sm_max:bg-yellowLight sm:bg-white gap-3 p-6 box-border rounded-3 shadow-primary">
            <h2 className={'text-heading-ss my-0 font-manrope leading-15'}>Sie können das richtige Menü nicht finden?</h2>
            <div className={'flex gap-4 sm:flex-col w-full'}>
                <div
                    className={
                        'flex gap-2 lg:border-disabled border-[1px] lg:items-start lg:border-solid rounded-2 lg:p-3 lg:w-full box-border'
                    }
                >
                    <span className="flex border-[1px] justify-center items-center h-[38px] min-w-[38px] border-solid border-orange text-text-s text-orange p-[9px] rounded-2 box-border">
                        01
                    </span>
                    <span className={'max-w-[240px] text-preBlack text-text-s leading-5'}>
                        Setze dein Budget sowie individuelle Präferenzen fest
                    </span>
                </div>
                <div className={'flex gap-2 lg:border-disabled border-[1px] lg:border-solid rounded-2 lg:p-3 lg:w-full box-border'}>
                    <span className="flex border-[1px] justify-center items-center h-[38px] min-w-[38px] border-solid border-orange text-text-s text-orange p-[9px] rounded-2 box-border">
                        02
                    </span>
                    <span className={'max-w-[240px] text-preBlack text-text-s leading-5'}>
                        Erhalte einen personalisierten Menüvorschlag
                    </span>
                </div>
            </div>
            <div className={'flex gap-2 lg:border-disabled border-[1px] lg:border-solid rounded-2 lg:p-3 lg:w-full box-border'}>
                <span className="flex border-[1px] justify-center items-center h-[38px] min-w-[38px] border-solid border-orange text-text-s text-orange p-[9px] rounded-2 box-border">
                    03
                </span>
                <span className={'max-w-[240px] text-preBlack text-text-s leading-5'}>
                    Bestätige und stimme dich direkt via Chat mit deinem PeopleEat Chef ab.
                </span>
            </div>
            <Link href={'/individual-request'} className="no-underline">
                <PEButton
                    className={'mt-8 sm:max-w-full max-w-[270px] bg-transparent'}
                    type={'secondary'}
                    onClick={(): void => undefined}
                    title={'Individuelle Anfrage senden'}
                />
            </Link>
        </div>
    );
}
