import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme, type Theme } from '@mui/material';
import { type AppType } from 'next/dist/shared/lib/utils';
import apolloClient from '../data-source/apolloClient';

import '~/styles/globals.css';

const PeopleEatApp: AppType = ({ Component, pageProps }) => {
    const theme: Theme = createTheme({
        palette: {
            primary: {
                main: '#FF6433',
            },
        },
    });

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default PeopleEatApp;
