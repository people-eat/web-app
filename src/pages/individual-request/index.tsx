import { ApolloClient, InMemoryCache } from '@apollo/client';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import IndividualRequestPage, { type IndividualRequestPageProps } from '../../components/pages/individualRequest';
import { GetIndividualRequestPageDataDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetIndividualRequestPageDataDocument });

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

const Index: NextPage<IndividualRequestPageProps> = ({ signedInUser, searchParameters, categories, allergies, kitchens }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Individual request</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <IndividualRequestPage
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
