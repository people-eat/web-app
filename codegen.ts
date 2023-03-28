import { type CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://api-integration-people-eat.cem-yilmaz.de/graphql',
    documents: ['src/data-source/queries/**/*.graphql'],
    hooks: { afterAllFileWrite: ['yarn format', 'yarn lint'] },
    generates: {
        './src/data-source/generated/': {
            preset: 'client',
            plugins: [],
            presetConfig: {
                gqlTagName: 'gql',
            },
        },
    },
    ignoreNoDocuments: true,
};

export default config;
