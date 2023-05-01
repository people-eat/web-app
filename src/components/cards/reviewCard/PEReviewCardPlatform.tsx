import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';

export interface PEBookingRequestCardClosedProps {
    chefName?: string;
    chefImage?: string;
    position?: string;
    rank: string;
    date: string;
    location?: string;
    description: string;
}

export default function PEReviewCardPlatform({
    chefName,
    chefImage,
    position,
    rank,
    location,
    description,
}: PEBookingRequestCardClosedProps): ReactElement {
    return (
        <div className="flex w-[380px] md:w-[630px] gap-4 flex-col p-4 box-border rounded-3 cursor-pointer hover:shadow-primary duration-500 ease-in">
            <div className="flex justify-between">
                <div className="flex gap-4 w-full">
                    <div
                        className={
                            'overflow-hidden rounded-3 min-w-[75px] max-w-[75px] h-[75px] md:min-w-[220px] md:max-w-[220px] md:h-[220px]'
                        }
                    >
                        {chefImage ? (
                            <>
                                <div className="md:hidden block">
                                    <Image
                                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                        src={chefImage ?? ''}
                                        alt={'client image'}
                                        width={75}
                                        height={75}
                                    />
                                </div>
                                <div className="md:block hidden">
                                    <Image
                                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                        src={chefImage ?? ''}
                                        alt={'client image'}
                                        width={220}
                                        height={220}
                                    />
                                </div>
                            </>
                        ) : (
                            <div className="flex justify-center items-center w-[75px] h-[75px] md:w-[220px] md:h-[220px] bg-base">
                                <PEIcon icon={Icon.profileLight} edgeLength={32} />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 flex-col w-full">
                        <div className="flex gap-4 justify-between w-full">
                            <span className={'text-text-m-bold md:text-heading-ss-bold'}>{chefName}</span>
                            <div className="flex items-center gap-2 flex-row">
                                <PEIcon icon={Icon.star} edgeLength={20} />
                                <span className="text-preBlack">{rank ?? '0.0'}</span>
                            </div>
                        </div>
                        <span className="text-orange text-text-sm-bold md:text-text-m-bold">{position}</span>
                        {location ? (
                            <div className={'flex items-center gap-2 flex-row'}>
                                <PEIcon icon={Icon.markerPinOrange} edgeLength={20} />
                                <span className="text-preBlack text-text-sm md:text-text-m">{location}</span>
                            </div>
                        ) : null}
                        <span className="text-text-m hidden md:block text-preBlack">{description}</span>
                    </div>
                </div>
            </div>
            <span className="text-text-m block md:hidden text-preBlack">{description}</span>
        </div>
    );
}
