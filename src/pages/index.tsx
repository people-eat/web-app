import { ApolloClient, InMemoryCache, useMutation, useQuery } from '@apollo/client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import moment from 'moment';
import { type GetServerSideProps, type NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { createContext, useEffect, useState, type Context } from 'react';
import HomePage, { type HomePageProps } from '../components/pages/home';
import PECheckbox from '../components/standard/checkbox/PECheckbox';
import HStack from '../components/utility/hStack/HStack';
import Spacer from '../components/utility/spacer/Spacer';
import {
    FindCurrentSessionDocument,
    GetProfileQueryDocument,
    UpdateSessionCookieSettingsDocument,
    type SessionCookieSettingsInput,
} from '../data-source/generated/graphql';
import useResponsive from '../hooks/useResponsive';
import { type SignedInUser } from '../shared-domain/SignedInUser';

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { data } = await new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: context.req.headers.cookie as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    }).query({ query: GetProfileQueryDocument });

    return {
        props: {
            signedInUser: data.users.me,
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
};

export const HomePageContext: Context<{ signedInUser?: SignedInUser }> = createContext({});

const Index: NextPage<HomePageProps> = ({ signedInUser, searchParameters }: HomePageProps) => {
    const [showCookieBanner, setShowCookieBanner] = useState(false);
    const [cookieSettings, setCookieSettings] = useState<SessionCookieSettingsInput>({
        sessionCookie: false,
        googleAnalytics: false,
    });

    const { data, loading } = useQuery(FindCurrentSessionDocument);
    const { isMobile } = useResponsive();

    useEffect(() => {
        if (!data?.sessions.current?.cookieSettings && !loading) setShowCookieBanner(true);

        if (data?.sessions.current?.cookieSettings) {
            setCookieSettings({
                sessionCookie: data.sessions.current.cookieSettings.sessionCookie,
                googleAnalytics: data.sessions.current.cookieSettings.googleAnalytics,
            });
        }
    }, [data, loading]);

    const [updateCookieSettings] = useMutation(UpdateSessionCookieSettingsDocument);

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

            <HomePageContext.Provider value={{ signedInUser }}>
                <HomePage signedInUser={signedInUser} searchParameters={searchParameters} />
            </HomePageContext.Provider>

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
                <DialogActions style={{ padding: isMobile ? '24px' : '10px' }}>
                    <Button
                        onClick={(): void => {
                            void updateCookieSettings({
                                variables: {
                                    request: {
                                        sessionCookie: false,
                                        googleAnalytics: false,
                                    },
                                },
                            }).then((result) => result.data?.sessions.success && setShowCookieBanner(false));
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
                            }).then((result) => result.data?.sessions.success && setShowCookieBanner(false));
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
                            }).then((result) => result.data?.sessions.success && setShowCookieBanner(false));
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
