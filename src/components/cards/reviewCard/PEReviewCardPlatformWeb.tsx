import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';

export interface PEBookingRequestCardClosedProps {
    userFirstName: string;
    userProfilePictureUrl?: string;
    ratingValue: string;
    occasion?: string;
    location?: string;
    comment: string;
    onClick?: () => void;
}

export default function PEReviewCardPlatformWeb({
    userFirstName,
    userProfilePictureUrl,
    occasion,
    location,
    ratingValue,
    comment: description,
}: PEBookingRequestCardClosedProps): ReactElement {
    return (
        <div className="flex w-[630px] gap-4 flex-col p-4 box-border rounded-3 cursor-pointer hover:shadow-primary duration-500 ease-in">
            <div className="flex justify-between">
                <div className="flex gap-4 w-full">
                    <div className="overflow-hidden rounded-3 min-w-[220px] max-w-[220px] h-[220px]">
                        {userProfilePictureUrl && (
                            <Image
                                style={{ objectPosition: 'center', objectFit: 'cover' }}
                                src={userProfilePictureUrl}
                                alt={'client image'}
                                width={220}
                                height={220}
                            />
                        )}
                        {!userProfilePictureUrl && (
                            <div className="flex justify-center items-center w-[220px] h-[220px] bg-base">
                                <PEIcon icon={Icon.profileLight} edgeLength={32} />
                            </div>
                        )}
                    </div>
                    <div className="flex gap-2 flex-col w-full">
                        <div className="flex gap-4 justify-between w-full">
                            <span className="text-text-m-bold md:text-heading-ss-bold">{userFirstName}</span>
                            <div className="flex items-center gap-2 flex-row">
                                <PEIcon icon={Icon.star} edgeLength={20} />
                                <span className="text-preBlack">{ratingValue}</span>
                            </div>
                        </div>
                        <span className="text-orange text-text-sm-bold md:text-text-m-bold">{occasion}</span>
                        {location && (
                            <div className={'flex items-center gap-2 flex-row'}>
                                <PEIcon icon={Icon.markerPin} edgeLength={20} />
                                <span className="text-preBlack text-text-sm md:text-text-m">{location}</span>
                            </div>
                        )}
                        <span className="text-text-m text-preBlack line-clamp-6">{description}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
