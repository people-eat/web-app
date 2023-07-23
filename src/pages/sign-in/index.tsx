import { type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import SignInPage from '../../components/pages/signIn';

const Index: NextPage = () => {
    const { t } = useTranslation('sign-in');
    return (
        <>
            <Head>
                <title>{t('sign-in-title')}</title>

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
