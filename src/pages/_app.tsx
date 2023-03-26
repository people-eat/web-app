import { ThemeProvider, createTheme, type Theme } from '@mui/material';
import { type AppType } from 'next/dist/shared/lib/utils';

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
        <ThemeProvider theme={theme}>
            <Component {...pageProps} />
        </ThemeProvider>
    );
};

export default PeopleEatApp;
