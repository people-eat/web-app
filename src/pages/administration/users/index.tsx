import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import AdministrationUsersPage, {
    type AdministrationUsersPageProps,
} from '../../../components/pages/administration/AdministrationUsersPage';
import { GetAdministrationUsersPageDataDocument } from '../../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetAdministrationUsersPageDataDocument, variables: { request: {} } });

    return {
        props: {
            signedInUser: data.users.signedInUser,
            users: data.users.findMany,
        },
    };
};

const Index: NextPage<AdministrationUsersPageProps> = ({ signedInUser, users }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Administration - Users</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdministrationUsersPage signedInUser={signedInUser} users={users} />
        </>
    );
};

export default Index;
