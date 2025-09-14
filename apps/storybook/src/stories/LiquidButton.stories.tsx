import type { Meta, StoryObj } from '@storybook/react'
import { LiquidButton } from '@liquid-ui/react'

const meta = {
  title: 'Components/LiquidButton',
  component: LiquidButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LiquidButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Variants: Story = {
  args: {
    children: 'Glass Button',
    variant: 'frosted',
  },
}