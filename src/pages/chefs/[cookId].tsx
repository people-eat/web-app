import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import PublicCookPage, { type PublicCookPageProps } from '../../components/pages/publicCook';
import { createApolloClient } from '../../data-source/createApolloClient';
import { GetPublicCookPageDataDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { cookId } = context.query;

    if (typeof cookId !== 'string') throw new Error();

    const apolloClient = createApolloClient(context.req.headers.cookie);
    const { data } = await apolloClient.query({ query: GetPublicCookPageDataDocument, variables: { cookId } });

    const publicCook = data.publicCooks.findOne;
    const categories = data.categories.findAll;
    const kitchens = data.kitchens.findAll;

    return {
        props: {
            signedInUser: data.users.signedInUser,
            publicCook,
            categories,
            kitchens,
        },
    };
};

const Index: NextPage<PublicCookPageProps> = ({ signedInUser, publicCook, categories, kitchens }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - {publicCook?.user.firstName ?? 'Chef not found'}</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PublicCookPage signedInUser={signedInUser} publicCook={publicCook} categories={categories} kitchens={kitchens} />
        </>
    );
};

export default Index;
