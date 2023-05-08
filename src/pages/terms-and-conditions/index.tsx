import { type NextPage } from 'next';
import Head from 'next/head';
import TermsAndConditionsPage from '../../components/pages/termsAndConditions';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - Terms and Conditions</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <TermsAndConditionsPage />
        </>
    );
};

export default Index;
