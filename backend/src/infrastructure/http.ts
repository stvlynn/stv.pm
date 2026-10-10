import { UpstreamError } from '../domain/shared/errors'

const TIMEOUT_MS = 10_000

/** GET a JSON document, turning transport and status failures into `UpstreamError`. */
export async function getJson(
  source: string,
  url: string,
  headers: Record<string, string> = {}
): Promise<unknown> {
  let response: Response
  try {
    response = await fetch(url, {
      headers: { Accept: 'application/json', ...headers },
      signal: AbortSignal.timeout(TIMEOUT_MS)
    })
  } catch (cause) {
    throw new UpstreamError(source, `request to ${url} failed`, { cause })
  }

  if (!response.ok) {
    throw new UpstreamError(source, `${url} answered ${response.status} ${response.statusText}`)
  }

  try {
    return await response.json()
  } catch (cause) {
    throw new UpstreamError(source, `${url} did not return JSON`, { cause })
  }
}

/** Narrowing helpers for mapping untrusted payloads. */
export function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

export function requireString(
  source: string,
  record: Record<string, unknown>,
  key: string
): string {
  const value = record[key]
  if (typeof value !== 'string' || value.length === 0) {
    throw new UpstreamError(
      source,
      `expected non-empty string "${key}", got ${JSON.stringify(value)}`
    )
  }
  return value
}

export function requirePositiveInt(
  source: string,
  record: Record<string, unknown>,
  key: string
): number {
  const value = record[key]
  if (typeof value !== 'number' || !Number.isInteger(value) || value <= 0) {
    throw new UpstreamError(
      source,
      `expected positive integer "${key}", got ${JSON.stringify(value)}`
    )
  }
  return value
}

export function optionalString(record: Record<string, unknown>, key: string): string | null {
  const value = record[key]
  return typeof value === 'string' && value.trim().length > 0 ? value.trim() : null
}
