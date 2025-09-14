/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    externalDir: true,
  },
  webpack: (config, { isServer }) => {
    // Handle monorepo module resolution
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }

    // Add monorepo packages to resolve paths
    config.resolve.alias = {
      ...config.resolve.alias,
      '@liquid-ui/core': require('path').resolve(__dirname, '../../packages/core/dist'),
      '@liquid-ui/react': require('path').resolve(__dirname, '../../packages/react/dist'),
    }

    return config
  },
}

module.exports = nextConfig