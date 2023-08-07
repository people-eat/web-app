import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import ImprintPage, { type ImprintPageProps } from '../../components/pages/imprint';
import { GetProfileQueryDocument } from '../../data-source/generated/graphql';

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
        },
    };
};

const Index: NextPage<ImprintPageProps> = ({ signedInUser }) => {
    const { t } = useTranslation('imprint');
    return (
        <>
            <Head>
                <title>{t('imprint-title')}</title>

                <meta name="description" content="Impressum | PeopleEat" />
                <meta name="keywords" content="" />
                <link rel="alternate" href="https://people-eat.com/imprint/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/imprint/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/imprint/" hrefLang="en" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ImprintPage signedInUser={signedInUser} />
        </>
    );
};

export default Index;
