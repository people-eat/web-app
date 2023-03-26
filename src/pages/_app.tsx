import { ThemeProvider, createTheme, type Theme } from '@mui/material';
import { type AppType } from 'next/dist/shared/lib/utils';

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
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default PeopleEatApp;
