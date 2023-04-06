// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

/** @type {import("eslint").Linter.Config} */
const config = {
    overrides: [
        {
            extends: ['plugin:@typescript-eslint/recommended-requiring-type-checking'],
            files: ['*.ts', '*.tsx'],
            parserOptions: {
                project: path.join(__dirname, 'tsconfig.json'),
            },
        },
    ],
    ignorePatterns: ['next-env.d.ts', 'server.js', 'src/data-source/generated/*'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: path.join(__dirname, 'tsconfig.json'),
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'next/core-web-vitals',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        'plugin:storybook/recommended',
    ],
    rules: {
        '@typescript-eslint/consistent-type-imports': [
            'warn',
            {
                prefer: 'type-imports',
                fixStyle: 'inline-type-imports',
            },
        ],
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
        'no-console': 'warn',
        'no-alert': 'error',
        'no-return-await': 'error',
        eqeqeq: 'error',
        yoda: 'error',
        curly: ['error', 'multi-or-nest'],
        'max-depth': ['error', 3],
        'max-statements': ['warn', 16],
        'no-else-return': 'warn',
        'no-shadow': 'off',
        'no-duplicate-imports': 'error',
        'spaced-comment': 'error',
        'no-inline-comments': 'error',
        'import/no-named-as-default-member': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            { selector: 'variableLike', modifiers: ['unused'], leadingUnderscore: 'require', format: ['camelCase'] },
        ],
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/array-type': 'error',
        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-floating-promises': 'error',
        '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
        'import/no-extraneous-dependencies': 'error',
    },
};
module.exports = config;
