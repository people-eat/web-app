import { type NextPage } from 'next';
import Head from 'next/head';
import IndividualRequestPage from '../../components/pages/individualRequest';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - Individual request</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <IndividualRequestPage />
        </>
    );
};

export default Index;
