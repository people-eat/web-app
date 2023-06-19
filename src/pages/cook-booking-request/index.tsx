import { ApolloClient, InMemoryCache } from '@apollo/client';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
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
    return (
        <>
            <Head>
                <title>PeopleEat - Cook Booking Request</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
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
