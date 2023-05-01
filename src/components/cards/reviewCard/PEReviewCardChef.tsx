import Image from 'next/image';
import {type ReactElement} from 'react';
import {Icon} from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';

export interface PEReviewCardChefProps {
    chefName?: string;
    chefImage?: string;
    event?: string;
    rank: string;
    date: string;
    description: string;
}

export default function PEReviewCardChef({
    chefName,
    chefImage,
    event,
    rank,
    date,
    description,
}: PEReviewCardChefProps): ReactElement {
    return (
        <div className="flex w-[340px] md:w-[380px] gap-4 flex-col p-8 box-border rounded-3 shadow-primary cursor-pointer hover:shadow-active duration-200 ease-in">
            <div className="flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <div className={'overflow-hidden rounded-3'}>
                        {chefImage ? (
                            <Image
                                style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                src={chefImage ?? ''}
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
                    <div className="flex gap-4">
                        <div className={'flex gap-1 flex-col'}>
                            <span className={'text-heading-ss-bold'}>{chefName}</span>
                            <span className={'text-text-sm'}>{event}</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-row">
                    <PEIcon icon={Icon.star} edgeLength={20} />
                    <span className="text-preBlack">{rank ?? '0.0'}</span>
                </div>
            </div>
            <div>
                to Master Chef <span className="text-orange text-text-m-bold">{chefName}</span>
            </div>
            <span className="text-text-m text-preBlack">{description}</span>
            <span className="text-orange text-text-m-bold flex items-center gap-2">
                View original review <PEIcon icon={Icon.arrowNarrowRightOrange} />
            </span>
            <span className="text-60black text-text-sm w-full text-end">{date}</span>
        </div>
    );
}
