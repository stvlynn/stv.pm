/** A required runtime setting is missing or malformed. */
export class ConfigurationError extends Error {
  override readonly name = 'ConfigurationError'
}

/**
 * An external content source answered, but not with what the domain needs:
 * a non-2xx status, or a payload that does not match the expected contract.
 */
export class UpstreamError extends Error {
  override readonly name = 'UpstreamError'

  constructor(
    readonly source: string,
    message: string,
    options?: { cause?: unknown }
  ) {
    super(`[${source}] ${message}`, options)
  }
}
