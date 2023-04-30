import { type NextPage } from 'next';
import Head from 'next/head';
import ProfilePage from '../../components/pages/profile';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - Profile</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ProfilePage />
        </>
    );
};

export default Index;
