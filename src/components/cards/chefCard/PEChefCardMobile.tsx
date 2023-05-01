import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import PEFavorite from '../../standard/favorite/PEFavorite';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PEIcon';

export interface PEChefCardMobileProps {
    imageUrl?: string;
    name: string;
    location: string;
    rank: string;
    rating: {
        average: number;
        count: number;
    };
    categories: string[];
    kitchens: string[];
}

export default function PEChefCardMobile({
    imageUrl,
    name,
    location,
    rank,
    rating,
    categories,
    kitchens,
}: PEChefCardMobileProps): ReactElement {
    const baseClassNames =
        'flex flex-col max-w-[340px] active:shadow-active shadow-primary overflow-hidden w-full rounded-3 cursor-pointer';

    return (
        <div className={classNames(baseClassNames)}>
            <div className="flex gap-2 flex-col p-4 box-border">
                <div className="flex flex-row gap-2 relative">
                    <div className="absolute top-0 right-0">
                        <PEFavorite className={'bg-base rounded-2'} />
                    </div>
                    <div className={'rounded-3 overflow-hidden'}>
                        {imageUrl ? (
                            <Image
                                style={{ objectPosition: 'center', objectFit: 'cover' }}
                                src={imageUrl}
                                alt={imageUrl}
                                width={45}
                                height={45}
                            />
                        ) : (
                            <div className={classNames('w-full bg-base flex justify-center items-center h-[45px] min-w-[45px]')}>
                                <PeopleEatIcon edgeLength={24} icon={Icon.profileLight} />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-text-m-bold">{name}</span>
                        <span className="text-text-sm text-preBlack">{rank}</span>
                    </div>
                </div>
                <div className={classNames('flex gap-2 justify-between flex-col items-start')}>
                    <div className="flex items-center gap-2">
                        {location ? (
                            <div className={'flex items-center gap-2 flex-row'}>
                                <PeopleEatIcon icon={Icon.markerPin} edgeLength={20} />
                                <span className="text-preBlack">{location}</span>
                            </div>
                        ) : null}
                        <div className="flex items-center gap-1 flex-row">
                            <PeopleEatIcon icon={Icon.star} edgeLength={20} />
                            <span className="text-preBlack">{rating.average}</span>
                            <span className="text-disabled">({rating.count})</span>
                        </div>
                    </div>
                </div>
                <div className={'overflow-scroll flex flex-row gap-2 scrollbar-hide h-'}>
                    {categories?.map(
                        (category): ReactElement => (
                            <div key={category} className={'rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base'}>
                                {category}
                            </div>
                        ),
                    )}
                </div>
                {kitchens.length ? (
                    <div className={'overflow-x-scroll items-center flex flex-row gap-2 scrollbar-hide'}>
                        <PeopleEatIcon icon={Icon.dishes} />
                        {kitchens?.map(
                            (kitchen): ReactElement => (
                                <div key={kitchen} className={'text-orange text-text-s-height '}>
                                    {kitchen}
                                </div>
                            ),
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
