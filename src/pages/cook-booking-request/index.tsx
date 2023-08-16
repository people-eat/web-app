import { ApolloClient, InMemoryCache } from '@apollo/client';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import CookBookingRequestPage, { type CookBookingRequestPageProps } from '../../components/pages/cookBookingRequest';
import { GetCookBookingRequestPageDataDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
    const { address, latitude, longitude, adults, children, date, cookId } = query;

    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetCookBookingRequestPageDataDocument, variables: { cookId: cookId as string } });

    return {
        props: {
            signedInUser: data.users.signedInUser,
            cook: data.publicCooks.findOne,
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

const Index: NextPage<CookBookingRequestPageProps> = ({ signedInUser, cook, searchParameters, categories, allergies, kitchens }) => {
    const { t } = useTranslation('global-booking-request');
    return (
        <>
            <Head>
                <title>{t('request-title')}</title>

                <meta
                    name="description"
                    content="Du hast besondere Menü Wünsche und weißt nicht wo du anfangen sollst? Wir helfen dir dabei einen Privatkoch für Zuhause zu finden und ein Menü nach deinen Präferenzen zusammenzustellen. "
                />
                <meta name="keywords" content="PeopleEat, Menü für Zuhause, Koch für Zuhause, Hausparty Ideen" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CookBookingRequestPage
                signedInUser={signedInUser}
                cook={cook}
                searchParameters={searchParameters}
                categories={categories}
                allergies={allergies}
                kitchens={kitchens}
            />
        </>
    );
};

export default Index;
