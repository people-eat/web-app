import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import { type PEMealCardProps } from './PEMEalCardProps';

export default function PEMealCardMobile({ onClick, title, description, imageUrl }: PEMealCardProps): ReactElement {
    return (
        <div
            onClick={onClick}
            className="flex w-[220px] max-h-[340px] gap-3 flex-col p-2 box-border rounded-3 shadow-primary cursor-pointer active:shadow-orange hover:shadow-active"
        >
            <div className="flex rounded-3 overflow-hidden min-w-[200px] h-[200px] min-h-[200px] justify-center items-center bg-base">
                {imageUrl ? (
                    <Image
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={imageUrl}
                        alt={imageUrl}
                        width={200}
                        height={200}
                    />
                ) : (
                    <PEIcon icon={Icon.food} edgeLength={52} />
                )}
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-text-sm-bold text-preBlack line-clamp-1">{title}</span>
                <span className="text-text-s text-preBlack line-clamp-3">{description}</span>
            </div>
        </div>
    );
}
