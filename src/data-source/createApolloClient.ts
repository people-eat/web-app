import { ApolloClient, InMemoryCache, split, type NormalizedCacheObject } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';

export function createComplexApolloClient(httpUri: string, wsUri: string): ApolloClient<NormalizedCacheObject> {
    const httpLink = createUploadLink({ uri: httpUri, headers: { 'Apollo-Require-Preflight': 'true' }, credentials: 'include' });

    const isBrowser = typeof window !== 'undefined';

    if (!isBrowser) {
        return new ApolloClient({
            cache: new InMemoryCache(),
            defaultOptions: {
                watchQuery: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'ignore',
                },
                query: {
                    fetchPolicy: 'no-cache',
                    errorPolicy: 'all',
                },
            },
            link: httpLink,
        });
    }

    const wsLink = new GraphQLWsLink(createClient({ url: wsUri }));

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            console.log({ useWs: definition.kind === 'OperationDefinition' && definition.operation === 'subscription' });
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLink,
    );

    return new ApolloClient({
        cache: new InMemoryCache(),
        defaultOptions: {
            watchQuery: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'ignore',
            },
            query: {
                fetchPolicy: 'no-cache',
                errorPolicy: 'all',
            },
        },
        link: splitLink,
    });
}

export function createApolloClient(cookieString?: string): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        uri: process.env.NEXT_PUBLIC_SERVER_URL,
        credentials: 'include',
        headers: { cookie: cookieString as string },
        cache: new InMemoryCache(),
        ssrMode: true,
    });
}
