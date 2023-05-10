import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import IndividualRequestPage, { type IndividualRequestPageProps } from '../../components/pages/individualRequest';
import { GetIndividualRequestPageDataDocument } from '../../data-source/generated/graphql';
import { apolloClient } from '../_app';

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await apolloClient.query({
        query: GetIndividualRequestPageDataDocument,
    });

    return {
        props: {
            categories: data.categories.findAll,
            allergies: data.allergies.findAll,
            kitchens: data.kitchens.findAll,
        },
    };
};

const Index: NextPage<IndividualRequestPageProps> = ({ categories, allergies, kitchens }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - Individual request</title>
                <meta name="description" content="PeopleEat - a platform to find private chefs / cooks" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <IndividualRequestPage categories={categories} allergies={allergies} kitchens={kitchens} />
        </>
    );
};

export default Index;
