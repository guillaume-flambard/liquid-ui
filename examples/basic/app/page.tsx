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
          <LiquidCard
            variant="frosted"
            intensity="regular"
            className="p-6 space-y-4"
            interactive
            hover
            shadow
          >
            <h3 className="text-xl font-semibold text-white">
              Frosted Glass
            </h3>
            <p className="text-blue-100">
              Perfect for content cards and information displays with subtle transparency.
            </p>
            <LiquidButton size="sm" variant="clear">
              Learn More
            </LiquidButton>
          </LiquidCard>

          {/* Clear Card */}
          <LiquidCard
            variant="clear"
            intensity="subtle"
            opacity="light"
            className="p-6 space-y-4"
            interactive
            hover
          >
            <h3 className="text-xl font-semibold text-white">
              Clear Glass
            </h3>
            <p className="text-blue-100">
              Ultra-minimal design with pure transparency and elegant borders.
            </p>
            <LiquidButton size="sm" variant="frosted">
              Explore
            </LiquidButton>
          </LiquidCard>

          {/* Tinted Card */}
          <LiquidCard
            variant="tinted"
            intensity="regular"
            className="p-6 space-y-4"
            interactive
            hover
            shadow
          >
            <h3 className="text-xl font-semibold text-white">
              Tinted Glass
            </h3>
            <p className="text-blue-100">
              Subtle color tinting that adapts beautifully to any background.
            </p>
            <LiquidButton size="sm" variant="tinted">
              Try It
            </LiquidButton>
          </LiquidCard>

        </div>

        {/* Interactive Demo Section */}
        <LiquidCard
          variant="frosted"
          intensity="strong"
          className="p-8 space-y-6"
          interactive
          hover
          shadow
        >
          <h2 className="text-2xl font-bold text-white text-center">
            Interactive Demo
          </h2>

          {/* Form Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <LiquidInput
                label="Email Address"
                placeholder="Enter your email"
                type="email"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
                fullWidth
              />
              
              <LiquidInput
                label="Message"
                placeholder="Tell us what you think..."
                helperText="Share your feedback about Liquid UI"
                fullWidth
              />
            </div>

            <div className="space-y-4">
              <LiquidButton
                fullWidth
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              >
                Send Message
              </LiquidButton>

              <LiquidButton
                variant="clear"
                fullWidth
                onClick={() => setIsModalOpen(true)}
              >
                Open Modal Demo
              </LiquidButton>

              <LiquidButton
                variant="tinted"
                size="lg"
                fullWidth
                loading={false}
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                Get Started
              </LiquidButton>
            </div>
          </div>
        </LiquidCard>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "60fps", subtitle: "Smooth animations" },
            { title: "<50kb", subtitle: "Tiny bundle size" },
            { title: "TypeScript", subtitle: "Full type safety" },
            { title: "A11y", subtitle: "WCAG compliant" }
          ].map((feature, index) => (
            <LiquidCard
              key={index}
              variant="clear"
              intensity="subtle"
              opacity="light"
              className="p-4 text-center"
              interactive
              hover
            >
              <div className="text-2xl font-bold text-white">
                {feature.title}
              </div>
              <div className="text-sm text-blue-200">
                {feature.subtitle}
              </div>
            </LiquidCard>
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
            <LiquidButton
              onClick={() => setIsModalOpen(false)}
              size="sm"
            >
              Close Modal
            </LiquidButton>
            <LiquidButton
              variant="clear"
              size="sm"
            >
              Learn More
            </LiquidButton>
          </div>
        </div>
      </LiquidModal>
    </div>
  )
}