import { ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PeopleEatIcon';

interface PeopleEatChatComponentProps {
    onClick: () => void;
    label?: string;
    menuTitle?: string;
    date?: string;
    time?: string;
    place?: string;
    userName?: string;
    lastDateActive?: string;
}

export default function PeopleEatChatComponentPreview({
    onClick,
    label,
    menuTitle,
    date,
    time,
    place,
    userName,
    lastDateActive,
}: PeopleEatChatComponentProps): ReactElement {
    return (
        <div onClick={onClick} className="flex flex-col gap-2 max-w-[365px] px-4 box-border py-2 relative">
            <div className="w-full flex justify-between">
                <span className="text-green text-text-s px-3 py-2 bg-base rounded-12">{label}</span>
                <PeopleEatIcon icon={Icon.fileSearch} />
            </div>
            <div>
                <span className="text-heading-ss-bold text-black">{menuTitle}</span>
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
                    <div className="w-[26px] h-[26px] rounded-1 bg-base"></div>
                    <span className="text-black text-text-sm">{userName}</span>
                </div>
                <span className="text-midBlack text-text-sm">{lastDateActive}</span>
            </div>
            <div className="w-full h-full absolute hover:bg-midBlackHover -ml-2 -mt-2" />
        </div>
    );
}
