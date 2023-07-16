import { ApolloClient, InMemoryCache } from '@apollo/client';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import PublicMenusPage, { type PublicMenusPageProps } from '../../components/pages/publicMenus';
import { GetPublicMenusPageDataDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
    const { address, latitude, longitude, adults, children, date } = query;

    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({
        query: GetPublicMenusPageDataDocument,
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
                publicMenus: data.publicMenus.findMany,
            },
        },
    };
};

const Index: NextPage<PublicMenusPageProps> = ({ signedInUser, searchParameters, searchResults }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Menus</title>

                <meta name="title" content="Entdecke Menüs" />
                <meta name="description" content="Erstelle eigene Menüs und genieße kulinarische Erlebnismomente bei dir Zuhause" />
                <meta name="keywords" content="Speisekarte , Menü für Zuhause, Essen für Zuhause bestellen" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PublicMenusPage signedInUser={signedInUser} searchParameters={searchParameters} searchResults={searchResults} />
        </>
    );
};

export default Index;
