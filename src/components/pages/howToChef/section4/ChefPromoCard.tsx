import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';
import { address, addressTitle, chefName, eventDate, eventName, labelTitle, menuName, pdfTitle, persons } from '../translations.mock';

export default function ChefPromoCard(): ReactElement {
    return (
        <div className="flex min-w-[180px] w-[180px] h-[290px] gap-4 flex-col bg-white p-3 box-border rounded-3 shadow-primary cursor-pointer hover:shadow-active">
            <VStack className="w-full">
                <HStack className="w-full" style={{ justifyContent: 'space-between' }}>
                    <VStack className="rounded-4 text-preBlack text-text-sss px-2 py-[2px] bg-base">{labelTitle}</VStack>
                    <HStack style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <span className="mt-[-10px] mr-1">
                            <PEIcon icon={Icon.star} edgeLength={12} />
                        </span>
                        <span className="text-preBlack text-text-ss my-0">4.9</span>
                    </HStack>
                </HStack>
                <span className="w-full text-text-s-bold mt-2">{menuName}</span>
            </VStack>
            <div className="flex gap-2">
                <div className={'overflow-hidden rounded-2 min-w-8 w-8 min-h-8 h-8'}>
                    <Image
                        style={{ width: '33px', height: '33px', objectPosition: 'center', objectFit: 'cover' }}
                        src={'/picture-1.png'}
                        alt={'client image'}
                        width={32}
                        height={44}
                    />
                </div>
                <div className={'flex gap-1 flex-col'}>
                    <span className={'text-text-s-bold'}>{chefName}</span>
                    <span className={'text-text-ss'}>{eventName}</span>
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col gap-1">
                    <span className="text-gray text-text-sss md:text-text-ss">
                        {eventDate} <span className="text-black md:text-text-ss">1. Jan 2023</span>
                    </span>
                    <span className="text-gray text-text-sss md:text-text-ss">
                        Time: <span className="text-black md:text-text-ss">18:00</span>
                    </span>
                    <span className="text-gray text-text-sss md:text-text-ss">
                        {addressTitle} <span className="text-black md:text-text-ss">{address}</span>
                    </span>
                    <span className="text-gray text-text-sss md:text-text-ss">
                        {persons} <span className="text-black md:text-text-ss">8</span>
                    </span>
                </div>
            </div>
            <section
                className="rounded-2 px-2 py-1 max-w-[400px] box-border hover:opacity-70 cursor-pointer border border-solid border-border flex flex-row gap-3 items-center justify-between"
                onClick={(): void => undefined}
            >
                <section className="flex flex-row justify-start items-center gap-2 relative">
                    <section className="flex items-start h-8">
                        <PEIcon icon={Icon.file} edgeLength={12} />
                    </section>
                    <section className="flex flex-col">
                        <span className="text-text-sss">{pdfTitle}</span>
                        <span className="text-disabled text-text-ss">245 Mb</span>
                    </section>
                </section>
                <PEIcon icon={Icon.downloadOrange} edgeLength={14} />
            </section>
        </div>
    );
}
