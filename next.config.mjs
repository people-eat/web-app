import nextTranslate from 'next-translate-plugin';

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

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    rewrites: async () => [
        {
            source: '/google-places-api/:path*',
            destination: 'https://maps.googleapis.com/maps/api/:path*',
        },
    ],
};

export default nextTranslate(config);
