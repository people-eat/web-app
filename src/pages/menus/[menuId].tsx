import { ApolloClient, InMemoryCache } from '@apollo/client';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import PublicMenuPage, { type PublicMenuPageProps } from '../../components/pages/publicMenu';
import { GetPublicMenuPageDataDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { menuId, address, latitude, longitude, adults, children, date } = context.query;

    if (typeof menuId !== 'string') throw new Error();

    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetPublicMenuPageDataDocument, variables: { menuId } });

    const publicMenu = data.publicMenus.findOne;
    const allergies = data.allergies.findAll ?? [];

    return {
        props: {
            signedInUser: data.users.signedInUser,
            publicMenu,
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
            allergies,
            stripePublishableKey: data.stripePublishableKey,
        },
    };
};

const Index: NextPage<PublicMenuPageProps> = ({ signedInUser, publicMenu, searchParameters, allergies, stripePublishableKey }) => {
    return (
        <>
            <Head>
                <title>PeopleEat - {publicMenu?.title ?? 'Menu not found'}</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PublicMenuPage
                signedInUser={signedInUser}
                publicMenu={publicMenu}
                searchParameters={searchParameters}
                allergies={allergies}
                stripePublishableKey={stripePublishableKey}
            />
        </>
    );
};

export default Index;
