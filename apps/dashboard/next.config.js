const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.DASHBOARD_ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
module.exports = withBundleAnalyzer( {
  reactStrictMode: true,
  compress: true,
  images: { domains: ['cdn.discordapp.com','localhost', 'https://gardentify-api.onrender.com'] },
});
