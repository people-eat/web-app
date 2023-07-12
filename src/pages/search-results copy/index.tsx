import { ApolloClient, InMemoryCache } from '@apollo/client';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import PublicCooksPage, { type SearchResultsPageProps } from '../../components/pages/publicCooks';
import { FindManyPublicCooksDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
    const { address, latitude, longitude, adults, children, date } = query;

    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({
        query: FindManyPublicCooksDocument,
        variables: {
            request: {
                location: {
                    latitude: latitude ? Number(latitude) : 49,
                    longitude: longitude ? Number(longitude) : 49,
                },
                adultParticipants: adults ? Number(adults) : 4,
                children: children ? Number(children) : 0,
                dateTime: typeof date === 'string' ? new Date(date) : new Date(),
            },
        },
    });

    return {
        props: {
            signedInUser: data.users.signedInUser,
            searchParameters: {
                location: {
                    address: typeof address === 'string' ? address : '',
                    latitude: latitude ? Number(latitude) : 49,
                    longitude: longitude ? Number(longitude) : 49,
                },
                adults: adults ? Number(adults) : 4,
                children: children ? Number(children) : 0,
                date:
                    typeof date === 'string'
                        ? moment(date).format(moment.HTML5_FMT.DATE)
                        : moment().add(14, 'days').format(moment.HTML5_FMT.DATE),
            },
            searchResults: {
                publicCooks: data.publicCooks.findMany,
            },
        },
    };
};

const Index: NextPage<SearchResultsPageProps> = ({ signedInUser, searchParameters, searchResults }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Search Results</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PublicCooksPage signedInUser={signedInUser} searchParameters={searchParameters} searchResults={searchResults} />
        </>
    );
};

export default Index;
