import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const LAYERS = ['app', 'pages', 'widgets', 'features', 'entities', 'shared']

/** FSD: a layer may import only from layers below it, and only via public APIs. */
function fsdRestrictions(layer) {
  const above = LAYERS.slice(0, LAYERS.indexOf(layer))
  return {
    files: [`frontend/src/${layer}/**/*.{ts,tsx}`],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            ...(above.length
              ? [
                  {
                    group: above
                      .map((name) => `@/${name}`)
                      .concat(above.map((name) => `@/${name}/*`)),
                    message: `FSD: "${layer}" must not import from a higher layer.`
                  }
                ]
              : []),
            {
              group: [
                '@/*/*/ui/*',
                '@/*/*/model/*',
                '@/*/*/lib/*',
                '@/*/*/api/*',
                '@/*/*/config/*'
              ],
              message: 'FSD: import a slice through its public index.'
            }
          ]
        }
      ]
    }
  }
}

const config = [
  ...nextVitals,
  ...nextTs,
  {
    settings: { next: { rootDir: 'frontend' } },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }
      ],
      // Gallery images are served by Unsplash's own image CDN at exact sizes.
      '@next/next/no-img-element': 'off'
    }
  },
  ...LAYERS.map(fsdRestrictions),
  {
    files: ['backend/src/domain/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/application/**', '**/infrastructure/**', '**/interfaces/**'],
              message: 'DDD: the domain depends on nothing outside itself.'
            }
          ]
        }
      ]
    }
  },
  {
    files: ['backend/src/application/**/*.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['**/infrastructure/**', '**/interfaces/**'],
              message: 'DDD: the application layer depends only on the domain.'
            }
          ]
        }
      ]
    }
  },
  {
    ignores: [
      '**/out/**',
      '**/.next/**',
      '**/.wrangler/**',
      '**/node_modules/**',
      'frontend/next-env.d.ts'
    ]
  }
]

export default config
