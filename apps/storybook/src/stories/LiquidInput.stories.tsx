import type { Meta, StoryObj } from '@storybook/react'
import { LiquidInput } from '@liquid-ui/react'
import React from 'react'

const meta = {
  title: 'Components/LiquidInput',
  component: LiquidInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Beautiful form input with liquid glass effects. Perfect for forms, search fields, and data entry 
with Apple-style transparency and interactive hover states.

## Features

- **Glass Effects** - Transparent background with blur effects
- **Label Support** - Floating labels with smooth animations
- **Error States** - Beautiful error styling with messages
- **Helper Text** - Additional context and guidance
- **Icons** - Left and right icon slots
- **Full Width** - Responsive width handling
- **Accessibility** - WCAG compliant with proper ARIA attributes
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Field label',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below field',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make input full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable input',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
  },
} satisfies Meta<typeof LiquidInput>

export default meta
type Story = StoryObj<typeof meta>

// Icons for stories
const EmailIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
  </svg>
)

const LockIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
)

const SearchIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const EyeIcon = (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

// Default story
export const Default: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    variant: 'frosted',
    intensity: 'subtle',
    opacity: 'light',
    interactive: true,
  },
}

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Choose a username',
    helperText: 'Must be at least 3 characters long and unique',
    variant: 'frosted',
    intensity: 'subtle',
    opacity: 'light',
    interactive: true,
  },
}

// Error state
export const ErrorState: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email',
    error: 'Please enter a valid email address',
    defaultValue: 'invalid-email',
    variant: 'frosted',
    intensity: 'subtle',
    opacity: 'light',
    interactive: true,
  },
}

// With icons
export const WithIcons: Story = {
  render: (args) => (
    <div className="space-y-6 w-80">
      <LiquidInput
        {...args}
        label="Email"
        placeholder="Enter your email"
        type="email"
        leftIcon={EmailIcon}
      />
      
      <LiquidInput
        {...args}
        label="Password"
        placeholder="Enter your password"
        type="password"
        leftIcon={LockIcon}
        rightIcon={EyeIcon}
      />
      
      <LiquidInput
        {...args}
        label="Search"
        placeholder="Search products..."
        leftIcon={SearchIcon}
      />
    </div>
  ),
  args: {
    variant: 'frosted',
    intensity: 'subtle',
    opacity: 'light',
    interactive: true,
  },
}

// Input types
export const InputTypes: Story = {
  render: (args) => (
    <div className="space-y-4 w-80">
      <LiquidInput
        {...args}
        label="Text Input"
        placeholder="Enter text"
        type="text"
      />
      
      <LiquidInput
        {...args}
        label="Email Input"
        placeholder="Enter email"
        type="email"
        leftIcon={EmailIcon}
      />
      
      <LiquidInput
        {...args}
        label="Password Input"
        placeholder="Enter password"
        type="password"
        leftIcon={LockIcon}
      />
      
      <LiquidInput
        {...args}
        label="Number Input"
        placeholder="Enter number"
        type="number"
      />
      
      <LiquidInput
        {...args}
        label="Phone Input"
        placeholder="+1 (555) 000-0000"
        type="tel"
      />
      
      <LiquidInput
        {...args}
        label="URL Input"
        placeholder="https://example.com"
        type="url"
      />
    </div>
  ),
  args: {
    variant: 'frosted',
    intensity: 'subtle',
    opacity: 'light',
    interactive: true,
    fullWidth: true,
  },
}

// Variants showcase
export const Variants: Story = {
  render: (args) => (
    <div className="space-y-6 w-80">
      <LiquidInput
        {...args}
        variant="clear"
        label="Clear Variant"
        placeholder="Ultra-minimal design"
      />
      
      <LiquidInput
        {...args}
        variant="frosted"
        label="Frosted Variant"
        placeholder="Classic frosted glass"
      />
      
      <LiquidInput
        {...args}
        variant="tinted"
        label="Tinted Variant"
        placeholder="Subtle blue tint"
      />
      
      <LiquidInput
        {...args}
        variant="dark"
        label="Dark Variant"
        placeholder="Dark glass effect"
      />
    </div>
  ),
  args: {
    intensity: 'subtle',
    opacity: 'light',
    interactive: true,
    fullWidth: true,
  },
}

// Disabled state
export const Disabled: Story = {
  render: (args) => (
    <div className="space-y-4 w-80">
      <LiquidInput
        {...args}
        disabled={false}
        label="Enabled Input"
        placeholder="You can type here"
      />
      
      <LiquidInput
        {...args}
        disabled={true}
        label="Disabled Input"
        placeholder="Cannot type here"
        defaultValue="Read-only value"
      />
      
      <LiquidInput
        {...args}
        disabled={true}
        label="Disabled with Icon"
        placeholder="Disabled input"
        leftIcon={EmailIcon}
      />
    </div>
  ),
  args: {
    variant: 'frosted',
    intensity: 'subtle',
    opacity: 'light',
    interactive: true,
    fullWidth: true,
  },
}

// Form example
export const FormExample: Story = {
  render: (args) => (
    <div className="space-y-6 w-96 p-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Create Account</h2>
        <p className="text-gray-300">Join thousands of developers using Liquid UI</p>
      </div>
      
      <LiquidInput
        {...args}
        label="Full Name"
        placeholder="John Doe"
        required
      />
      
      <LiquidInput
        {...args}
        label="Email Address"
        placeholder="john@example.com"
        type="email"
        leftIcon={EmailIcon}
        helperText="We'll never share your email with anyone"
        required
      />
      
      <LiquidInput
        {...args}
        label="Password"
        placeholder="Create a strong password"
        type="password"
        leftIcon={LockIcon}
        rightIcon={EyeIcon}
        helperText="Must be at least 8 characters with numbers and symbols"
        required
      />
      
      <LiquidInput
        {...args}
        label="Company (Optional)"
        placeholder="Your company name"
      />
      
      <div className="pt-4">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors">
          Create Account
        </button>
      </div>
    </div>
  ),
  args: {
    variant: 'frosted',
    intensity: 'subtle',
    opacity: 'light',
    interactive: true,
    fullWidth: true,
  },
}

// Focus states demonstration
export const FocusDemo: Story = {
  render: (args) => (
    <div className="space-y-4 w-80">
      <div className="text-sm text-gray-300 mb-4">
        Click on the inputs below to see focus states:
      </div>
      
      <LiquidInput
        {...args}
        label="Normal Focus"
        placeholder="Click to focus"
      />
      
      <LiquidInput
        {...args}
        label="With Error Focus"
        placeholder="Click to focus"
        error="This field has an error"
      />
      
      <LiquidInput
        {...args}
        label="With Icon Focus"
        placeholder="Click to focus"
        leftIcon={SearchIcon}
      />
    </div>
  ),
  args: {
    variant: 'frosted',
    intensity: 'subtle',
    opacity: 'light',
    interactive: true,
    fullWidth: true,
  },
}