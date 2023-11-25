import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import PEChefCard from '../../../components/cards/chefCard/PEChefCard';
import PEChefCardMobile from '../../../components/cards/chefCard/PEChefCardMobile';
import PEFooter from '../../../components/footer/PEFooter';
import PEHeader from '../../../components/header/PEHeader';
import { UserProfileNavigationTabs } from '../../../components/navigation/UserProfileNavigationTabs';
import VStack from '../../../components/utility/vStack/VStack';
import { createApolloClient } from '../../../data-source/createApolloClient';
import {
    GetSignedInUserDocument,
    GetUserProfileFavoriteCooksPageDataDocument,
    type GetSignedInUserQuery,
    type GetUserProfileFavoriteCooksPageDataQuery,
} from '../../../data-source/generated/graphql';
import useResponsive from '../../../hooks/useResponsive';
import styles from './styles.module.css';

interface ServerSideProps {
    signedInUser: NonNullable<GetSignedInUserQuery['users']['signedInUser']>;
    favoriteCooks: NonNullable<GetUserProfileFavoriteCooksPageDataQuery['users']['followings']['findAll']>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);

    const { data: signedInUserData } = await apolloClient.query({ query: GetSignedInUserDocument });

    const signedInUser = signedInUserData.users.signedInUser;

    if (!signedInUser) throw new Error();

    const { data: favoriteCooksData } = await apolloClient.query({
        query: GetUserProfileFavoriteCooksPageDataDocument,
        variables: { userId: signedInUser.userId },
    });

    return {
        props: {
            signedInUser,
            favoriteCooks: favoriteCooksData.users.followings.findAll,
        },
    };
};

const Index: NextPage<ServerSideProps> = ({ signedInUser, favoriteCooks }) => {
    const { isMobile } = useResponsive();

    return (
        <>
            <Head>
                <title>PeopleEat - Favorite Chefs</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack className="w-full" gap={32}>
                <PEHeader signedInUser={signedInUser} />

                <div className={styles.bodyContainer}>
                    <UserProfileNavigationTabs selection="FAVORITE_COOKS" />

                    <main className={styles.mainContainer}>
                        {!isMobile &&
                            favoriteCooks.map((following) => (
                                <PEChefCard
                                    key={following.cookId}
                                    firstName={following.cook.user.firstName}
                                    profilePictureUrl={following?.cook.user.profilePictureUrl ?? ''}
                                    rank={following.cook.rank}
                                    location={following.cook.city}
                                    rating={{ average: 5, count: 12 }}
                                    categories={[]}
                                    kitchens={[]}
                                    userId={signedInUser.userId}
                                    cookId={following.cookId}
                                />
                            ))}

                        {isMobile &&
                            favoriteCooks.map((following) => (
                                <PEChefCardMobile
                                    key={following.cookId}
                                    firstName={following.cook.user.firstName}
                                    profilePictureUrl={following?.cook.user.profilePictureUrl ?? ''}
                                    rank={following.cook.rank}
                                    location={following.cook.city}
                                    rating={{ average: 5, count: 12 }}
                                    categories={[]}
                                    kitchens={[]}
                                    userId={signedInUser.userId}
                                    cookId={following.cookId}
                                />
                            ))}
                    </main>
                </div>

                <PEFooter className={styles.hiddenOnMobile} />
            </VStack>
        </>
    );
};

export default Index;
