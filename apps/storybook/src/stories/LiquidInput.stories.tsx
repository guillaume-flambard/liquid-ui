import type { Meta, StoryObj } from '@storybook/react'
import { LiquidInput } from '@liquid-ui/react'

const meta = {
  title: 'Components/LiquidInput',
  component: LiquidInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
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
    label: 'Glass Input',
    placeholder: 'Type something...',
  },
}

export const Variants: Story = {
  args: {
    placeholder: 'Frosted input',
    variant: 'frosted',
  },
}