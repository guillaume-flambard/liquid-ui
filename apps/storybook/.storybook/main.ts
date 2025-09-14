import type { StorybookConfig } from '@storybook/react-webpack5'

const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  staticDirs: [],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true),
    },
  },
  webpackFinal: async (config) => {
    const path = require('path')
    
    // Handle path aliases for monorepo
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@liquid-ui/core': path.resolve(__dirname, '../../../packages/core/dist'),
        '@liquid-ui/react': path.resolve(__dirname, '../../../packages/react/dist'),
      }
    }
    
    // Add TypeScript support
    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
        exclude: /node_modules/,
      })
    }
    
    return config
  },
}

export default config