import { useMutation, useQuery } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { createContext, useEffect, useState, type Context } from 'react';
import { HomePage } from '../components/pages/home/HomePage';
import PECheckbox from '../components/standard/checkbox/PECheckbox';
import HStack from '../components/utility/hStack/HStack';
import Spacer from '../components/utility/spacer/Spacer';
import { createApolloClient } from '../data-source/createApolloClient';
import {
    FindCurrentSessionDocument,
    GetHomePageDataDocumentDocument,
    UpdateSessionCookieSettingsDocument,
    type GetHomePageDataDocumentQuery,
    type SessionCookieSettingsInput,
} from '../data-source/generated/graphql';
import { type SignedInUser } from '../shared-domain/SignedInUser';

interface ServerSideProps {
    signedInUser: GetHomePageDataDocumentQuery['users']['signedInUser'];
    heroCooks: NonNullable<GetHomePageDataDocumentQuery['publicCooks']['findHeroes']>;
    heroMenus: NonNullable<GetHomePageDataDocumentQuery['publicMenus']['findHeroes']>;
    searchParameters: {
        location: {
            address: string;
            latitude: number;
            longitude: number;
        };
        adults: number;
        children: number;
        date: string;
    };
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);

    try {
        const { data } = await apolloClient.query({ query: GetHomePageDataDocumentDocument });

        return {
            props: {
                signedInUser: data.users.signedInUser,
                heroCooks: data.publicCooks.findHeroes,
                heroMenus: data.publicMenus.findHeroes,
                searchParameters: {
                    location: {
                        address: '',
                        latitude: 49,
                        longitude: 8,
                    },
                    adults: 4,
                    children: 0,
                    date: moment().add(14, 'days').format(moment.HTML5_FMT.DATE),
                },
            },
        };
    } catch (error) {
        // @todo: handle properly
        throw error;
    }
};

export const HomePageContext: Context<{ signedInUser?: SignedInUser }> = createContext({});

const Index: NextPage<ServerSideProps> = ({ signedInUser, searchParameters, heroCooks, heroMenus }) => {
    const [showCookieBanner, setShowCookieBanner] = useState(false);
    const [cookieSettings, setCookieSettings] = useState<SessionCookieSettingsInput>({
        sessionCookie: false,
        googleAnalytics: false,
    });

    const { data, loading, refetch } = useQuery(FindCurrentSessionDocument);
    const [updateCookieSettings] = useMutation(UpdateSessionCookieSettingsDocument);

    useEffect(() => {
        if (!data?.sessions.current?.cookieSettings && !loading) setShowCookieBanner(true);

        if (data?.sessions.current?.cookieSettings) {
            setShowCookieBanner(false);
            setCookieSettings({
                sessionCookie: data.sessions.current.cookieSettings.sessionCookie,
                googleAnalytics: data.sessions.current.cookieSettings.googleAnalytics,
            });
        }
    }, [data, loading]);

    return (
        <>
            <Head>
                <title>Koch für Zuhause | Privatkoch mieten | PeopleEat</title>
                <meta
                    name="description"
                    content="Finde einen Privatkoch in der Nähe für jeden Anlass bei dir Zuhause. Mache aus deinem nächsten Team-Event, Candle-Light-Dinner oder Geburtstagsfeier eine unvergessliche Experience."
                />
                <meta
                    name="keywords"
                    content="PeopleEat, Koch für Zuhause, Privatkoch, Koch mieten, Private Chef, Frankfurt, Hamburg, München, Köln, Berlin"
                />
                <link rel="alternate" href="https://people-eat.com/de/" hrefLang="x-default" />
                <link rel="alternate" href="https://people-eat.com/de/" hrefLang="de" />
                <link rel="alternate" href="https://people-eat.com/en/" hrefLang="en" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Script id="ga-script" strategy="lazyOnload">
                {`
                    (function(w,d,s,l,i) {
                        w[l] = w[l]||[];
                        w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
                        var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
                        j.async=true;
                        j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
                        f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-TZHTVCP');
                `}
            </Script>

            <noscript>
                <iframe
                    src="https://www.googletagmanager.com/ns.html?id=GTM-TZHTVCP"
                    height="0"
                    width="0"
                    style={{ display: 'none', visibility: 'hidden' }}
                ></iframe>
            </noscript>

            <HomePage
                signedInUser={signedInUser ?? undefined}
                heroCooks={heroCooks}
                heroMenus={heroMenus}
                searchParameters={searchParameters}
            />
            <Dialog open={showCookieBanner}>
                <DialogTitle>Privatsphäre-Einstellungen</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wir verwenden Cookies und ähnliche Technologien auf unserer Website und verarbeiten personenbezogene Daten von dir,
                        um Inhalte und Anzeigen zu personalisieren, Medien von Drittanbietern einzubinden oder Zugriffe auf unsere Website
                        zu analysieren. Die Datenverarbeitung kann auch erst in Folge gesetzter Cookies stattfinden. Wir teilen diese Daten
                        mit Dritten, die wir in den Privatsphäre-Einstellungen benennen.
                    </DialogContentText>
                    <Link href="data-privacy-policy" className="text-orange my-1" target="_blank">
                        Mehr erfahren
                    </Link>

                    <HStack style={{ alignItems: 'center', width: '100%' }}>
                        <PECheckbox
                            checked={cookieSettings.sessionCookie ?? false}
                            onCheckedChange={(): void =>
                                setCookieSettings({ ...cookieSettings, sessionCookie: !cookieSettings.sessionCookie })
                            }
                        />
                        Sitzungs-Cookies / Session-Cookies
                        <Spacer />
                    </HStack>
                    <HStack style={{ alignItems: 'center', width: '100%' }}>
                        <PECheckbox
                            checked={cookieSettings.googleAnalytics ?? false}
                            onCheckedChange={(): void =>
                                setCookieSettings({ ...cookieSettings, googleAnalytics: !cookieSettings.googleAnalytics })
                            }
                        />
                        Drittanbieter-Cookies
                        <Spacer />
                    </HStack>
                </DialogContent>
                <DialogActions style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
                    <Button
                        onClick={(): void => {
                            void updateCookieSettings({
                                variables: {
                                    request: {
                                        sessionCookie: false,
                                        googleAnalytics: false,
                                    },
                                },
                            }).then((result) => {
                                if (result.data?.sessions.success) setShowCookieBanner(false);
                                void refetch();
                            });
                        }}
                    >
                        Ablehnen
                    </Button>
                    <Button
                        onClick={(): void => {
                            void updateCookieSettings({
                                variables: {
                                    request: cookieSettings,
                                },
                            }).then((result) => {
                                if (result.data?.sessions.success) setShowCookieBanner(false);
                                void refetch();
                            });
                        }}
                    >
                        Auswahl akzeptieren
                    </Button>
                    <Button
                        variant="contained"
                        onClick={(): void => {
                            void updateCookieSettings({
                                variables: {
                                    request: {
                                        sessionCookie: true,
                                        googleAnalytics: true,
                                    },
                                },
                            }).then((result) => {
                                if (result.data?.sessions.success) setShowCookieBanner(false);
                                void refetch();
                            });
                        }}
                    >
                        Alle akzeptieren
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Index;
