import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import AdministrationUsersPage, {
    type AdministrationUsersPageProps,
} from '../../../components/pages/administration/AdministrationUsersPage';
import { createApolloClient } from '../../../data-source/createApolloClient';
import { GetAdministrationUsersPageDataDocument } from '../../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = createApolloClient(context.req.headers.cookie);

    try {
        const { data } = await apolloClient.query({ query: GetAdministrationUsersPageDataDocument, variables: { request: {} } });

        return {
            props: {
                signedInUser: data.users.signedInUser,
                users: data.users.findMany,
            },
        };
    } catch (error) {
        return {
            props: {
                signedInUser: null,
                users: [],
            },
        };
    }
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
