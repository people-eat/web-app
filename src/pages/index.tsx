import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import { type PEHeaderProps } from '../components/header/PEHeaderProps';
import HomePage from '../components/pages/home';
import { GetProfileQueryDocument } from '../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({
        query: GetProfileQueryDocument,
    });

    return {
        props: {
            signedInUser: data.users.me
                ? {
                      userId: data.users.me.userId,
                      firstName: data.users.me.firstName,
                      profilePictureUrl: data.users.me.profilePictureUrl,
                      isAdmin: false,
                      isCook: data.users.me.isCook,
                  }
                : null,
        },
    };
};

const Index: NextPage = ({ signedInUser }: PEHeaderProps) => {
    return (
        <>
            <Head>
                <title>PeopleEat</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HomePage signedInUser={signedInUser} />
        </>
    );
};

export default Index;
