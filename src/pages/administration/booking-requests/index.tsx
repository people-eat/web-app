import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import AdministrationBookingRequestsPage, {
    type AdministrationBookingRequestsPageProps,
} from '../../../components/pages/administration/AdministrationBookingRequestsPage';
import { createApolloClient } from '../../../data-source/createApolloClient';
import { GetAdministrationBookingRequestsPageDataDocument } from '../../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = createApolloClient(context.req.headers.cookie);

    try {
        const { data } = await apolloClient.query({ query: GetAdministrationBookingRequestsPageDataDocument });

        return {
            props: {
                signedInUser: data.users.signedInUser,
                bookingRequests: data.bookingRequests.findMany,
            },
        };
    } catch (error) {
        console.log(error);
        return {
            props: {
                signedInUser: null,
                bookingRequests: [],
            },
        };
    }
};

const Index: NextPage<AdministrationBookingRequestsPageProps> = ({ signedInUser, bookingRequests }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Administration - Global Booking Requests</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AdministrationBookingRequestsPage signedInUser={signedInUser} bookingRequests={bookingRequests} />
        </>
    );
};

export default Index;
