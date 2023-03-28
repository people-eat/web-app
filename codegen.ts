import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:4000/graphql',
    documents: ['src/data-source/queries/**/*.graphql'],
    hooks: { afterAllFileWrite: ['yarn format', 'yarn lint'] },
    generates: {
        './src/data-source/generated/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            },
            config: {
                typesPrefix: 'GQL',
                maybeValue: 'T | undefined',
                enumsAsTypes: true,
                scalars: {
                    Date: 'string',
                    DateTime: 'Date',
                    EmailAddress: 'string',
                    Latitude: 'number',
                    Longitude: 'number',
                    PhoneNumber: 'string',
                    UInt: 'number',
                    Url: 'string',
                    UUID: 'string',
                },
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
