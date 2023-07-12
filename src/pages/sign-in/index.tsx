import { type NextPage } from 'next';
import Head from 'next/head';
import SignInPage from '../../components/pages/signIn';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - Sign In</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SignInPage />
        </>
    );
};

export default Index;
