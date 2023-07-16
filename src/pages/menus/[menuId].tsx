import { ApolloClient, InMemoryCache } from '@apollo/client';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import PublicMenuPage, { type PublicMenuPageProps } from '../../components/pages/publicMenu';
import { GetPublicMenuPageDataDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { menuId } = context.query;

    if (typeof menuId !== 'string') throw new Error();

    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetPublicMenuPageDataDocument, variables: { menuId } });

    const publicMenu = data.publicMenus.findOne;

    return {
        props: {
            signedInUser: data.users.signedInUser,
            publicMenu,
        },
    };
};

const Index: NextPage<PublicMenuPageProps> = ({ signedInUser, publicMenu }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - {publicMenu?.title ?? 'Menu not found'}</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PublicMenuPage signedInUser={signedInUser} publicMenu={publicMenu} />
        </>
    );
};

export default Index;
