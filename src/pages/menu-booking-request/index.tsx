import { ApolloClient, InMemoryCache } from '@apollo/client';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import MenuBookingRequestPage, { type MenuBookingRequestPageProps } from '../../components/pages/menuBookingRequest';
import { GetMenuBookingRequestPageDataDocument } from '../../data-source/generated/graphql';

export const getServerSideProps: GetServerSideProps = async ({ query, req }) => {
    const { address, latitude, longitude, adults, children, date, menuId } = query;

    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetMenuBookingRequestPageDataDocument, variables: { menuId: menuId as string } });

    return {
        props: {
            signedInUser: data.users.signedInUser,
            menu: data.publicMenus.findOne,
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
            allergies: data.allergies.findAll,
            stripePublishableKey: data.stripePublishableKey,
        },
    };
};

const Index: NextPage<MenuBookingRequestPageProps> = ({ signedInUser, menu, searchParameters, allergies, stripePublishableKey }) => {
    return (
        <>
            <Head>
                <title>Menü Buchen| PeopleEat</title>

                <meta name="description" content="Privatkoch für Zuhause mieten" />
                <meta name="keywords" content="Menü buchen, Koch mieten" />
                <link rel="alternate" href="https://people-eat.com/menu-booking-request/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/menu-booking-request/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/menu-booking-request/" hrefLang="en" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MenuBookingRequestPage
                signedInUser={signedInUser}
                menu={menu}
                searchParameters={searchParameters}
                allergies={allergies}
                stripePublishableKey={stripePublishableKey}
            />
        </>
    );
};

export default Index;
