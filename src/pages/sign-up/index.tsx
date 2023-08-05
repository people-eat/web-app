import { type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import SignUpPage from '../../components/pages/signUp';

const Index: NextPage = () => {
    const { t } = useTranslation('sign-up');
    return (
        <>
            <Head>
                <title>{t('sign-up-title')}</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />
                <link rel="canonical" href="https://www.people-eat.com/sign-up" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SignUpPage />
        </>
    );
};

export default Index;
