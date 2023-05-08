import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import DataPrivacyPolicyPage, { type DataPrivacyPolicyPageProps } from '../../components/pages/dataPrivacyPolicy';
import { FindLatestPublicPrivacyPolicyUpdateDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: FindLatestPublicPrivacyPolicyUpdateDocument });

    return {
        props: {
            signedInUser: data.users.signedInUser,
            latestPrivacyPolicyUpdate: data.publicPrivacyPolicyUpdates.findLatest,
        },
    };
};

const Index: NextPage<DataPrivacyPolicyPageProps> = ({ signedInUser, latestPrivacyPolicyUpdate }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Data Privacy Policy</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DataPrivacyPolicyPage signedInUser={signedInUser} latestPrivacyPolicyUpdate={latestPrivacyPolicyUpdate} />
        </>
    );
};

export default Index;
