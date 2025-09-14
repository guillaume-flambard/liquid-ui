#!/usr/bin/env node

/**
 * Bundle Size Analyzer for LIQUID UI
 * 
 * Analyzes bundle sizes and compares against performance budgets
 * as specified in the design tokens
 */

import fs from 'fs'
import path from 'path'
import { gzipSync } from 'zlib'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Performance budgets from design tokens
const PERFORMANCE_BUDGETS = {
  core: 15 * 1024, // 15KB gzipped
  react: 35 * 1024, // 35KB gzipped
  total: 50 * 1024  // 50KB gzipped
}

function analyzeBundle(packageName, filePath) {
  try {
    const content = fs.readFileSync(filePath)
    const gzippedSize = gzipSync(content).length
    const rawSize = content.length
    
    return {
      package: packageName,
      rawSize,
      gzippedSize,
      budget: PERFORMANCE_BUDGETS[packageName] || 0,
      isWithinBudget: gzippedSize <= (PERFORMANCE_BUDGETS[packageName] || Infinity)
    }
  } catch (error) {
    return {
      package: packageName,
      error: error.message
    }
  }
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function main() {
  console.log('🔍 LIQUID UI Bundle Analysis\n')
  
  const results = []
  
  // Analyze core package
  const coreESM = path.join(__dirname, '../packages/core/dist/index.mjs')
  const coreCJS = path.join(__dirname, '../packages/core/dist/index.js')
  
  if (fs.existsSync(coreESM)) {
    results.push(analyzeBundle('core', coreESM))
  }
  
  // Analyze React package
  const reactESM = path.join(__dirname, '../packages/react/dist/index.mjs')
  const reactCJS = path.join(__dirname, '../packages/react/dist/index.js')
  
  if (fs.existsSync(reactESM)) {
    results.push(analyzeBundle('react', reactESM))
  }
  
  // Display results
  console.log('📊 Bundle Size Analysis Results:\n')
  console.log('Package  | Raw Size | Gzipped | Budget  | Status')
  console.log('---------|----------|---------|---------|--------')
  
  let totalGzipped = 0
  let allWithinBudget = true
  
  results.forEach(result => {
    if (result.error) {
      console.log(`${result.package.padEnd(8)} | ERROR: ${result.error}`)
      return
    }
    
    const status = result.isWithinBudget ? '✅ PASS' : '❌ FAIL'
    const budgetStr = formatBytes(result.budget)
    
    console.log(
      `${result.package.padEnd(8)} | ${formatBytes(result.rawSize).padEnd(8)} | ${formatBytes(result.gzippedSize).padEnd(7)} | ${budgetStr.padEnd(7)} | ${status}`
    )
    
    totalGzipped += result.gzippedSize
    if (!result.isWithinBudget) {
      allWithinBudget = false
    }
  })
  
  console.log('---------|----------|---------|---------|--------')
  const totalStatus = totalGzipped <= PERFORMANCE_BUDGETS.total ? '✅ PASS' : '❌ FAIL'
  console.log(
    `Total    | -        | ${formatBytes(totalGzipped).padEnd(7)} | ${formatBytes(PERFORMANCE_BUDGETS.total).padEnd(7)} | ${totalStatus}`
  )
  
  console.log('\n📈 Summary:')
  console.log(`• Total gzipped size: ${formatBytes(totalGzipped)}`)
  console.log(`• Performance budget: ${formatBytes(PERFORMANCE_BUDGETS.total)}`)
  console.log(`• Overall status: ${allWithinBudget && totalGzipped <= PERFORMANCE_BUDGETS.total ? '✅ All budgets met' : '❌ Budget exceeded'}`)
  
  if (totalGzipped > PERFORMANCE_BUDGETS.total) {
    const excess = totalGzipped - PERFORMANCE_BUDGETS.total
    console.log(`• Excess size: ${formatBytes(excess)} (${((excess / PERFORMANCE_BUDGETS.total) * 100).toFixed(1)}% over budget)`)
    
    console.log('\n💡 Optimization Recommendations:')
    console.log('• Enable tree-shaking for unused exports')
    console.log('• Split components into separate entry points')
    console.log('• Optimize design tokens to reduce duplication')
    console.log('• Consider lazy loading for heavy features')
  }
  
  // Exit with error code if budgets exceeded
  process.exit(allWithinBudget && totalGzipped <= PERFORMANCE_BUDGETS.total ? 0 : 1)
}

main()