/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import TermsAndConditionsPage from '../../components/pages/termsAndConditions';
import { FindLatestPublicTermsUpdateDocument } from '../../data-source/generated/graphql';
import { apolloClient } from '../_app';

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await apolloClient.query({ query: FindLatestPublicTermsUpdateDocument });

    if (!data.publicTermsUpdates.findLatest) throw new Error();

    return {
        props: {
            termsUpdateId: data.publicTermsUpdates.findLatest.termsUpdateId,
            englishText: data.publicTermsUpdates.findLatest.englishText,
            createdAt: data.publicTermsUpdates.findLatest.createdAt,
        },
    };
};

const Index: NextPage = ({ termsUpdateId, englishText, createdAt }: any) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Terms and Conditions</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TermsAndConditionsPage termsUpdateId={termsUpdateId} englishText={englishText} createdAt={createdAt} />
        </>
    );
};

export default Index;
