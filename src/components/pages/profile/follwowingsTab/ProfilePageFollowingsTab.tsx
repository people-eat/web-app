import { useQuery } from '@apollo/client';
import { type ReactElement } from 'react';
import { FindManyFollowingsDocument } from '../../../../data-source/generated/graphql';
import useResponsive from '../../../../hooks/useResponsive';
import PEChefCard from '../../../cards/chefCard/PEChefCard';
import PEChefCardMobile from '../../../cards/chefCard/PEChefCardMobile';
import VStack from '../../../utility/vStack/VStack';

export interface ProfilePageFollowingsTabProps {
    userId?: string;
}

export default function ProfilePageFollowingsTab({ userId }: ProfilePageFollowingsTabProps): ReactElement {
    const { data } = useQuery(FindManyFollowingsDocument);
    const followings = data?.users.me?.followings;
    const { isMobile } = useResponsive();

    return (
        <VStack>
            {!isMobile &&
                followings?.map((following, index) => (
                    <PEChefCard
                        key={index}
                        firstName={following.cook.user.firstName}
                        profilePictureUrl={following?.cook.user.profilePictureUrl ?? ''}
                        rank={following.cook.rank}
                        location={''}
                        rating={{ average: 5, count: 12 }}
                        categories={[]}
                        kitchens={[]}
                        userId={userId ?? ''}
                    />
                ))}
            {isMobile &&
                followings?.map((following, index) => (
                    <PEChefCardMobile
                        key={index}
                        firstName={following.cook.user.firstName}
                        profilePictureUrl={following?.cook.user.profilePictureUrl ?? ''}
                        rank={following.cook.rank}
                        location={''}
                        rating={{ average: 5, count: 12 }}
                        categories={[]}
                        kitchens={[]}
                    />
                ))}
        </VStack>
    );
}
