import { ApolloProvider } from '@apollo/client';
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

const PeopleEatApp: AppType = ({ Component, pageProps }) => {
    return (
        <ApolloProvider client={createApolloClient(process.env.NEXT_PUBLIC_SERVER_URL ?? '')}>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </ApolloProvider>
    );
};

export default PeopleEatApp;
