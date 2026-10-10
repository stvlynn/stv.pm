import paleBlueDot from './pale-blue-dot.jpg'
import signature from './signature.png'

export { SIGNATURE_HEART, SIGNATURE_SOLID, SIGNATURE_VIEWBOX } from './signature-vector'

/**
 * "Pale Blue Dot": Earth from 6 billion km, taken by Voyager 1 on
 * 14 February 1990 (2020 reprocessing by NASA/JPL-Caltech, public domain).
 */
export const PALE_BLUE_DOT = {
  image: paleBlueDot,
  /** Where Earth sits in the frame, as fractions of width and height. */
  earth: { x: 0.5945, y: 0.5195 }
} as const

/** The handwritten "Steven Lynn" signature, as drawn (transparent PNG). */
export const SIGNATURE_IMAGE = signature
