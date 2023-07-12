import { ApolloClient, InMemoryCache } from '@apollo/client';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import { createContext, type Context } from 'react';
import HomePage, { type HomePageProps } from '../components/pages/home';
import { GetProfileQueryDocument } from '../data-source/generated/graphql';
import { type SignedInUser } from '../shared-domain/SignedInUser';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetProfileQueryDocument });

    return {
        props: {
            signedInUser: data.users.me,
            searchParameters: {
                location: {
                    address: '',
                    latitude: 49,
                    longitude: 8,
                },
                adults: 4,
                children: 0,
                date: moment().add(14, 'days').format(moment.HTML5_FMT.DATE),
            },
        },
    };
};

export const HomePageContext: Context<{ signedInUser?: SignedInUser }> = createContext({});

const Index: NextPage<HomePageProps> = ({ signedInUser, searchParameters }: HomePageProps) => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>

                <meta name="title" content="Finde einen Privatkoch für dein Event Zuhause PeopleEat" />
                <meta
                    name="description"
                    content="Finde einen Privatkoch in deiner Umgebung für jeden Anlass und erhalte kulinarische Erlebnismomente bei dir Zuhause. Wir kümmern uns um den Einkauf der Lebensmittel, die Zubereitung der Speisen und selbstverständlich um eine saubere Küche."
                />
                <meta name="keywords" content="Kochservice, Privatkoch, Event Zuhause" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <HomePageContext.Provider value={{ signedInUser }}>
                <HomePage signedInUser={signedInUser} searchParameters={searchParameters} />
            </HomePageContext.Provider>
        </>
    );
};

export default Index;
