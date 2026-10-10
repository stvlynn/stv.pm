import path from 'node:path'
import type { NextConfig } from 'next'

const repoRoot = path.resolve(import.meta.dirname, '..')

const nextConfig: NextConfig = {
  // The Next.js project lives in `frontend/`, but server code imports the DDD
  // backend from `../backend/src`. Both bundlers and output tracing need the
  // repository root to see those files.
  turbopack: { root: repoRoot },
  outputFileTracingRoot: repoRoot,
  output: 'export',
  images: { unoptimized: true },
  reactStrictMode: true,
  poweredByHeader: false
}

export default nextConfig
