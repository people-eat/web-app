import { useQuery } from '@apollo/client';
import { type ReactElement } from 'react';
import { FindManyFollowingsDocument } from '../../../../data-source/generated/graphql';
import useResponsive from '../../../../hooks/useResponsive';
import PEChefCard from '../../../cards/chefCard/PEChefCard';
import PEChefCardMobile from '../../../cards/chefCard/PEChefCardMobile';
import HStack from '../../../utility/hStack/HStack';

export interface ProfilePageFollowingsTabProps {
    userId?: string;
}

export default function ProfilePageFollowingsTab({ userId }: ProfilePageFollowingsTabProps): ReactElement {
    const { isMobile } = useResponsive();

    const { data } = useQuery(FindManyFollowingsDocument);

    const followings = data?.users.me?.followings;

    return (
        <HStack
            className="w-full max-w-screen-xl"
            style={{
                gap: 16,
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                marginLeft: 32,
            }}
        >
            {!isMobile &&
                followings?.map((following) => (
                    <PEChefCard
                        key={following.cook.cookId}
                        firstName={following.cook.user.firstName}
                        profilePictureUrl={following?.cook.user.profilePictureUrl ?? ''}
                        rank={following.cook.rank}
                        location={following.cook.city}
                        rating={{ average: 5, count: 12 }}
                        categories={[]}
                        kitchens={[]}
                        userId={userId}
                        cookId={following.cook.cookId}
                    />
                ))}

            {isMobile &&
                followings?.map((following) => (
                    <PEChefCardMobile
                        key={following.cook.cookId}
                        firstName={following.cook.user.firstName}
                        profilePictureUrl={following?.cook.user.profilePictureUrl ?? ''}
                        rank={following.cook.rank}
                        location={following.cook.city}
                        rating={{ average: 5, count: 12 }}
                        categories={[]}
                        kitchens={[]}
                        userId={userId}
                        cookId={following.cook.cookId}
                    />
                ))}
        </HStack>
    );
}
