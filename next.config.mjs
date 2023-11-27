import nextTranslate from 'next-translate-plugin';

/** @type {import("next").NextConfig} */
const config = {
    reactStrictMode: false,

    pageExtensions: ['tsx'],

    /**
     * If you have the "experimental: { appDir: true }" setting enabled, then you
     * must comment the below `i18n` config out.
     *
     * @see https://github.com/vercel/next.js/issues/41980
     */
    i18n: {
        locales: ['de', 'en'],
        defaultLocale: 'de',
    },

    eslint: {
        ignoreDuringBuilds: true,
    },

    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**',
            },
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    rewrites: async () => [
        {
            source: '/google-places-api/:path*',
            destination: 'https://maps.googleapis.com/maps/api/:path*',
        },
    ],

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    redirects: async () => [
        {
            source: '/koch-finden',
            destination: '/global-booking-request',
            permanent: true,
        },
        {
            source: '/individual-request',
            destination: '/global-booking-request',
            permanent: true,
        },
        {
            source: '/individuelle-anfrage',
            destination: '/global-booking-request',
            permanent: true,
        },
        {
            source: '/impressum',
            destination: '/imprint',
            permanent: true,
        },
        {
            source: '/privatkoch-werden',
            destination: '/how-to-chef',
            permanent: true,
        },
        {
            source: '/datenschutz',
            destination: '/data-privacy-policy',
            permanent: true,
        },
    ],
};

export default nextTranslate(config);
