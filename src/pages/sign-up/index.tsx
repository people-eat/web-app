import { type NextPage } from 'next';
import Head from 'next/head';
import SignUpPage from '../../components/pages/signUp';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>PeopleEat - Sign Up</title>
                <meta name="description" content="PeopleEat - Sign Up" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SignUpPage />
        </>
    );
};

export default Index;
