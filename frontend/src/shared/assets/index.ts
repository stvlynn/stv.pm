import paleBlueDot from './pale-blue-dot.jpg'

/**
 * "Pale Blue Dot": Earth from 6 billion km, taken by Voyager 1 on
 * 14 February 1990 (2020 reprocessing by NASA/JPL-Caltech, public domain).
 */
export const PALE_BLUE_DOT = {
  image: paleBlueDot,
  /** Where Earth sits in the frame, as fractions of width and height. */
  earth: { x: 0.5945, y: 0.5195 }
} as const
