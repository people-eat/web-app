import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import { type PEChatCardProps } from './PEChatCardProps';

export default function PEChatCard({
    onClick,
    label,
    menuTitle,
    date,
    time,
    place,
    userName,
    lastDateActive,
    imageUrl,
}: PEChatCardProps): ReactElement {
    return (
        <div onClick={onClick} className="flex flex-col gap-2 max-w-[365px] px-4 box-border py-2 relative">
            <div className="w-full flex justify-between">
                <span className="text-green text-text-s px-3 py-2 bg-base rounded-12">{label}</span>
                <PEIcon icon={Icon.fileSearch} />
            </div>
            <div>
                <span className="text-heading-ss-bold text-black line-clamp-1">{menuTitle}</span>
            </div>
            <div className="flex gap-[10px]">
                <span className="text-midBlack text-text-sm">{date}</span>
                <span className="w-[1px] bg-border h-[19px]" />
                <span className="text-midBlack text-text-sm">{time}</span>
                <span className="w-[1px] bg-border h-[19px]" />
                <span className="text-midBlack text-text-sm">{place}</span>
            </div>
            <div className="flex justify-between items-center">
                <div className="gap-4 flex flex-row items-center">
                    <div
                        className={classNames('w-[26px] h-[26px] rounded-1 justify-center items-center', {
                            ['bg-base']: imageUrl,
                        })}
                    >
                        {imageUrl ? <Image src={imageUrl} alt={imageUrl} /> : <PEIcon icon={Icon.profile} />}
                    </div>
                    <span className="text-black text-text-sm">{userName}</span>
                </div>
                <span className="text-midBlack text-text-sm">{lastDateActive}</span>
            </div>
            <div className="w-full h-full absolute hover:bg-midBlackHover -ml-2 -mt-2" />
        </div>
    );
}
