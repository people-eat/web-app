import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import PEFavorite from '../../standard/favorite/PEFavorite';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import { type PEChefCardProps } from './PEChefCardProps';

export default function PEChefCardMobile({
    profilePictureUrl,
    firstName,
    location,
    rank,
    rating,
    categories,
    kitchens,
}: PEChefCardProps): ReactElement {
    const baseClassNames = 'flex flex-col w-[93vw] active:shadow-active shadow-primary overflow-hidden rounded-3 cursor-pointer';

    return (
        <div className={classNames(baseClassNames)}>
            <div className="flex gap-2 flex-col p-4 box-border">
                <div className="flex flex-row gap-2 relative">
                    <div className="absolute top-0 right-0">
                        <PEFavorite isFavorite={false} onIsFavoriteChange={(): void => undefined} />
                    </div>
                    <div className={'rounded-2 overflow-hidden max-h-[48px] '}>
                        {profilePictureUrl && (
                            <Image
                                draggable={false}
                                style={{ objectPosition: 'top', objectFit: 'cover' }}
                                src={profilePictureUrl}
                                alt={profilePictureUrl}
                                width={48}
                                height={48}
                            />
                        )}
                        {!profilePictureUrl && (
                            <div className={classNames('w-full bg-base flex justify-center items-center h-[45px] min-w-[45px]')}>
                                <PEIcon edgeLength={24} icon={Icon.profileLight} />
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <span className="text-text-m-bold">{firstName}</span>
                        <span className="text-text-sm text-preBlack">{rank}</span>
                    </div>
                </div>
                <div className={classNames('flex gap-2 justify-between flex-col items-start')}>
                    <div className="flex items-center gap-2">
                        {location && (
                            <div className={'flex items-center gap-2 flex-row'}>
                                <PEIcon icon={Icon.markerPin} edgeLength={20} />
                                <span className="text-preBlack">{location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1 flex-row">
                            <PEIcon icon={Icon.star} edgeLength={20} />
                            <span className="text-preBlack">{rating.average}</span>
                            <span className="text-disabled">({rating.count})</span>
                        </div>
                    </div>
                </div>
                <div className={'no-scrollbar overflow-x-scroll flex flex-row gap-2 scrollbar-hide'} style={{ overflowY: 'initial' }}>
                    {categories.map((category, index) => (
                        <div key={`${category}__${index}`} className={'rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base'}>
                            {category}
                        </div>
                    ))}
                </div>
                {kitchens.length > 0 && (
                    <div
                        className={'no-scrollbar overflow-x-scroll items-center flex flex-row gap-2 scrollbar-hide'}
                        style={{ overflowY: 'initial' }}
                    >
                        {Boolean(kitchens.length) && <PEIcon icon={Icon.dishes} />}
                        {kitchens.map((kitchen, index) => (
                            <div key={`${kitchen}__${index}`} className={'text-orange text-text-s-height'}>
                                {kitchen}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
