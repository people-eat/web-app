import { type NextPage } from 'next';
import Head from 'next/head';
import HowToChefPage from '../../components/pages/howToChef';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - How to Chef</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <HowToChefPage />
        </>
    );
};

export default Index;
