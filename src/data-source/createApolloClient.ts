import { ApolloClient, InMemoryCache, split, type NormalizedCacheObject } from '@apollo/client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createUploadLink } from 'apollo-upload-client';
import { createClient } from 'graphql-ws';

export default function createApolloClient(httpUri: string, wsUri: string): ApolloClient<NormalizedCacheObject> {
    const httpLink = createUploadLink({ uri: httpUri, headers: { 'Apollo-Require-Preflight': 'true' }, credentials: 'include' });

    const isBrowser = typeof window !== 'undefined';

    if (!isBrowser) {
        return new ApolloClient({
            cache: new InMemoryCache(),
            defaultOptions: {
                query: {
                    fetchPolicy: 'no-cache',
                },
            },
            link: httpLink,
        });
    }

    const wsLink = new GraphQLWsLink(createClient({ url: wsUri }));

    const splitLink = split(
        ({ query }) => {
            const definition = getMainDefinition(query);
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
        },
        wsLink,
        httpLink,
    );

    return new ApolloClient({
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: 'no-cache',
            },
        },
        link: splitLink,
    });
}
