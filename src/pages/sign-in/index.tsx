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

                <meta
                    name="description"
                    content="Willkommen zurück! Melde dich mit Google, oder deiner Email Adresse an. Erstelle dein eigenes Menü für jeden Anlass."
                />
                <meta name="keywords" content="" />
                <link rel="alternate" href="https://people-eat.com/sign-in/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/sign-in/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/sign-in/" hrefLang="en" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SignInPage />
        </>
    );
};

export default Index;
