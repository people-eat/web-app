import { useQuery } from '@apollo/client';
import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useEffect, useState, type ReactElement } from 'react';
import { FindManyFollowingsDocument } from '../../../data-source/generated/graphql';
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
    picturePosition = 'center',
    userId,
}: PEChefCardProps): ReactElement {
    const baseClassNames =
        'flex flex-col active:shadow-active hover:shadow-primary overflow-hidden border-solid border-border border-[1px] rounded-3 cursor-pointer';
    const width = classNames('w-[270px] max-w-[280px]');
    const { data } = useQuery(FindManyFollowingsDocument);
    const followings = data?.users.me?.followings;
    const { t } = useTranslation('common');

    const [liked, setLike] = useState(false);
    // const [deleteFollowing] = useMutation(DeleteOneFollowingDocument);

    useEffect(() => {
        if (followings) {
            const foundFollowing = followings.find((following) => following.cook.user.firstName === firstName);
            if (foundFollowing) setLike(true);
            else setLike(false);
        }
    }, [followings, firstName]);

    return (
        <div className={classNames(baseClassNames, width)}>
            <div className="relative">
                <div className="absolute top-[12px] right-[12px]">
                    <PEFavorite
                        isFavorite={liked}
                        // onIsFavoriteChange={(): void => {
                        //     if (liked) {
                        //         void deleteFollowing({
                        //             variables: { userId: userId, cookId: cookId },
                        //         }).then((result) => result.data?.users.followings.success && setLike(!liked));
                        //     }
                        // }}
                        onIsFavoriteChange={(): void => setLike(!liked)}
                    />
                </div>
                {profilePictureUrl && (
                    <Image
                        draggable={false}
                        style={{ width: '100%', objectPosition: picturePosition, objectFit: 'cover' }}
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
                    <span className="text-text-m text-preBlack">{t(rank)}</span>
                    <div className="flex items-center gap-2">
                        {location && (
                            <div className={'flex items-center gap-2 flex-row'}>
                                <PEIcon icon={Icon.markerPinOrange} edgeLength={20} />
                                <span className="text-preBlack">{location}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-2 flex-row">
                            <PEIcon icon={Icon.star} edgeLength={20} />
                            <span className="text-preBlack">{rating?.average}</span>
                            <span className="text-disabled">({rating?.count})</span>
                        </div>
                    </div>
                </div>
                <div className={'no-scrollbar overflow-x-scroll flex flex-row gap-2 mt-3 scrollbar-hide'} style={{ overflowY: 'initial' }}>
                    {categories?.map((category, index) => (
                        <div key={`${category}__${index}`} className={'rounded-4 text-preBlack text-text-s-height px-2 py-[2px] bg-base'}>
                            {category}
                        </div>
                    ))}
                </div>
                <div
                    className={'no-scrollbar overflow-x-scroll items-center flex flex-row gap-2 mt-3 scrollbar-hide'}
                    style={{ overflowY: 'initial' }}
                >
                    {kitchens?.length > 0 && <PEIcon icon={Icon.dishes} />}
                    {kitchens?.map((kitchen, index) => (
                        <div key={`${kitchen}__${index}`} className={'text-orange text-text-s-height'}>
                            {kitchen}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
