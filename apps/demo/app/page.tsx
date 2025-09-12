'use client'

import { useState, useRef, useEffect } from 'react'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setMousePos({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main ref={containerRef} className="min-h-screen relative overflow-hidden">
      {/* Rich Environmental Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Animated gradient mesh */}
        <div 
          className="absolute inset-0 opacity-80"
          style={{
            background: `
              radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
              radial-gradient(circle at ${100 - mousePos.x}% ${100 - mousePos.y}%, rgba(147, 51, 234, 0.3) 0%, transparent 50%),
              linear-gradient(135deg, #1e3a8a 0%, #7c3aed 25%, #4338ca 50%, #8b5cf6 75%, #1e40af 100%)
            `
          }}
        />
        
        {/* Floating geometric elements for depth */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-xl animate-glass-float" />
        <div className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-br from-purple-400/20 to-blue-600/20 rounded-lg blur-lg animate-glass-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-gradient-to-br from-indigo-400/15 to-violet-600/15 rounded-full blur-2xl animate-glass-float" style={{ animationDelay: '4s' }} />
        
        {/* Overlay patterns */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/10" />
      </div>

      {/* Content with authentic liquid glass */}
      <div className="relative z-10 p-8 space-y-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold text-white drop-shadow-lg">
            Liquid UI
          </h1>
          <p className="text-xl text-blue-100/90 drop-shadow-sm">
            Authentic Apple liquid glass components for React
          </p>
        </div>

        {/* Main glass cards with enhanced effects */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
            style={{
              backdropFilter: 'blur(20px) saturate(180%)',
              background: 'rgba(255, 255, 255, 0.25)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
            }}
          >
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-white mb-6 drop-shadow-sm">Frosted Glass</h2>
              <p className="text-blue-50 mb-6 leading-relaxed text-lg">
                Authentic Apple liquid glass with environmental blending and dynamic depth perception.
              </p>
              <div className="flex items-center gap-3 text-gray-100">
                <span className="w-3 h-3 bg-green-400 rounded-full shadow-sm"></span>
                <span className="text-base">20px backdrop blur</span>
              </div>
              <div className="flex items-center gap-3 text-gray-100 mt-2">
                <span className="w-3 h-3 bg-blue-400 rounded-full shadow-sm"></span>
                <span className="text-base">180% saturation boost</span>
              </div>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                 style={{
                   background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                   filter: 'blur(1px)'
                 }} />
          </div>

          <div 
            className="group relative cursor-pointer transform transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2"
            style={{
              backdropFilter: 'blur(28px) saturate(200%)',
              background: 'rgba(59, 130, 246, 0.3)',
              border: '1px solid rgba(147, 197, 253, 0.4)',
              borderRadius: '24px',
              boxShadow: '0 12px 48px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.5)'
            }}
          >
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-white mb-6 drop-shadow-sm">Enhanced Tint</h2>
              <p className="text-blue-50 mb-6 leading-relaxed text-lg">
                Stronger color integration with advanced depth layering and environmental reflection.
              </p>
              <div className="flex items-center gap-3 text-gray-100">
                <span className="w-3 h-3 bg-blue-400 rounded-full shadow-sm"></span>
                <span className="text-base">28px strong blur</span>
              </div>
              <div className="flex items-center gap-3 text-gray-100 mt-2">
                <span className="w-3 h-3 bg-purple-400 rounded-full shadow-sm"></span>
                <span className="text-base">Adaptive opacity</span>
              </div>
            </div>
            
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                 style={{
                   background: 'linear-gradient(45deg, rgba(147, 51, 234, 0.1), rgba(59, 130, 246, 0.1))',
                   filter: 'blur(1px)'
                 }} />
          </div>
        </div>

        {/* Interactive elements */}
        <div className="max-w-md mx-auto space-y-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Type to see environmental blending..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-5 text-lg text-white placeholder-blue-200/70 bg-transparent border-0 outline-none rounded-2xl"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
              }}
            />
            <div className="absolute inset-0 rounded-2xl pointer-events-none"
                 style={{
                   background: inputValue ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                   transition: 'background 0.3s ease'
                 }} />
          </div>
          
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative px-8 py-4 text-white font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{
                backdropFilter: 'blur(20px) saturate(180%)',
                background: 'rgba(255, 255, 255, 0.25)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
              }}
            >
              <span className="relative z-10">Open Modal</span>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: 'rgba(255, 255, 255, 0.1)' }} />
            </button>
            
            <button
              onClick={() => setInputValue('')}
              className="group relative px-8 py-4 text-white font-medium transition-all duration-300 transform hover:scale-105 active:scale-95"
              style={{
                backdropFilter: 'blur(24px) saturate(200%)',
                background: 'rgba(59, 130, 246, 0.3)',
                border: '1px solid rgba(147, 197, 253, 0.4)',
                borderRadius: '16px',
                boxShadow: '0 8px 32px rgba(59, 130, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
              }}
            >
              <span className="relative z-10">Clear</span>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                   style={{ background: 'rgba(59, 130, 246, 0.2)' }} />
            </button>
          </div>
        </div>

        {/* Glass effect showcase */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {[
              { title: 'Clear', subtitle: '2px blur', intensity: 'blur(2px)', bg: 'rgba(255, 255, 255, 0.1)' },
              { title: 'Light', subtitle: '12px blur', intensity: 'blur(12px) saturate(150%)', bg: 'rgba(255, 255, 255, 0.15)' },
              { title: 'Apple', subtitle: '20px blur', intensity: 'blur(20px) saturate(180%)', bg: 'rgba(255, 255, 255, 0.25)' },
              { title: 'Strong', subtitle: '28px blur', intensity: 'blur(28px) saturate(200%)', bg: 'rgba(255, 255, 255, 0.35)' },
            ].map((glass, index) => (
              <div
                key={index}
                className="group relative p-6 text-center cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-1"
                style={{
                  backdropFilter: glass.intensity,
                  background: glass.bg,
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '20px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                }}
              >
                <h3 className="text-xl font-semibold text-white mb-2">{glass.title}</h3>
                <p className="text-sm text-blue-100/80">{glass.subtitle}</p>
                
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                     style={{ background: 'rgba(255, 255, 255, 0.1)' }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 transition-all duration-300"
            onClick={() => setIsModalOpen(false)}
            style={{
              backdropFilter: 'blur(12px)',
              background: 'rgba(0, 0, 0, 0.4)'
            }}
          />
          <div 
            className="relative max-w-lg w-full animate-in fade-in zoom-in duration-300"
            style={{
              backdropFilter: 'blur(24px) saturate(180%)',
              background: 'rgba(255, 255, 255, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              borderRadius: '24px',
              boxShadow: '0 16px 64px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.6)'
            }}
          >
            <div className="p-8">
              <h2 className="text-3xl font-semibold text-white mb-6">Liquid Glass Modal</h2>
              <div className="space-y-4 text-blue-50">
                <p className="leading-relaxed">
                  This modal showcases authentic Apple liquid glass with:
                </p>
                <ul className="space-y-2 text-blue-100/90">
                  <li>• 24px backdrop blur with 180% saturation</li>
                  <li>• Environmental reflection and blending</li>
                  <li>• Multi-layer depth with inset highlights</li>
                  <li>• Physics-based interaction feedback</li>
                </ul>
              </div>
              <div className="pt-6">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="group relative w-full px-6 py-4 text-white font-medium transition-all duration-300"
                  style={{
                    backdropFilter: 'blur(20px) saturate(180%)',
                    background: 'rgba(255, 255, 255, 0.25)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '16px',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
                  }}
                >
                  <span className="relative z-10">Close Modal</span>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                       style={{ background: 'rgba(255, 255, 255, 0.1)' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
