import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { type ReactElement } from 'react';
import { type CookRank } from '../../../data-source/generated/graphql';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';

export interface PEReviewCardChefProps {
    chefFirstName: string;
    chefProfilePictureUrl?: string;
    chefRank?: CookRank;
    customerFirstName: string;
    occasion?: string;
    ratingValue: string;
    comment: string;
    createdAt: string;
    onClick?: () => void;
}

export default function PEReviewCardChef({
    chefFirstName,
    chefProfilePictureUrl,
    chefRank,
    customerFirstName,
    occasion,
    ratingValue,
    comment,
    createdAt,
    onClick,
}: PEReviewCardChefProps): ReactElement {
    const { t } = useTranslation('common');

    return (
        <div
            className="flex justify-between md:max-w-[340px] h-full md:w-full w-[380px] gap-4 flex-col p-8 box-border rounded-3 shadow-primary cursor-pointer hover:shadow-active duration-200 ease-in"
            onClick={onClick}
        >
            <div className="flex flex-col gap-4 ">
                <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                        <div className={'overflow-hidden rounded-3'}>
                            {chefProfilePictureUrl ? (
                                <Image
                                    style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                                    src={chefProfilePictureUrl ?? ''}
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
                                <span className={'text-heading-ss-bold'}>{customerFirstName}</span>
                                <span className={'text-text-sm'}>{occasion}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-row">
                        <PEIcon icon={Icon.star} edgeLength={20} />
                        <span className="text-preBlack">{ratingValue ?? '0.0'}</span>
                    </div>
                </div>
                <div>
                    <span className="m-0">{chefRank ? t(chefRank) : ''}</span>{' '}
                    <span className="text-orange text-text-m-bold">{chefFirstName}</span>
                </div>
                <span className="text-text-m text-preBlack line-clamp-6 mb-8">{comment}</span>
            </div>
            <span className="text-60black text-text-sm w-full text-end">{createdAt}</span>
        </div>
    );
}
