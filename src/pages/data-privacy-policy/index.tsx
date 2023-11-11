import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import DataPrivacyPolicyPage, { type DataPrivacyPolicyPageProps } from '../../components/pages/dataPrivacyPolicy';
import { createApolloClient } from '../../data-source/createApolloClient';
import { FindLatestPublicPrivacyPolicyUpdateDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);
    const { data } = await apolloClient.query({ query: FindLatestPublicPrivacyPolicyUpdateDocument });

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
