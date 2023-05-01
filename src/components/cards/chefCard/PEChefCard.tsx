import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import PEFavorite from '../../standard/favorite/PEFavorite';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PEIcon';

export interface PEChefCardProps {
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

export default function PEChefCard({ imageUrl, name, location, rank, rating, categories, kitchens }: PEChefCardProps): ReactElement {
    const baseClassNames =
        'flex flex-col active:shadow-active hover:shadow-primary overflow-hidden w-full border-solid border-border border-[1px] rounded-3 cursor-pointer';
    const width = classNames('max-w-[280px]');

    return (
        <div className={classNames(baseClassNames, width)}>
            <div className="relative">
                <div className="absolute top-[12px] right-[12px]">
                    <PEFavorite className={'bg-white rounded-2'} />
                </div>
                {imageUrl ? (
                    <Image
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={imageUrl}
                        alt={imageUrl}
                        width={280}
                        height={290}
                    />
                ) : null}
                {!imageUrl ? (
                    <div className={classNames('w-full bg-base flex justify-center items-center h-[280px]')}>
                        <PeopleEatIcon edgeLength={110} icon={Icon.profileLight} />
                    </div>
                ) : null}
            </div>
            <div className="flex gap-2 flex-col p-4 box-border">
                <span className="text-heading-m">{name}</span>
                <div className={classNames('flex gap-2 justify-between flex-col items-start')}>
                    <span className="text-text-m text-preBlack">{name}</span>
                    <div className="flex items-center gap-2">
                        {location ? (
                            <div className={'flex items-center gap-2 flex-row'}>
                                <PeopleEatIcon icon={Icon.markerPinOrange} edgeLength={20} />
                                <span className="text-preBlack">{location}</span>
                            </div>
                        ) : null}
                        <div className="flex items-center gap-2 flex-row">
                            <PeopleEatIcon icon={Icon.star} edgeLength={20} />
                            <span className="text-preBlack">{rank}</span>
                            <span className="text-disabled">({rating.count})</span>
                        </div>
                    </div>
                </div>
                <div className={'overflow-scroll flex flex-row gap-2 mt-3 scrollbar-hide'}>
                    {categories?.map(
                        (category): ReactElement => (
                            <div key={category} className={'rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base'}>
                                {category}
                            </div>
                        ),
                    )}
                </div>
                <div className={'overflow-x-scroll items-center flex flex-row gap-2 mt-3 scrollbar-hide'}>
                    <PeopleEatIcon icon={Icon.dishes} />
                    {kitchens?.map(
                        (kitchen): ReactElement => (
                            <div key={kitchen} className={'text-orange text-text-s-height '}>
                                {kitchen}
                            </div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}
