'use client'

import { LiquidCard, LiquidButton, LiquidInput, LiquidModal } from '@liquid-ui/react'
import { useState } from 'react'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Liquid UI 🌊
          </h1>
          <p className="text-xl text-blue-200">
            Beautiful Apple Liquid Glass components for React
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Frosted Card */}
          <LiquidCard.Frosted className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Frosted Glass
            </h3>
            <p className="text-blue-100">
              Perfect for content cards and information displays with subtle transparency.
            </p>
            <LiquidButton.Secondary size="sm">
              Learn More
            </LiquidButton.Secondary>
          </LiquidCard.Frosted>

          {/* Clear Card */}
          <LiquidCard.Clear className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Clear Glass
            </h3>
            <p className="text-blue-100">
              Ultra-minimal design with pure transparency and elegant borders.
            </p>
            <LiquidButton.Primary size="sm">
              Explore
            </LiquidButton.Primary>
          </LiquidCard.Clear>

          {/* Tinted Card */}
          <LiquidCard.Tinted className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Tinted Glass
            </h3>
            <p className="text-blue-100">
              Subtle color tinting that adapts beautifully to any background.
            </p>
            <LiquidButton.Tinted size="sm">
              Try It
            </LiquidButton.Tinted>
          </LiquidCard.Tinted>

        </div>

        {/* Interactive Demo Section */}
        <LiquidCard.Interactive className="p-8 space-y-6" intensity="strong">
          <h2 className="text-2xl font-bold text-white text-center">
            Interactive Demo
          </h2>

          {/* Form Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <LiquidInput.Email
                label="Email Address"
                placeholder="Enter your email"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
                fullWidth
              />
              
              <LiquidInput.Default
                label="Message"
                placeholder="Tell us what you think..."
                helperText="Share your feedback about Liquid UI"
                fullWidth
              />
            </div>

            <div className="space-y-4">
              <LiquidButton.Primary
                fullWidth
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              >
                Send Message
              </LiquidButton.Primary>

              <LiquidButton.Secondary
                fullWidth
                onClick={() => setIsModalOpen(true)}
              >
                Open Modal Demo
              </LiquidButton.Secondary>

              <LiquidButton.Large
                variant="tinted"
                fullWidth
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                Get Started
              </LiquidButton.Large>
            </div>
          </div>
        </LiquidCard.Interactive>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "60fps", subtitle: "Smooth animations" },
            { title: "<50kb", subtitle: "Tiny bundle size" },
            { title: "TypeScript", subtitle: "Full type safety" },
            { title: "A11y", subtitle: "WCAG compliant" }
          ].map((feature, index) => (
            <LiquidCard.Clear key={index} className="p-4 text-center">
              <div className="text-2xl font-bold text-white">
                {feature.title}
              </div>
              <div className="text-sm text-blue-200">
                {feature.subtitle}
              </div>
            </LiquidCard.Clear>
          ))}
        </div>

      </div>

      {/* Modal Demo */}
      <LiquidModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Liquid Glass Modal"
        size="md"
      >
        <div className="p-6 space-y-4">
          <p className="text-gray-300">
            This is a beautiful modal with liquid glass effects. It features:
          </p>
          
          <ul className="space-y-2 text-gray-400">
            <li>• Backdrop blur and glass effects</li>
            <li>• Smooth animations</li>
            <li>• Keyboard navigation</li>
            <li>• Focus management</li>
            <li>• Accessibility features</li>
          </ul>

          <div className="flex gap-3 pt-4">
            <LiquidButton.Small onClick={() => setIsModalOpen(false)}>
              Close Modal
            </LiquidButton.Small>
            <LiquidButton.Small variant="clear">
              Learn More
            </LiquidButton.Small>
          </div>
        </div>
      </LiquidModal>
    </div>
  )
}