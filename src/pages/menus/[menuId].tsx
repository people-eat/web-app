import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import { createContext, useState, type Context } from 'react';
import PublicMenuPage, { type PublicMenuPageProps } from '../../components/pages/publicMenu';
import { createApolloClient } from '../../data-source/createApolloClient';
import { GetPublicMenuPageDataDocument } from '../../data-source/generated/graphql';
import { type SignedInUser } from '../../shared-domain/SignedInUser';

export const PublicMenuPageContext: Context<{ signedInUser?: SignedInUser; setSignedInUser: (signedInUser?: SignedInUser) => void }> =
    createContext({ setSignedInUser: () => {} });

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const { menuId, address, latitude, longitude, adults, children, date } = query;

    if (typeof menuId !== 'string') throw new Error();

    const apolloClient = createApolloClient(req.headers.cookie);
    const { data } = await apolloClient.query({ query: GetPublicMenuPageDataDocument, variables: { menuId } });

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
                date: typeof date === 'string' ? moment(date).format('L') : moment().format('L'),
            },
            allergies,
            stripePublishableKey: data.stripePublishableKey,
        },
    };
};

const Index: NextPage<PublicMenuPageProps> = ({
    signedInUser: initialSignedInUser,
    publicMenu,
    searchParameters,
    allergies,
    stripePublishableKey,
}: PublicMenuPageProps & { signedInUser?: SignedInUser }) => {
    const [signedInUser, setSignedInUser] = useState<SignedInUser | undefined>(initialSignedInUser);

    return (
        <>
            <Head>
                <title>PeopleEat - {publicMenu?.title ?? 'Menu not found'}</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>
            <PublicMenuPageContext.Provider value={{ signedInUser, setSignedInUser }}>
                <PublicMenuPage
                    publicMenu={publicMenu}
                    searchParameters={searchParameters}
                    allergies={allergies}
                    stripePublishableKey={stripePublishableKey}
                />
            </PublicMenuPageContext.Provider>
        </>
    );
};

export default Index;
