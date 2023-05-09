import { ApolloClient, InMemoryCache, type NormalizedCacheObject } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

export default function createApolloClient(uri: string): ApolloClient<NormalizedCacheObject> {
    return new ApolloClient({
        cache: new InMemoryCache(),
        defaultOptions: {
            query: {
                fetchPolicy: 'no-cache',
            },
        },
        link: createUploadLink({
            uri,
            headers: { 'Apollo-Require-Preflight': 'true' },
            credentials: 'include',
        }),
    });
}
