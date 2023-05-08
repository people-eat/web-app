import { type NextPage } from 'next';
import Head from 'next/head';
import AboutUsPage from '../../components/pages/aboutUs';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - About us</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AboutUsPage />
        </>
    );
};

export default Index;
