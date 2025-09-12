import type { Meta, StoryObj } from '@storybook/react'
import { LiquidButton } from '@liquid-ui/react'
import React from 'react'

const meta = {
  title: 'Components/LiquidButton',
  component: LiquidButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Beautiful interactive button with liquid glass effects. Perfect for CTAs, form submissions, 
and any interactive element that needs to stand out with Apple-style glass aesthetics.

## Features

- **Glass Effects** - Beautiful transparency and blur effects
- **Interactive Physics** - Responsive to mouse interactions
- **Loading States** - Built-in loading spinner
- **Icons Support** - Left and right icon slots
- **Multiple Sizes** - Small, medium, and large variants
- **Full Width Option** - Responsive width handling
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size variant',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make button full width',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable button interaction',
    },
  },
} satisfies Meta<typeof LiquidButton>

export default meta
type Story = StoryObj<typeof meta>

// Icons for stories
const StarIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const ArrowIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
)

const DownloadIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
)

// Default story
export const Default: Story = {
  args: {
    children: 'Click Me',
    variant: 'frosted',
    intensity: 'regular',
    opacity: 'regular',
    size: 'md',
    interactive: true,
  },
}

// Size variants
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <LiquidButton {...args} size="sm">
        Small
      </LiquidButton>
      <LiquidButton {...args} size="md">
        Medium
      </LiquidButton>
      <LiquidButton {...args} size="lg">
        Large
      </LiquidButton>
    </div>
  ),
  args: {
    variant: 'frosted',
    intensity: 'regular',
    opacity: 'regular',
    interactive: true,
  },
}

// Variants showcase
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-4">
      <LiquidButton {...args} variant="frosted">
        Frosted
      </LiquidButton>
      <LiquidButton {...args} variant="clear">
        Clear
      </LiquidButton>
      <LiquidButton {...args} variant="tinted">
        Tinted
      </LiquidButton>
      <LiquidButton {...args} variant="dark">
        Dark
      </LiquidButton>
    </div>
  ),
  args: {
    size: 'md',
    intensity: 'regular',
    opacity: 'regular',
    interactive: true,
  },
}

// With icons
export const WithIcons: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      <LiquidButton {...args} leftIcon={StarIcon}>
        Left Icon
      </LiquidButton>
      <LiquidButton {...args} rightIcon={ArrowIcon}>
        Right Icon
      </LiquidButton>
      <LiquidButton {...args} leftIcon={DownloadIcon} rightIcon={ArrowIcon}>
        Both Icons
      </LiquidButton>
      <LiquidButton {...args} leftIcon={StarIcon} />
    </div>
  ),
  args: {
    variant: 'frosted',
    size: 'md',
    interactive: true,
  },
}

// Loading state
export const Loading: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <LiquidButton {...args} loading={false}>
        Normal State
      </LiquidButton>
      <LiquidButton {...args} loading={true}>
        Loading State
      </LiquidButton>
      <LiquidButton {...args} loading={true} leftIcon={StarIcon}>
        Loading with Icon
      </LiquidButton>
    </div>
  ),
  args: {
    variant: 'frosted',
    size: 'md',
    interactive: true,
  },
}

// Disabled state
export const Disabled: Story = {
  render: (args) => (
    <div className="flex gap-4">
      <LiquidButton {...args} disabled={false}>
        Enabled
      </LiquidButton>
      <LiquidButton {...args} disabled={true}>
        Disabled
      </LiquidButton>
      <LiquidButton {...args} disabled={true} leftIcon={StarIcon}>
        Disabled with Icon
      </LiquidButton>
    </div>
  ),
  args: {
    variant: 'frosted',
    size: 'md',
    interactive: true,
  },
}

// Full width
export const FullWidth: Story = {
  render: (args) => (
    <div className="w-80 space-y-4">
      <LiquidButton {...args} fullWidth>
        Full Width Button
      </LiquidButton>
      <LiquidButton {...args} fullWidth leftIcon={DownloadIcon}>
        Download File
      </LiquidButton>
      <LiquidButton {...args} fullWidth rightIcon={ArrowIcon}>
        Continue
      </LiquidButton>
    </div>
  ),
  args: {
    variant: 'frosted',
    size: 'md',
    interactive: true,
  },
}

// Interactive showcase
export const Interactive: Story = {
  args: {
    children: 'Hover Me!',
    variant: 'frosted',
    intensity: 'regular',
    opacity: 'regular',
    size: 'lg',
    interactive: true,
    leftIcon: StarIcon,
    className: 'px-8',
  },
}

// CTA Examples
export const CTAExamples: Story = {
  render: (args) => (
    <div className="space-y-6 max-w-sm">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Primary Actions</h3>
        <div className="space-y-2">
          <LiquidButton variant="tinted" size="lg" fullWidth rightIcon={ArrowIcon}>
            Get Started
          </LiquidButton>
          <LiquidButton variant="frosted" size="md" fullWidth leftIcon={DownloadIcon}>
            Download App
          </LiquidButton>
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Secondary Actions</h3>
        <div className="flex gap-2">
          <LiquidButton variant="clear" size="sm">
            Cancel
          </LiquidButton>
          <LiquidButton variant="clear" size="sm">
            Learn More
          </LiquidButton>
        </div>
      </div>
    </div>
  ),
  args: {
    interactive: true,
  },
}