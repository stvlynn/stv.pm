import { rmSync } from 'node:fs'
import { createRequire } from 'node:module'
import { spawnSync } from 'node:child_process'

// Next.js persists fetched data across builds; each export needs fresh content.
rmSync('frontend/.next/cache/fetch-cache', { recursive: true, force: true })

const require = createRequire(import.meta.url)
const result = spawnSync(
  process.execPath,
  [require.resolve('next/dist/bin/next'), 'build', 'frontend'],
  {
    stdio: 'inherit'
  }
)
if (result.error) throw result.error
process.exit(result.status ?? 1)
