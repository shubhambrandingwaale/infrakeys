
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [ "infrakeysapp.in" ]
    },

}

import { withSentryConfig } from "@sentry/nextjs";

const sentryExports = {
    ...nextConfig,

    sentry {
        // Sentry config
    }
};

const sentryWebpackPluginOptions = {
    // Sentry Webpack config
};

if (process.env.ENABLE_SENTRY) console.log("Building frontend with Sentry enabled...");

module.exports = process.env.ENABLE_SENTRY
    ? withSentryConfig(sentryExports, sentryWebpackPluginOptions)
    : nextConfig;

module.exports = nextConfig


