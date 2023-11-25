import { type NextPage } from 'next';
import Head from 'next/head';
import SignUpPage from '../../components/pages/signUp';

const Index: NextPage = () => {
    return (
        <>
            <Head>
                <title>Registrierung</title>

                <meta name="description" content="" />
                <meta name="keywords" content="" />
                <link rel="alternate" href="https://people-eat.com/sign-up/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/sign-up/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/sign-up/" hrefLang="en" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SignUpPage />
        </>
    );
};

export default Index;
