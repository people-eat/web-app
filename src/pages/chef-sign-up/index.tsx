import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import CookSignUpPage, { type CookSignUpPageProps } from '../../components/pages/cookSignUp';
import { GetProfileQueryDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data: profileData } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetProfileQueryDocument });

    return {
        props: {
            signedInUser: profileData.users.me
                ? {
                      userId: profileData.users.me.userId,
                      firstName: profileData.users.me.firstName,
                      profilePictureUrl: profileData.users.me.profilePictureUrl,
                      isAdmin: false,
                      isCook: profileData.users.me.isCook,
                  }
                : null,
        },
    };
};

const Index: NextPage<CookSignUpPageProps> = ({ signedInUser }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Chef Sign Up</title>
                <meta name="description" content="PeopleEat - Sign Up" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CookSignUpPage
                signedInUser={signedInUser}
                languages={[
                    { languageId: 'A', title: 'German' },
                    { languageId: 'B', title: 'English' },
                    { languageId: 'C', title: 'French' },
                    { languageId: 'D', title: 'Russian' },
                ]}
            />
        </>
    );
};

export default Index;
