import { useQuery } from '@apollo/client';
import { type ReactElement } from 'react';
import { FindManyFollowingsDocument } from '../../../../data-source/generated/graphql';
import VStack from '../../../utility/vStack/VStack';

export default function ProfilePageFollowingsTab(): ReactElement {
    const { data } = useQuery(FindManyFollowingsDocument);
    const followings = data?.users.me?.followings;

    return (
        <VStack>
            {followings?.map((following, index) => (
                <p key={index}>{following.cook.user.firstName}</p>
            ))}
        </VStack>
    );
}
