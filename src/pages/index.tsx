import { ApolloClient, InMemoryCache } from '@apollo/client';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import HomePage, { type HomePageProps } from '../components/pages/home';
import { GetProfileQueryDocument } from '../data-source/generated/graphql';

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

const Index: NextPage<HomePageProps> = ({ signedInUser, searchParameters }: HomePageProps) => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomePage signedInUser={signedInUser} searchParameters={searchParameters} />
        </>
    );
};

export default Index;
