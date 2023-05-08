/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import DataPrivacyPolicyPage from '../../components/pages/dataPrivacyPolicy';
import { FindLatestPublicPrivacyPolicyUpdateDocument } from '../../data-source/generated/graphql';
import { apolloClient } from '../_app';

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await apolloClient.query({ query: FindLatestPublicPrivacyPolicyUpdateDocument });

    if (!data.publicPrivacyPolicyUpdates.findLatest) throw new Error();

    return {
        props: {
            privacyPolicyUpdateId: data.publicPrivacyPolicyUpdates.findLatest.privacyPolicyUpdateId,
            englishText: data.publicPrivacyPolicyUpdates.findLatest.englishText,
            germanText: data.publicPrivacyPolicyUpdates.findLatest.germanText,
            createdAt: data.publicPrivacyPolicyUpdates.findLatest.createdAt,
        },
    };
};

const Index: NextPage = ({ privacyPolicyUpdateId, englishText, germanText, createdAt }: any) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Data Privacy Policy</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DataPrivacyPolicyPage
                privacyPolicyUpdateId={privacyPolicyUpdateId}
                englishText={englishText}
                germanText={germanText}
                createdAt={createdAt}
            />
        </>
    );
};

export default Index;
