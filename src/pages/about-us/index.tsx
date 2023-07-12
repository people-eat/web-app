import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import AboutUsPage, { type AboutUsPageProps } from '../../components/pages/aboutUs';
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
            signedInUser: profileData.users.me,
        },
    };
};

const Index: NextPage<AboutUsPageProps> = ({ signedInUser }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - About us</title>

                <meta name="title" content="" />
                <meta
                    name="description"
                    content="Wir machen es dir so einfach wie nie zuvor, einen Privatkoch für Deine Dinner-Party zu buchen. Wir sind davon überzeugt, dass Essen nicht nur ein Erlebnismoment ist, sondern auch Menschen zusammen bringt."
                />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AboutUsPage signedInUser={signedInUser} />
        </>
    );
};

export default Index;
