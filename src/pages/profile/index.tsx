import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import PEFooter from '../../components/footer/PEFooter';
import PEHeader from '../../components/header/PEHeader';
import { UserProfileNavigationTabs } from '../../components/navigation/UserProfileNavigationTabs';
import ProfilePagePersonalTab from '../../components/pages/profile/personalTab/ProfilePagePersonalTab';
import VStack from '../../components/utility/vStack/VStack';
import { createApolloClient } from '../../data-source/createApolloClient';
import {
    GetUserProfilePersonalInformationPageDataDocument,
    type GetSignedInUserQuery,
    type GetUserProfilePersonalInformationPageDataQuery,
} from '../../data-source/generated/graphql';
import styles from './styles.module.css';

interface ServerSideProps {
    signedInUser: NonNullable<GetSignedInUserQuery['users']['signedInUser']>;
    userProfile: NonNullable<GetUserProfilePersonalInformationPageDataQuery['users']['me']>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);

    try {
        const { data } = await apolloClient.query({ query: GetUserProfilePersonalInformationPageDataDocument });

        const signedInUser = data.users.signedInUser;

        if (!signedInUser) throw new Error();

        const userProfile = data.users.me;

        if (!userProfile) throw new Error();

        return {
            props: {
                signedInUser,
                userProfile,
            },
        };
    } catch (error) {
        // if (!isApolloError(error as Error)) throw error;
        // (error as ApolloError).networkError.
        throw error;
    }
};

// todo: use userProfile
const Index: NextPage<ServerSideProps> = ({ signedInUser }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Profile</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack className="w-full" gap={32}>
                <PEHeader signedInUser={signedInUser} />

                <div className={styles.bodyContainer}>
                    <UserProfileNavigationTabs selection="PERSONAL_INFORMATION" />

                    <main className={styles.mainContainer}>
                        <ProfilePagePersonalTab userId={signedInUser.userId} />
                    </main>
                </div>

                <PEFooter />
            </VStack>
        </>
    );
};

export default Index;
