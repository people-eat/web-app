import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import PEFavorite from '../../standard/favorite/PEFavorite';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import { type PEChefCardProps } from './PEChefCardProps';

export default function PEChefCard({
    profilePictureUrl,
    firstName,
    location,
    rank,
    rating,
    categories,
    kitchens,
}: PEChefCardProps): ReactElement {
    const baseClassNames =
        'flex flex-col active:shadow-active hover:shadow-primary overflow-hidden w-full border-solid border-border border-[1px] rounded-3 cursor-pointer';
    const width = classNames('max-w-[280px]');

    return (
        <div className={classNames(baseClassNames, width)}>
            <div className="relative">
                <div className="absolute top-[12px] right-[12px]">
                    <PEFavorite isFavorite={false} onIsFavoriteChange={(): void => undefined} />
                </div>
                {profilePictureUrl && (
                    <Image
                        style={{ width: '100%', objectPosition: 'center', objectFit: 'cover' }}
                        src={profilePictureUrl}
                        alt={profilePictureUrl}
                        width={280}
                        height={290}
                    />
                )}
                {!profilePictureUrl && (
                    <div className={classNames('w-full bg-base flex justify-center items-center h-[280px]')}>
                        <PEIcon edgeLength={110} icon={Icon.profileLight} />
                    </div>
                )}
            </div>
            <div className="flex gap-2 flex-col p-4 box-border">
                <span className="text-heading-m">{firstName}</span>
                <div className={classNames('flex gap-2 justify-between flex-col items-start')}>
                    <span className="text-text-m text-preBlack">{rank}</span>
                    <div className="flex items-center gap-2">
                        {location && (
                            <div className={'flex items-center gap-2 flex-row'}>
                                <PEIcon icon={Icon.markerPinOrange} edgeLength={20} />
                                <span className="text-preBlack">{location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 flex-row">
                            <PEIcon icon={Icon.star} edgeLength={20} />
                            <span className="text-preBlack">{rating.average}</span>
                            <span className="text-disabled">({rating.count})</span>
                        </div>
                    </div>
                </div>
                <div className={'no-scrollbar overflow-x-scroll flex flex-row gap-2 mt-3 scrollbar-hide'}>
                    {categories.map((category) => (
                        <div key={category} className={'rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base'}>
                            {category}
                        </div>
                    ))}
                </div>
                <div className={'no-scrollbar overflow-x-scroll items-center flex flex-row gap-2 mt-3 scrollbar-hide'}>
                    {kitchens.length > 0 && <PEIcon icon={Icon.dishes} />}
                    {kitchens.map((kitchen) => (
                        <div key={kitchen} className={'text-orange text-text-s-height'}>
                            {kitchen}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
