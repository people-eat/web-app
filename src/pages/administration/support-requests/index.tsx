import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import AdministrationSupportRequestsPage, {
    type AdministrationSupportRequestsPageProps,
} from '../../../components/pages/administration/AdministrationSupportRequestsPage';
import { createApolloClient } from '../../../data-source/createApolloClient';
import { GetAdministrationSupportRequestsPageDataDocument } from '../../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = createApolloClient(context.req.headers.cookie);

    try {
        const { data } = await apolloClient.query({ query: GetAdministrationSupportRequestsPageDataDocument });

        return {
            props: {
                signedInUser: data.users.signedInUser,
                supportRequests: data.supportRequests.findMany,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                signedInUser: null,
                supportRequests: [],
            },
        };
    }
};

const Index: NextPage<AdministrationSupportRequestsPageProps> = ({ signedInUser, supportRequests }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Administration - Global Booking Requests</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdministrationSupportRequestsPage signedInUser={signedInUser} supportRequests={supportRequests} />
        </>
    );
};

export default Index;
