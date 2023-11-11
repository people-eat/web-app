import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import AboutUsPage, { type AboutUsPageProps } from '../../components/pages/aboutUs';
import { createApolloClient } from '../../data-source/createApolloClient';
import { GetProfileQueryDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const apolloClient = createApolloClient(context.req.headers.cookie);
    const { data: profileData } = await apolloClient.query({ query: GetProfileQueryDocument });
    return {
        props: {
            signedInUser: profileData.users.me,
        },
    };
};

const Index: NextPage<AboutUsPageProps> = ({ signedInUser }) => {
    const { t } = useTranslation('about-us');

    return (
        <>
            <Head>
                <title>{t('about-us-title')}</title>
                <meta
                    name="description"
                    content="Wir machen es dir so einfach wie nie zuvor, einen Privatkoch für Deine Dinner-Party zu buchen. Wir sind davon überzeugt, dass Essen nicht nur ein Erlebnismoment ist, sondern auch Menschen zusammen bringt."
                />
                <meta name="keywords" content="PeopleEat, Koch buchen, Candle Light Dinner, Geburtstag, Koch mieten" />
                <link rel="alternate" href="https://people-eat.com/about-us/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/about-us/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/about-us/" hrefLang="en" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AboutUsPage signedInUser={signedInUser} />
        </>
    );
};

export default Index;
