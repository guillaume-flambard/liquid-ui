import '@testing-library/jest-dom'
import { beforeAll, afterEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}))

// Mock ResizeObserver
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  disconnect: vi.fn(),
  unobserve: vi.fn(),
}))

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock CSS.supports
Object.defineProperty(CSS, 'supports', {
  writable: true,
  value: vi.fn().mockImplementation(() => true),
})

// Mock performance.memory for testing
Object.defineProperty(performance, 'memory', {
  writable: true,
  value: {
    usedJSHeapSize: 1000000,
    totalJSHeapSize: 2000000,
    jsHeapSizeLimit: 4000000,
  },
})

// Mock navigator.deviceMemory
Object.defineProperty(navigator, 'deviceMemory', {
  writable: true,
  value: 8,
})

// Mock navigator.connection
Object.defineProperty(navigator, 'connection', {
  writable: true,
  value: {
    effectiveType: '4g',
    downlink: 10,
    rtt: 100,
  },
})

// Cleanup after each test
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// Setup global test environment
beforeAll(() => {
  // Suppress console warnings in tests unless explicitly testing them
  const originalWarn = console.warn
  console.warn = (...args: any[]) => {
    if (args[0]?.includes?.('React does not recognize')) {
      return // Suppress prop validation warnings in tests
    }
    originalWarn(...args)
  }
})