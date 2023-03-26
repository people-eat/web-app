import { ApolloClient, InMemoryCache, type NormalizedCacheObject } from '@apollo/client';

export default function createApolloClient(uri: string): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        uri,
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: 'no-cache',
            },
        },
    });
}
