import type { Meta, StoryObj } from '@storybook/react'
import { LiquidCard } from '@liquid-ui/react'

const meta = {
  title: 'Components/LiquidCard',
  component: LiquidCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LiquidCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'This is a liquid glass card with smooth, Apple-style blur effects.',
    className: 'p-6 max-w-sm',
  },
}

export const Variants: Story = {
  args: {
    children: 'Frosted glass card',
    variant: 'frosted',
    className: 'p-6 max-w-sm',
  },
}