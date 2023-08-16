import { ApolloClient, InMemoryCache } from '@apollo/client';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import GlobalBookingRequestPage, { type GlobalBookingRequestPageProps } from '../../components/pages/globalBookingRequest';
import { GetGlobalBookingRequestPageDataDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetGlobalBookingRequestPageDataDocument });

    const { address, latitude, longitude, adults, children, date } = query;

    return {
        props: {
            signedInUser: data.users.signedInUser,
            searchParameters: {
                location: {
                    address: typeof address === 'string' ? address : '',
                    latitude: latitude ? Number(latitude) : 49,
                    longitude: longitude ? Number(longitude) : 49,
                },
                adults: adults ? Number(adults) : 4,
                children: children ? Number(children) : 0,
                date: typeof date === 'string' ? moment(date).format(moment.HTML5_FMT.DATE) : moment().format(moment.HTML5_FMT.DATE),
            },
            categories: data.categories.findAll,
            allergies: data.allergies.findAll,
            kitchens: data.kitchens.findAll,
        },
    };
};

const Index: NextPage<GlobalBookingRequestPageProps> = ({ signedInUser, searchParameters, categories, allergies, kitchens }) => {
    const { t } = useTranslation('global-booking-request');
    return (
        <>
            <Head>
                <title>{t('request-title')}</title>
                <meta
                    name="description"
                    content="Du hast besondere Menü Ideen und weißt nicht wo du anfangen sollst? Wir helfen dir dabei einen Privatkoch für zuhause zu finden und ein Menü nach deinen Präferenzen zusammenzustellen."
                />
                <meta
                    name="keywords"
                    content="PeopleEat, Privatkoch für zuhause, Personal chef, Koch, buchen, mieten, show cooking, party service, Mietkoch, kochevents, homecooking"
                />
                <link rel="alternate" href="https://people-eat.com/global-booking-request/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/global-booking-request/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/global-booking-request/" hrefLang="en" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GlobalBookingRequestPage
                signedInUser={signedInUser}
                searchParameters={searchParameters}
                categories={categories}
                allergies={allergies}
                kitchens={kitchens}
            />
        </>
    );
};

export default Index;
