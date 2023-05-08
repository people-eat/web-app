import { type NextPage } from 'next';
import Head from 'next/head';
import DataPrivacyPolicyPage from '../../components/pages/dataPrivacyPolicy';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - Data Privacy Policy</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DataPrivacyPolicyPage />
        </>
    );
};

export default Index;
