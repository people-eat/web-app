/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: true,

    pageExtensions: ['tsx'],

    /**
     * If you have the "experimental: { appDir: true }" setting enabled, then you
     * must comment the below `i18n` config out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
        locales: ['de', 'fr', 'en', 'ru'],
        defaultLocale: 'en',
    },

    eslint: {
        ignoreDuringBuilds: true,
    },

    images: {
        dangerouslyAllowSVG: true,
    },
};

export default config;
