import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PeopleEatIcon from '../../standard/icon/PEIcon';

export interface PEChefCardProps {
    imageUrl?: string;
    name?: string;
    size?: 's' | 'b' | 'web';
    location?: string;
    rank?: string;
    rating: {
        average?: number;
        count?: number;
    };
    categories?: string[];
    menus?: string[];
}

export default function PEChefCard({ imageUrl, name, size, location, rank, rating, categories, menus }: PEChefCardProps): ReactElement {
    const baseClassNames =
        'flex flex-col active:shadow-active hover:shadow-primary overflow-hidden w-full border-solid border-border border-[1px] rounded-3 cursor-pointer';
    const width = classNames({
        'max-w-[380px]': size !== 's',
        'max-w-[280px]': size === 's',
    });

    return (
        <div className={classNames(baseClassNames, width)}>
            <div>
                {imageUrl ? (
                    <Image
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={imageUrl}
                        alt={imageUrl}
                        width={size !== 's' ? 380 : 280}
                        height={size !== 's' ? 400 : 290}
                    />
                ) : null}
                {!imageUrl ? (
                    <div
                        className={classNames('w-full bg-base flex justify-center items-center', {
                            ['h-[400px]']: size !== 's',
                            ['h-[280px]']: size === 's',
                        })}
                    >
                        <PeopleEatIcon edgeLength={110} icon={Icon.profileLight} />
                    </div>
                ) : null}
            </div>
            <div className="flex gap-2 flex-col p-4 box-border">
                <span className="text-heading-m">{name}</span>
                <div
                    className={classNames('flex gap-2 justify-between', {
                        ['items-center']: size === 'b',
                        ['flex-col items-start']: size === 's',
                    })}
                >
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
                    {menus?.map(
                        (menu): ReactElement => (
                            <div key={menu} className={'text-orange text-text-s-height '}>
                                {menu}
                            </div>
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}
