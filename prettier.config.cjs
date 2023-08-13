/** @type {import("prettier").Config} */
const config = {
    plugins: [require.resolve('prettier-plugin-tailwindcss')],
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    printWidth: 140,
    overrides: [
        {
            files: ['*.yaml', '*.yml'],
            options: {
                tabWidth: 2,
            },
        },
    ],
    endOfLine: 'auto',
};

module.exports = config;
