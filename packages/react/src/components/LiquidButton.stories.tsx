import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LiquidButton } from './LiquidButton'

const meta = {
  title: 'Components/LiquidButton',
  component: LiquidButton,
  parameters: {
    layout: 'centered',
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
          value: '#f5f5f5',
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['frosted', 'clear', 'aurora', 'solid'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    intensity: {
      control: { type: 'select' },
      options: ['subtle', 'regular', 'strong'],
    },
    opacity: {
      control: { type: 'select' },
      options: ['light', 'regular', 'medium', 'strong'],
    },
  },
} satisfies Meta<typeof LiquidButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Click Me',
  },
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
      <LiquidButton size="sm">Small</LiquidButton>
      <LiquidButton size="md">Medium</LiquidButton>
      <LiquidButton size="lg">Large</LiquidButton>
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <LiquidButton variant="frosted">Frosted</LiquidButton>
      <LiquidButton variant="clear">Clear</LiquidButton>
      <LiquidButton variant="aurora">Aurora</LiquidButton>
      <LiquidButton variant="solid">Solid</LiquidButton>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <LiquidButton 
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 0L10.3 5.6L16 6.4L12 10.3L12.9 16L8 13.1L3.1 16L4 10.3L0 6.4L5.7 5.6L8 0Z"/>
          </svg>
        }
      >
        Favorite
      </LiquidButton>
      <LiquidButton 
        rightIcon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M5 3l6 5-6 5V3z"/>
          </svg>
        }
      >
        Play
      </LiquidButton>
      <LiquidButton 
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 1v7h7a7 7 0 11-7-7z"/>
          </svg>
        }
        rightIcon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M11 8l-4 4-1.5-1.5L8 8 5.5 5.5 7 4l4 4z"/>
          </svg>
        }
      >
        Analytics
      </LiquidButton>
    </div>
  ),
}

export const Loading: Story = {
  args: {
    loading: true,
    children: 'Processing...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled',
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: 'Full Width Button',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

export const Interactive: Story = {
  args: {
    children: 'Hover Me!',
    onClick: () => alert('Button clicked!'),
  },
}