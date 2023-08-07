import { ApolloClient, InMemoryCache } from '@apollo/client';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import PublicCooksPage, { type PublicCooksPageProps } from '../../components/pages/publicCooks';
import { GetPublicCooksPageDataDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
    const { address, latitude, longitude, adults, children, date } = query;

    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({
        query: GetPublicCooksPageDataDocument,
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

const Index: NextPage<PublicCooksPageProps> = ({ signedInUser, searchParameters, searchResults }) => {
    const { t } = useTranslation('search-results');
    return (
        <>
            <Head>
                <title>{t('chefs-title')}</title>

                <meta name="title" content="Finde einen Privatkoch in deiner Umgebung" />
                <meta
                    name="description"
                    content="Hier kannst du einen Privatkoch für Zuhause zu buchen. Du wirst es kaum glauben, aber es war nie einfacher"
                />
                <meta name="keywords" content="Koch buchen, Koch für Zuhause, Mietkoch" />
                <link rel="alternate" href="https://people-eat.com/de/chefs/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/de/chefs/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/chefs/" hrefLang="en" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PublicCooksPage signedInUser={signedInUser} searchParameters={searchParameters} searchResults={searchResults} />
        </>
    );
};

export default Index;
