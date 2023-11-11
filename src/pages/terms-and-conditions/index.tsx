import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import TermsAndConditionsPage, { type TermsAndConditionsPageProps } from '../../components/pages/termsAndConditions';
import { createApolloClient } from '../../data-source/createApolloClient';
import { FindLatestPublicTermsUpdateDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);
    const { data } = await apolloClient.query({ query: FindLatestPublicTermsUpdateDocument });

    return {
        props: {
            signedInUser: data.users.signedInUser,
            latestTermsUpdate: data.publicTermsUpdates.findLatest,
        },
    };
};

const Index: NextPage<TermsAndConditionsPageProps> = ({ signedInUser, latestTermsUpdate }) => {
    const { t } = useTranslation('common');

    return (
        <>
            <Head>
                <title>{t('terms-title')}</title>

                <meta name="description" content={t('terms-title')} />
                <meta name="keywords" content="" />
                <link rel="alternate" href="https://people-eat.com/terms-and-conditions/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/terms-and-conditions/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/terms-and-conditions/" hrefLang="en" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TermsAndConditionsPage signedInUser={signedInUser} latestTermsUpdate={latestTermsUpdate} />
        </>
    );
};

export default Index;
