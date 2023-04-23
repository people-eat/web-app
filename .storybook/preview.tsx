import { ThemeProvider } from '@mui/material';
import { LocalizationProvider as MuiI18nProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import type { Preview } from '@storybook/react';
import moment from 'moment';
import I18nProvider from 'next-translate/I18nProvider';
import React, { type ReactElement } from 'react';
import common from '../locales/en/common.json';
import home from '../locales/en/home.json';
import { theme } from '../src/pages/_app';
import '../src/styles/globals.css';

export const decorators = [
    (Story: any): ReactElement => {
        moment.locale('en');
        return (
            <ThemeProvider theme={theme}>
                <MuiI18nProvider dateAdapter={AdapterMoment} adapterLocale={'en'}>
                    <I18nProvider lang={'en'} namespaces={{ common, home }}>
                        <Story />
                    </I18nProvider>
                </MuiI18nProvider>
            </ThemeProvider>
        );
    },
];

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
    },
};

export default preview;
