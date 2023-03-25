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
    locales: ["en"],
    defaultLocale: "en",
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default config;
