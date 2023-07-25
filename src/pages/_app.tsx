import { ApolloProvider, type ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import { ThemeProvider, createTheme, type Theme } from '@mui/material';
import { LocalizationProvider as MuiI18nProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';
import { type AppPropsType, type AppType } from 'next/dist/shared/lib/utils';
import createApolloClient from '../data-source/createApolloClient';

import 'moment/locale/de';
import 'moment/locale/fr';
import 'moment/locale/ru';
import Script from 'next/script';
import '../styles/globals.css';

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#FF6433',
            contrastText: 'white',
        },
    },
});

export const apolloClient: ApolloClient<NormalizedCacheObject> = createApolloClient(process.env.NEXT_PUBLIC_SERVER_URL ?? '');

const PeopleEatApp: AppType = ({ Component, pageProps, router }: AppPropsType) => {
    moment.locale(router.locale);

    return (
        <>
            <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=G-165LKCGVJJ`} />

            <Script id="ga-script" strategy="lazyOnload">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-165LKCGVJJ', {
                    page_path: window.location.pathname,
                    });
                `}
            </Script>
            <ApolloProvider client={apolloClient}>
                <ThemeProvider theme={theme}>
                    <MuiI18nProvider dateAdapter={AdapterMoment} adapterLocale={router.locale}>
                        <Component {...pageProps} />
                    </MuiI18nProvider>
                </ThemeProvider>
            </ApolloProvider>
        </>
    );
};

export default PeopleEatApp;
