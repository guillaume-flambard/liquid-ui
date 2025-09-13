import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LiquidCard } from './LiquidCard'

const meta = {
  title: 'Components/LiquidCard',
  component: LiquidCard,
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
  },
} satisfies Meta<typeof LiquidCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div style={{ padding: '2rem', minWidth: '300px' }}>
        <h2 style={{ margin: 0, marginBottom: '1rem', color: 'white' }}>Liquid Glass Card</h2>
        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)' }}>
          This is a beautiful glass card with Apple-style liquid glass effects.
          Hover over me to see the interactive effects!
        </p>
      </div>
    ),
  },
}

export const Frosted: Story = {
  args: {
    variant: 'frosted',
    intensity: 'regular',
    children: (
      <div style={{ padding: '2rem', minWidth: '300px' }}>
        <h3 style={{ margin: 0, marginBottom: '0.5rem', color: 'white' }}>Frosted Glass</h3>
        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)' }}>
          Classic frosted glass effect with blur and transparency.
        </p>
      </div>
    ),
  },
}

export const Clear: Story = {
  args: {
    variant: 'clear',
    opacity: 'light',
    children: (
      <div style={{ padding: '2rem', minWidth: '300px' }}>
        <h3 style={{ margin: 0, marginBottom: '0.5rem', color: 'white' }}>Clear Glass</h3>
        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)' }}>
          Minimal glass effect with high transparency.
        </p>
      </div>
    ),
  },
}

export const Aurora: Story = {
  args: {
    variant: 'aurora',
    intensity: 'strong',
    children: (
      <div style={{ padding: '2rem', minWidth: '300px' }}>
        <h3 style={{ margin: 0, marginBottom: '0.5rem', color: 'white' }}>Aurora Glass</h3>
        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)' }}>
          Dynamic aurora effect with color shifts and glow.
        </p>
      </div>
    ),
  },
}

export const Interactive: Story = {
  args: {
    interactive: true,
    hover: true,
    shadow: true,
    border: true,
    children: (
      <div style={{ padding: '2rem', minWidth: '300px' }}>
        <h3 style={{ margin: 0, marginBottom: '0.5rem', color: 'white' }}>Interactive Card</h3>
        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)' }}>
          Hover and move your mouse over this card to see interactive effects!
        </p>
      </div>
    ),
  },
}

export const NoEffects: Story = {
  args: {
    interactive: false,
    hover: false,
    shadow: false,
    border: false,
    children: (
      <div style={{ padding: '2rem', minWidth: '300px' }}>
        <h3 style={{ margin: 0, marginBottom: '0.5rem', color: 'white' }}>Static Card</h3>
        <p style={{ margin: 0, color: 'rgba(255, 255, 255, 0.9)' }}>
          No interactive effects, just pure glass aesthetics.
        </p>
      </div>
    ),
  },
}