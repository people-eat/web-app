import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import HowToChefPage, { type HowToChefPageProps } from '../../components/pages/howToChef';
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

const Index: NextPage<HowToChefPageProps> = ({ signedInUser }) => {
    const { t } = useTranslation('how-to-chef');
    return (
        <>
            <Head>
                <title>{t('how-to-become-a-chef-title')}</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HowToChefPage signedInUser={signedInUser} />
        </>
    );
};

export default Index;
