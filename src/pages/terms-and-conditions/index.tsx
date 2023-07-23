import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import TermsAndConditionsPage, { type TermsAndConditionsPageProps } from '../../components/pages/termsAndConditions';
import { FindLatestPublicTermsUpdateDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: FindLatestPublicTermsUpdateDocument });

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

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TermsAndConditionsPage signedInUser={signedInUser} latestTermsUpdate={latestTermsUpdate} />
        </>
    );
};

export default Index;
