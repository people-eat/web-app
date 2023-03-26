import { ApolloProvider, type ApolloClient, type NormalizedCacheObject } from '@apollo/client';
import { ThemeProvider, createTheme, type Theme } from '@mui/material';
import { type AppType } from 'next/dist/shared/lib/utils';
import createApolloClient from '../data-source/createApolloClient';

import '~/styles/globals.css';

export const theme: Theme = createTheme({
    palette: {
        primary: {
            main: '#FF6433',
            contrastText: 'white',
        },
    },
});

export const apolloClient: ApolloClient<NormalizedCacheObject> = createApolloClient(process.env.NEXT_PUBLIC_SERVER_URL ?? '');

const PeopleEatApp: AppType = ({ Component, pageProps }) => {
    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default PeopleEatApp;
