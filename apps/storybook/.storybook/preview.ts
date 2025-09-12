import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'gradient',
      values: [
        {
          name: 'gradient',
          value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        {
          name: 'dark',
          value: '#1a1a1a',
        },
        {
          name: 'light',
          value: '#ffffff',
        },
        {
          name: 'blue-gradient',
          value: 'linear-gradient(to bottom right, #1e3a8a, #7c3aed, #4338ca)',
        },
      ],
    },
    layout: 'centered',
    docs: {
      toc: true,
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['clear', 'frosted', 'tinted', 'dark'],
      description: 'Glass variant style',
    },
    intensity: {
      control: 'select',
      options: ['subtle', 'regular', 'strong'],
      description: 'Blur intensity level',
    },
    opacity: {
      control: 'select',
      options: ['light', 'regular', 'medium', 'strong'],
      description: 'Glass opacity level',
    },
    interactive: {
      control: 'boolean',
      description: 'Enable interactive physics effects',
    },
    adaptiveOpacity: {
      control: 'boolean',
      description: 'Adapt opacity based on background',
    },
    environmentBlending: {
      control: 'boolean',
      description: 'Enable environment blending effects',
    },
  },
}

export default preview