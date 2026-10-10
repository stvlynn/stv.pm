import { ConfigurationError } from '../../domain/shared/errors'

/**
 * Runtime settings for the content sources. Endpoints default to production
 * and can be overridden (for example to point at a local stub); the Unsplash
 * access key has no default and must be provided.
 */
export interface ContentSourceConfig {
  blogFeedUrl: string
  unsplash: {
    apiUrl: string
    accessKey: string
    username: string
  }
}

const DEFAULTS = {
  blogFeedUrl: 'https://blog.stv.pm/rss/feed.json',
  unsplashApiUrl: 'https://api.unsplash.com',
  unsplashUsername: 'stvlynn'
} as const

export function readContentSourceConfig(
  env: Record<string, string | undefined> = process.env
): ContentSourceConfig {
  const accessKey = env.UNSPLASH_ACCESS_KEY?.trim()
  if (!accessKey) {
    throw new ConfigurationError(
      'UNSPLASH_ACCESS_KEY is not set. Create an app at https://unsplash.com/oauth/applications and expose its Access Key to the build and runtime environment.'
    )
  }

  return {
    blogFeedUrl: absoluteUrl('BLOG_FEED_URL', env.BLOG_FEED_URL ?? DEFAULTS.blogFeedUrl),
    unsplash: {
      apiUrl: absoluteUrl('UNSPLASH_API_URL', env.UNSPLASH_API_URL ?? DEFAULTS.unsplashApiUrl),
      accessKey,
      username: env.UNSPLASH_USERNAME ?? DEFAULTS.unsplashUsername
    }
  }
}

function absoluteUrl(name: string, value: string): string {
  try {
    return new URL(value).toString()
  } catch (cause) {
    throw new ConfigurationError(`${name} must be an absolute URL, got "${value}".`, { cause })
  }
}
