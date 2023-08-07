import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import DataPrivacyPolicyPage, { type DataPrivacyPolicyPageProps } from '../../components/pages/dataPrivacyPolicy';
import { FindLatestPublicPrivacyPolicyUpdateDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: FindLatestPublicPrivacyPolicyUpdateDocument });

    return {
        props: {
            signedInUser: data.users.signedInUser,
            latestPrivacyPolicyUpdate: data.publicPrivacyPolicyUpdates.findLatest,
        },
    };
};

const Index: NextPage<DataPrivacyPolicyPageProps> = ({ signedInUser, latestPrivacyPolicyUpdate }) => {
    const { t } = useTranslation('common');
    return (
        <>
            <Head>
                <title>{t('data-privacy-title')}</title>

                <meta name="description" content="Datenschutzerklärung" />
                <meta name="keywords" content="" />
                <link rel="alternate" href="https://people-eat.com/data-privacy-policy/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/data-privacy-policy/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/data-privacy-policy/" hrefLang="en" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DataPrivacyPolicyPage signedInUser={signedInUser} latestPrivacyPolicyUpdate={latestPrivacyPolicyUpdate} />
        </>
    );
};

export default Index;
