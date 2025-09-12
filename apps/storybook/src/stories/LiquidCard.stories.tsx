import type { Meta, StoryObj } from '@storybook/react'
import { LiquidCard } from '@liquid-ui/react'
import React from 'react'

const meta = {
  title: 'Components/LiquidCard',
  component: LiquidCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
The signature Liquid UI component with Apple-style glass effects. LiquidCard provides beautiful transparency, 
blur effects, and interactive physics that respond to mouse movement.

## Features

- **Apple-Perfect Glass Effects** - Authentic liquid glass with real physics
- **Interactive Physics** - Mouse-responsive refraction and transforms
- **Performance Optimized** - 60fps animations with minimal overhead
- **Accessible** - Full keyboard navigation and screen reader support
- **Customizable** - Extensive theming and configuration options
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['clear', 'frosted', 'tinted', 'dark'],
      description: 'Visual style variant of the glass effect',
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
    hover: {
      control: 'boolean',
      description: 'Enable hover transform effects',
    },
    shadow: {
      control: 'boolean',
      description: 'Show shadow effects',
    },
    border: {
      control: 'boolean',
      description: 'Show glass border',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof LiquidCard>

export default meta
type Story = StoryObj<typeof meta>

// Default story
export const Default: Story = {
  args: {
    variant: 'frosted',
    intensity: 'regular',
    opacity: 'regular',
    interactive: true,
    hover: true,
    shadow: true,
    border: true,
    className: 'p-6 max-w-sm',
    children: (
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-white">
          Liquid Glass Card
        </h3>
        <p className="text-gray-200">
          This is a beautiful glass card with Apple-style liquid effects. 
          Move your mouse around to see the interactive physics in action.
        </p>
      </div>
    ),
  },
}

// Variants showcase
export const Variants: Story = {
  render: (args) => (
    <div className="grid grid-cols-2 gap-6">
      {(['clear', 'frosted', 'tinted', 'dark'] as const).map((variant) => (
        <LiquidCard
          key={variant}
          {...args}
          variant={variant}
          className="p-6 max-w-sm"
        >
          <div className="space-y-2">
            <h4 className="text-lg font-medium text-white capitalize">
              {variant} Glass
            </h4>
            <p className="text-sm text-gray-200">
              {variant === 'clear' && 'Ultra-minimal with pure transparency'}
              {variant === 'frosted' && 'Classic frosted glass effect'}
              {variant === 'tinted' && 'Subtle blue tint overlay'}
              {variant === 'dark' && 'Dark glass with depth'}
            </p>
          </div>
        </LiquidCard>
      ))}
    </div>
  ),
  args: {
    intensity: 'regular',
    opacity: 'regular',
    interactive: true,
    hover: true,
    shadow: true,
    border: true,
  },
}

// Intensity levels
export const Intensities: Story = {
  render: (args) => (
    <div className="grid grid-cols-3 gap-6">
      {(['subtle', 'regular', 'strong'] as const).map((intensity) => (
        <LiquidCard
          key={intensity}
          {...args}
          intensity={intensity}
          className="p-6 max-w-sm"
        >
          <div className="space-y-2">
            <h4 className="text-lg font-medium text-white capitalize">
              {intensity} Blur
            </h4>
            <p className="text-sm text-gray-200">
              Blur intensity: {intensity}
            </p>
            <div className="text-xs text-gray-300">
              {intensity === 'subtle' && '5px blur - Light effect'}
              {intensity === 'regular' && '12px blur - Standard Apple'}
              {intensity === 'strong' && '20px blur - Maximum drama'}
            </div>
          </div>
        </LiquidCard>
      ))}
    </div>
  ),
  args: {
    variant: 'frosted',
    opacity: 'regular',
    interactive: true,
    hover: true,
    shadow: true,
    border: true,
  },
}

// Interactive showcase
export const Interactive: Story = {
  args: {
    variant: 'frosted',
    intensity: 'regular',
    opacity: 'regular',
    interactive: true,
    hover: true,
    shadow: true,
    border: true,
    className: 'p-8 max-w-md cursor-pointer',
    children: (
      <div className="text-center space-y-4">
        <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center">
          <svg className="w-6 h-6 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">
          Interactive Physics
        </h3>
        <p className="text-gray-200">
          Hover over this card and move your mouse around. Watch as the card responds 
          with realistic physics-based transforms following Apple's liquid glass formula.
        </p>
        <div className="text-sm text-blue-300">
          Formula: 1.0 - normalizedDist²
        </div>
      </div>
    ),
  },
}

// Non-interactive
export const Static: Story = {
  args: {
    variant: 'frosted',
    intensity: 'regular',
    opacity: 'regular',
    interactive: false,
    hover: false,
    shadow: true,
    border: true,
    className: 'p-6 max-w-sm',
    children: (
      <div className="space-y-3">
        <h3 className="text-lg font-medium text-white">
          Static Glass Card
        </h3>
        <p className="text-sm text-gray-200">
          This card has no interactive effects - perfect for content that doesn't need hover states.
        </p>
      </div>
    ),
  },
}

// Complex content
export const WithComplexContent: Story = {
  args: {
    variant: 'frosted',
    intensity: 'regular',
    opacity: 'regular',
    interactive: true,
    hover: true,
    shadow: true,
    border: true,
    className: 'p-6 max-w-md',
    children: (
      <article className="space-y-4">
        <header className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <div>
            <h3 className="font-semibold text-white">Sarah Johnson</h3>
            <p className="text-xs text-gray-400">Product Designer</p>
          </div>
        </header>
        
        <p className="text-sm text-gray-200">
          "Liquid UI has revolutionized how we build interfaces. The glass effects are 
          pixel-perfect and the developer experience is incredible."
        </p>
        
        <footer className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex gap-1">
            {[1,2,3,4,5].map((i) => (
              <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <span className="text-xs text-gray-400">2 days ago</span>
        </footer>
      </article>
    ),
  },
}