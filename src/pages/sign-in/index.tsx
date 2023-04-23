import { type NextPage } from 'next';
import Head from 'next/head';
import SignInPage from '../../components/pages/signIn';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - Sign In</title>
                <meta name="description" content="PeopleEat - Sign In" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SignInPage />
        </>
    );
};

export default Index;
