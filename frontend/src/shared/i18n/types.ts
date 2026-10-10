import type { en } from './en'

/** Literal string types widened to `string`, so other locales can differ. */
type Widen<T> = T extends string
  ? string
  : T extends (...args: infer A) => infer R
    ? (...args: A) => Widen<R>
    : T extends readonly (infer U)[]
      ? readonly Widen<U>[]
      : { readonly [K in keyof T]: Widen<T[K]> }

/** The shape every locale's dictionary must match: English's keys. */
export type Dictionary = Widen<typeof en>
