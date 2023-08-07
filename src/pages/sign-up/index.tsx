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
