import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LiquidInput } from './LiquidInput'

const meta = {
  title: 'Components/LiquidInput',
  component: LiquidInput,
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
    intensity: {
      control: { type: 'select' },
      options: ['subtle', 'regular', 'strong'],
    },
    opacity: {
      control: { type: 'select' },
      options: ['light', 'regular', 'medium', 'strong'],
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
} satisfies Meta<typeof LiquidInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'your@email.com',
    type: 'email',
  },
}

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Your username must be unique',
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    error: 'Password must be at least 8 characters',
    value: '123',
  },
}

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <LiquidInput
        placeholder="Search..."
        leftIcon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="6" cy="6" r="5" fill="none" stroke="currentColor" strokeWidth="2"/>
            <path d="M10 10l4 4" stroke="currentColor" strokeWidth="2"/>
          </svg>
        }
      />
      <LiquidInput
        placeholder="Enter amount"
        type="number"
        leftIcon={<span style={{ color: 'rgba(255,255,255,0.7)' }}>$</span>}
        rightIcon={<span style={{ color: 'rgba(255,255,255,0.7)' }}>.00</span>}
      />
      <LiquidInput
        type="password"
        placeholder="Enter password"
        rightIcon={
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 2C3 2 0 8 0 8s3 6 8 6 8-6 8-6-3-6-8-6zm0 10c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"/>
            <circle cx="8" cy="8" r="2"/>
          </svg>
        }
      />
    </div>
  ),
}

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', minWidth: '300px' }}>
      <LiquidInput variant="frosted" placeholder="Frosted variant" />
      <LiquidInput variant="clear" placeholder="Clear variant" />
      <LiquidInput variant="aurora" placeholder="Aurora variant" />
      <LiquidInput variant="solid" placeholder="Solid variant" />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled input',
  },
}

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    placeholder: 'Full width input',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '400px' }}>
        <Story />
      </div>
    ),
  ],
}

export const CompleteForm: Story = {
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '1rem', 
      minWidth: '350px',
      padding: '2rem',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '16px',
      backdropFilter: 'blur(10px)',
    }}>
      <h3 style={{ margin: 0, color: 'white' }}>Sign Up</h3>
      <LiquidInput
        label="Full Name"
        placeholder="John Doe"
        required
      />
      <LiquidInput
        label="Email"
        type="email"
        placeholder="john@example.com"
        required
      />
      <LiquidInput
        label="Password"
        type="password"
        placeholder="Min 8 characters"
        helperText="Use a mix of letters, numbers and symbols"
        required
      />
      <LiquidInput
        label="Phone Number"
        type="tel"
        placeholder="+1 (555) 000-0000"
      />
    </div>
  ),
}