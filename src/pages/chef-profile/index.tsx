import { type NextPage } from 'next';
import Head from 'next/head';
import ChefProfilePage from '../../components/pages/chefProfile';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - Chef Profile</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ChefProfilePage />
        </>
    );
};

export default Index;
