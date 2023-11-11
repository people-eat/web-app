import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import AdministrationGlobalBookingRequestsPage, {
    type AdministrationGlobalBookingRequestsPageProps,
} from '../../../components/pages/administration/AdministrationGlobalBookingRequestsPage';
import { createApolloClient } from '../../../data-source/createApolloClient';
import { GetAdministrationGlobalBookingRequestsPageDataDocument } from '../../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = createApolloClient(context.req.headers.cookie);

    try {
        const { data } = await apolloClient.query({ query: GetAdministrationGlobalBookingRequestsPageDataDocument });

        return {
            props: {
                signedInUser: data.users.signedInUser,
                globalBookingRequests: data.globalBookingRequests.findMany,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                signedInUser: null,
                globalBookingRequests: [],
            },
        };
    }
};

const Index: NextPage<AdministrationGlobalBookingRequestsPageProps> = ({ signedInUser, globalBookingRequests }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Administration - Global Booking Requests</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdministrationGlobalBookingRequestsPage signedInUser={signedInUser} globalBookingRequests={globalBookingRequests} />
        </>
    );
};

export default Index;
