import { ThemeProvider } from '@mui/material';
import type { Preview } from '@storybook/react';
import I18nProvider from 'next-translate/I18nProvider';
import React, { type ReactElement } from 'react';
import common from '../locales/en/common.json';
import { theme } from '../src/pages/_app';
import '../src/styles/globals.css';

export const decorators = [
    (Story: any): ReactElement => {
        return (
            <ThemeProvider theme={theme}>
                <I18nProvider lang={'en'} namespaces={{ common }}>
                    <Story />
                </I18nProvider>
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
