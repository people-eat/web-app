import { ThemeProvider } from '@mui/material';
import type { Preview } from '@storybook/react';
import moment from 'moment';
import I18nProvider from 'next-translate/I18nProvider';
import React, { type ReactElement } from 'react';
import commonGerman from '../locales/de/common.json';
import commonEnglish from '../locales/en/common.json';
import commonFrench from '../locales/fr/common.json';
import commonRussian from '../locales/ru/common.json';
import { theme } from '../src/pages/_app';
import '../src/styles/globals.css';

export const decorators = [
    (Story: any, context: any): ReactElement => {
        const language = context.globals.language;
        moment.locale(language);

        let nameSpaces = { common: commonEnglish };

        if (language === 'de') nameSpaces = { common: commonGerman };
        if (language === 'ru') nameSpaces = { common: commonRussian };
        if (language === 'fr') nameSpaces = { common: commonFrench };

        return (
            <ThemeProvider theme={theme}>
                <I18nProvider lang={language} namespaces={nameSpaces}>
                    <Story />
                </I18nProvider>
            </ThemeProvider>
        );
    },
];

const preview: Preview = {
    globalTypes: {
        language: {
            defaultValue: 'en',
            toolbar: {
                icon: 'globe',
                items: [
                    { value: 'de', right: '🇩🇪', title: 'German' },
                    { value: 'fr', right: '🇫🇷', title: 'French' },
                    { value: 'en', right: '🇺🇸', title: 'English' },
                    { value: 'ru', right: '🇷🇺', title: 'Russian' },
                ],
            },
        },
    },
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
