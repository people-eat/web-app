import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme, type Theme } from '@mui/material';
import { LocalizationProvider as MuiI18nProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { type AppType } from 'next/dist/shared/lib/utils';
import { useRouter } from 'next/router';
import apolloClient from '../data-source/apolloClient';

import 'moment/locale/de';
import 'moment/locale/fr';
import 'moment/locale/ru';
import '~/styles/globals.css';

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#FF6433',
            contrastText: 'white',
        },
    },
});

const PeopleEatApp: AppType = ({ Component, pageProps }) => {
    const { locale } = useRouter();

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <MuiI18nProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
                    <Component {...pageProps} />
                </MuiI18nProvider>
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default PeopleEatApp;
