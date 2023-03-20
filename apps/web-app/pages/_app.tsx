import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import client from '../apollo-client';
import { Countries } from '../components/Countries';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <ApolloProvider client={client}>
                <Head>
                    <title>Welcome to web-app!</title>
                </Head>
                <main className="app">
                    <Component {...pageProps} />
                    <Countries />
                </main>
            </ApolloProvider>
        </>
    );
}

export default CustomApp;
