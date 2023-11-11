import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import ProfilePage, { type ProfilePageProps } from '../../components/pages/profile';
import { createApolloClient } from '../../data-source/createApolloClient';
import { GetProfileQueryDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);
    const { data } = await apolloClient.query({ query: GetProfileQueryDocument });

    return {
        props: {
            signedInUser: data.users.me,
        },
    };
};

const Index: NextPage<ProfilePageProps> = ({ signedInUser }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Profile</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ProfilePage signedInUser={signedInUser} />
        </>
    );
};

export default Index;
