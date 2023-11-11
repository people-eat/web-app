import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import CookSignUpPage, { type CookSignUpPageProps } from '../../components/pages/cookSignUp';
import { createApolloClient } from '../../data-source/createApolloClient';
import { GetCookSignUpPageDataDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = createApolloClient(context.req.headers.cookie);
    const { data } = await apolloClient.query({ query: GetCookSignUpPageDataDocument });

    return {
        props: {
            signedInUser: data.users.signedInUser,
            languages: data.languages.findAll,
        },
    };
};

const Index: NextPage<CookSignUpPageProps> = ({ signedInUser, languages }) => {
    const { t } = useTranslation('chef-sign-up');
    return (
        <>
            <Head>
                <title>{t('chef-sign-up-title')}</title>
                <meta name="description" content="" />
                <meta name="keywords" content="" />
                <link rel="alternate" href="https://people-eat.com/chef-sign-up/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/chef-sign-up/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/chef-sign-up/" hrefLang="en" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CookSignUpPage signedInUser={signedInUser} languages={languages} />
        </>
    );
};

export default Index;
