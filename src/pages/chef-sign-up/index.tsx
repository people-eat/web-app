import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import CookSignUpPage, { type CookSignUpPageProps } from '../../components/pages/cookSignUp';
import { GetCookSignUpPageDataDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetCookSignUpPageDataDocument });

    return {
        props: {
            signedInUser: data.users.signedInUser,
            languages: data.languages.findAll,
        },
    };
};

const Index: NextPage<CookSignUpPageProps> = ({ signedInUser, languages }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Chef Sign Up</title>
                <meta name="description" content="PeopleEat - Chef Sign Up" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CookSignUpPage signedInUser={signedInUser} languages={languages} />
        </>
    );
};

export default Index;
