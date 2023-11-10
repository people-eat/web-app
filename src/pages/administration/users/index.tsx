import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import AdministrationUsersPage, {
    type AdministrationUsersPageProps,
} from '../../../components/pages/administration/AdministrationUsersPage';
import { GetAdministrationUsersPageDataDocument } from '../../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    });

    try {
        const { data } = await apolloClient.query({ query: GetAdministrationUsersPageDataDocument, variables: { request: {} } });

        return {
            props: {
                signedInUser: data.users.signedInUser,
                users: data.users.findMany,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                signedInUser: undefined,
                users: [],
                error,
            },
        };
    }
};

const Index: NextPage<AdministrationUsersPageProps> = ({ signedInUser, users, error }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Administration - Users</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {error && JSON.stringify(error)}
            <AdministrationUsersPage signedInUser={signedInUser} users={users} />
        </>
    );
};

export default Index;
