import type { NextConfig } from "next";
import path from "path";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // The site has two root layouts ((root) and [locale]), so there is no single
  // layout to compose a site-wide 404 from; global-not-found.tsx is that page,
  // exported as the 404.html GitHub Pages serves for any unknown URL.
  experimental: {
    globalNotFound: true,
  },
  basePath: '',
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, './src/app/[locale]/sections'),
      '@i18n': path.resolve(__dirname, './src/i18n'),
    };
    return config;
  },
};

export default withNextIntl(nextConfig);
