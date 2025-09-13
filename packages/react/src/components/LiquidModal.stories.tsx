import React, { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { LiquidModal } from './LiquidModal'
import { LiquidButton } from './LiquidButton'

const meta = {
  title: 'Components/LiquidModal',
  component: LiquidModal,
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
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
} satisfies Meta<typeof LiquidModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <LiquidButton onClick={() => setIsOpen(true)}>
          Open Modal
        </LiquidButton>
        <LiquidModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="Default Modal"
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            This is a beautiful liquid glass modal with smooth animations and backdrop blur.
          </p>
        </LiquidModal>
      </>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [openSize, setOpenSize] = useState<string | null>(null)
    const sizes = ['sm', 'md', 'lg', 'xl'] as const
    
    return (
      <>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {sizes.map(size => (
            <LiquidButton key={size} onClick={() => setOpenSize(size)}>
              Open {size.toUpperCase()}
            </LiquidButton>
          ))}
        </div>
        {sizes.map(size => (
          <LiquidModal
            key={size}
            open={openSize === size}
            onClose={() => setOpenSize(null)}
            title={`${size.toUpperCase()} Modal`}
            size={size}
          >
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              This is a {size} sized modal. Notice how the width changes based on the size prop.
            </p>
          </LiquidModal>
        ))}
      </>
    )
  },
}

export const WithoutCloseButton: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <LiquidButton onClick={() => setIsOpen(true)}>
          Open Modal
        </LiquidButton>
        <LiquidModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="No Close Button"
          showCloseButton={false}
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            This modal doesn't show a close button. Click outside or press ESC to close.
          </p>
        </LiquidModal>
      </>
    )
  },
}

export const PreventBackdropClose: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <LiquidButton onClick={() => setIsOpen(true)}>
          Open Modal
        </LiquidButton>
        <LiquidModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="Persistent Modal"
          closeOnBackdropClick={false}
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            This modal won't close when you click the backdrop. You must use the close button or ESC key.
          </p>
        </LiquidModal>
      </>
    )
  },
}

export const Centered: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <LiquidButton onClick={() => setIsOpen(true)}>
          Open Centered Modal
        </LiquidButton>
        <LiquidModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="Centered Modal"
          centered
        >
          <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            This modal is perfectly centered on the screen.
          </p>
        </LiquidModal>
      </>
    )
  },
}

export const ComplexContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <LiquidButton onClick={() => setIsOpen(true)}>
          Open Complex Modal
        </LiquidButton>
        <LiquidModal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          title="Subscribe to Newsletter"
          size="lg"
        >
          <div style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Stay updated with our latest news and updates. We promise not to spam!
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  padding: '0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  fontSize: '1rem',
                  backdropFilter: 'blur(10px)',
                }}
              />
              
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <input type="checkbox" id="terms" />
                <label htmlFor="terms" style={{ fontSize: '0.9rem' }}>
                  I agree to the terms and conditions
                </label>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <LiquidButton fullWidth variant="aurora">
                  Subscribe
                </LiquidButton>
                <LiquidButton fullWidth variant="clear" onClick={() => setIsOpen(false)}>
                  Cancel
                </LiquidButton>
              </div>
            </div>
          </div>
        </LiquidModal>
      </>
    )
  },
}

export const Variants: Story = {
  render: () => {
    const [openVariant, setOpenVariant] = useState<string | null>(null)
    const variants = ['frosted', 'clear', 'aurora', 'solid'] as const
    
    return (
      <>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {variants.map(variant => (
            <LiquidButton key={variant} variant={variant} onClick={() => setOpenVariant(variant)}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)} Modal
            </LiquidButton>
          ))}
        </div>
        {variants.map(variant => (
          <LiquidModal
            key={variant}
            open={openVariant === variant}
            onClose={() => setOpenVariant(null)}
            title={`${variant.charAt(0).toUpperCase() + variant.slice(1)} Variant`}
            variant={variant}
          >
            <p style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
              This modal uses the {variant} glass variant. Notice the different visual effects!
            </p>
          </LiquidModal>
        ))}
      </>
    )
  },
}