import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import HowToChefPage, { type HowToChefPageProps } from '../../components/pages/howToChef';
import { createApolloClient } from '../../data-source/createApolloClient';
import { GetProfileQueryDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);
    const { data: profileData } = await apolloClient.query({ query: GetProfileQueryDocument });

    return {
        props: {
            signedInUser: profileData.users.me,
        },
    };
};

const Index: NextPage<HowToChefPageProps> = ({ signedInUser }) => {
    const { t } = useTranslation('how-to-chef');
    return (
        <>
            <Head>
                <title>{t('how-to-become-a-chef-title')}</title>
                <meta
                    name="description"
                    content="Werde Mietkoch, genieße die Freiheit und Flexibilität wann du deine Privatkoch Dienstleistungen anbieten möchtest. Teile deine Leidenschaft mit deinen Gästen und schaffe einzigartige Erlebnismomente."
                />
                <meta name="keywords" content="PeopleEat, Privatkoch werden, Eventkoch, Koch werden, eigenes Restaurant eröffnen" />
                <link rel="icon" href="/favicon.ico" />
                <link rel="alternate" href="https://people-eat.com/how-to-chef/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/how-to-chef/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/how-to-chef/" hrefLang="en" />
            </Head>
            <HowToChefPage signedInUser={signedInUser} />
        </>
    );
};

export default Index;
