import Image from 'next/image';
import { type ReactElement } from 'react';
import PEButton from '../../standard/buttons/PEButton';
import PELineButton from '../../standard/buttons/PELineButton';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';

export interface PEBookingRequestCardOfferProps {
    onOrderDetailsClick: () => void;
    onDeclineClick: () => void;
    onAcceptClick: () => void;
    date: string;
    menuName: string;
    clientName: string;
    clientImage: string;
    event: string;
    price?: string;
    eventDate: string;
    persons: string;
    time: string;
    address: string;
}

export default function PEBookingRequestCardOpen({
    onOrderDetailsClick,
    onDeclineClick,
    onAcceptClick,
    date,
    menuName,
    clientName,
    clientImage,
    event,
    price,
    eventDate,
    persons,
    time,
    address,
}: PEBookingRequestCardOfferProps): ReactElement {
    return (
        <div className="flex md:w-[580px] gap-4 flex-col p-8 box-border rounded-3 shadow-primary cursor-pointer hover:shadow-active">
            <div className="flex w-full justify-between">
                <PELineButton title={'Order Details'} onClick={onOrderDetailsClick} />
                <span className="text-60black text-text-sm hidden md:block">{date}</span>
            </div>
            <span className="pt-4 text-heading-ss-bold">{menuName}</span>
            <div className="flex gap-4">
                <div className={'overflow-hidden rounded-3'}>
                    {clientImage ? (
                        <Image
                            style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                            src={clientImage}
                            alt={'client image'}
                            width={45}
                            height={45}
                        />
                    ) : (
                        <div className="flex justify-center items-center w-11 h-11 bg-base">
                            <PEIcon icon={Icon.profileLight} edgeLength={32} />
                        </div>
                    )}
                </div>
                <div className={'flex gap-1 flex-col'}>
                    <span className={'text-heading-ss-bold'}>{clientName}</span>
                    <span className={'text-text-sm'}>{event}</span>
                </div>
            </div>
            <span className="text-text-sm flex items-center gap-2">
                Price: <span className="text-green text-heading-ss-bold">{price}</span>
            </span>
            <div className="flex">
                <div className="flex flex-col gap-3">
                    <span className="text-gray text-text-s md:text-text-m">
                        Event date: <span className="text-black">{eventDate}</span>
                    </span>
                    <span className="text-gray text-text-s md:text-text-m">
                        Persons: <span className="text-black">{persons}</span>
                    </span>
                </div>
                <span className="w-[1px] mx-3 md:mx-4 h-[52px] bg-separator rounded-1" />
                <div className="flex flex-col gap-3">
                    <span className="text-gray text-text-s md:text-text-m">
                        Time: <span className="text-black">{time}</span>
                    </span>
                    <span className="text-gray text-text-s md:text-text-m">
                        Address: <span className="text-black">{address}</span>
                    </span>
                </div>
            </div>
            <div className="flex flex-row gap-3 mt-3">
                <div className="basis-1/2">
                    <PEButton onClick={onDeclineClick} title={'Decline'} size={'s'} type={'secondary'} />
                </div>
                <div className="basis-1/2">
                    <PEButton onClick={onAcceptClick} title={'Accept'} size={'s'} />
                </div>
            </div>
            <span className="text-60black text-text-s block md:hidden w-full text-end">{date}</span>
        </div>
    );
}
