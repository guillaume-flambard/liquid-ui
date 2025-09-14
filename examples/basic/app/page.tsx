'use client'

import { 
  LiquidCard, LiquidCardHero, LiquidCardCompact, LiquidCardInteractive,
  LiquidButton, LiquidButtonPrimary, LiquidButtonGhost, LiquidButtonIcon,
  LiquidInput, LiquidInputSearch, LiquidInputEmail, LiquidInputPassword,
  LiquidModal, LiquidModalAlert, LiquidModalConfirm,
  LiquidSurface, LiquidContent, LiquidText, LiquidInteractive
} from '@liquid-ui/react'
import { useState } from 'react'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">
            Liquid UI
          </h1>
          <p className="text-xl text-blue-200">
            Beautiful Apple Liquid Glass components for React
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Enhanced Frosted Card */}
          <LiquidCard variant="frosted" interactive className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Enhanced Glass
            </h3>
            <p className="text-blue-100">
              Drag me around! Features magnetic edges and smooth 3D transforms with ripple effects.
            </p>
            <LiquidButtonGhost size="sm">
              Interactive Glass
            </LiquidButtonGhost>
          </LiquidCard>

          {/* Interactive Clear Card */}
          <LiquidCard variant="clear" interactive className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Magnetic Glass
            </h3>
            <p className="text-blue-100">
              Hover near me to feel the magnetic attraction! Notice the smooth color transitions.
            </p>
            <LiquidButtonPrimary size="sm">
              Feel the Glass
            </LiquidButtonPrimary>
          </LiquidCard>

          {/* Advanced Tinted Card */}
          <LiquidCard variant="tinted" interactive className="space-y-4">
            <h3 className="text-xl font-semibold text-white">
              Advanced Glass
            </h3>
            <p className="text-blue-100">
              Combines drag & drop with magnetic edges. Click buttons to see ripple effects!
            </p>
            <LiquidButton variant="tinted" size="sm">
              Premium Glass
            </LiquidButton>
          </LiquidCard>

        </div>

        {/* Interactive Demo Section */}
        <LiquidCardInteractive className="space-y-6" intensity="strong">
          <h2 className="text-2xl font-bold text-white text-center">
            Interactive Demo
          </h2>

          {/* Enhanced Form Elements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <LiquidInputEmail
                placeholder="Enter your email"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                }
              />
              
              <LiquidInput
                type="tel"
                placeholder="Enter your phone"
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
              />
            </div>

            <div className="space-y-4">
              <LiquidButtonPrimary
                fullWidth
                leftIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                }
              >
                Experience Glass Physics
              </LiquidButtonPrimary>

              <LiquidButton variant="frosted"
                fullWidth
                onClick={() => setIsModalOpen(true)}
              >
                Enhanced Modal
              </LiquidButton>

              <LiquidButton
                variant="tinted"
                size="lg"
                fullWidth
                rightIcon={
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                }
              >
                Enhanced Experience
              </LiquidButton>
            </div>
          </div>
        </LiquidCardInteractive>

        {/* Enhanced Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: "Drag & Drop", subtitle: "Native support" },
            { title: "Ripple FX", subtitle: "Smooth animations" },
            { title: "Magnetic", subtitle: "Edge attractions" },
            { title: "Enhanced", subtitle: "All components" }
          ].map((feature, index) => (
            <LiquidCardCompact 
              key={index} 
              className="text-center"
            >
              <div className="text-lg font-bold text-white mb-1">
                {feature.title}
              </div>
              <div className="text-sm text-blue-200">
                {feature.subtitle}
              </div>
            </LiquidCardCompact>
          ))}
        </div>

      </div>

      {/* Modal Demo */}
      <LiquidModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        size="md"
      >
        <div className="space-y-4">
          <LiquidText variant="title" align="center">
            Liquid Glass Modal
          </LiquidText>
          <p className="text-gray-300">
            This enhanced modal showcases all the new component features:
          </p>
          
          <ul className="space-y-2 text-gray-400">
            <li>• Glass physics interactions</li>
            <li>• Enhanced interactions</li>
            <li>• Improved visual feedback</li>
            <li>• Adaptive glass opacity</li>
            <li>• Better accessibility</li>
          </ul>

          <div className="flex gap-3 pt-4">
            <LiquidButton size="sm" onClick={() => setIsModalOpen(false)}>
              Close Modal
            </LiquidButton>
            <LiquidButtonGhost size="sm">
              Learn More
            </LiquidButtonGhost>
          </div>
        </div>
      </LiquidModal>
    </div>
  )
}