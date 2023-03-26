import { ApolloProvider } from '@apollo/client';
import { type AppType } from 'next/dist/shared/lib/utils';
import apolloClient from '../data-source/apolloClient';

import '~/styles/globals.css';

const PeopleEatApp: AppType = ({ Component, pageProps }) => {
    return (
        <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
        </ApolloProvider>
    );
};

export default PeopleEatApp;
