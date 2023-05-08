import { type NextPage } from 'next';
import Head from 'next/head';
import ImprintPage from '../../components/pages/imprint';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - Imprint</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ImprintPage />
        </>
    );
};

export default Index;
