import path from 'node:path'
import { defineConfig } from 'vitest/config'

const frontend = path.resolve(import.meta.dirname, 'frontend/src')

export default defineConfig({
  resolve: {
    alias: {
      '@backend': path.resolve(import.meta.dirname, 'backend/src'),
      '@/shared': path.join(frontend, 'shared'),
      '@/entities': path.join(frontend, 'entities')
    }
  },
  test: {
    include: ['backend/src/**/*.test.ts', 'frontend/src/**/*.test.ts'],
    environment: 'node'
  }
})
