// Shared motion tokens (from beUI). Strong custom curves: the CSS defaults
// `ease-in` / `ease-out` feel weak. Springs are the canonical physics.

export const EASE_OUT = [0.16, 1, 0.3, 1] as const
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const
export const EASE_DRAWER = [0.32, 0.72, 0, 1] as const

/** Press feedback on buttons and other tappable surfaces. */
export const SPRING_PRESS = { type: 'spring', stiffness: 500, damping: 30, mass: 0.6 } as const

/** Content swaps: icons trading places inside a control. */
export const SPRING_SWAP = { type: 'spring', stiffness: 460, damping: 30, mass: 0.55 } as const

/** Cursor-follow physics for pointer tracking (magnetic controls). */
export const SPRING_MOUSE = { stiffness: 200, damping: 15, mass: 0.3 } as const

/** Shared-layout glides: pills and frames morphing between positions. */
export const SPRING_LAYOUT = { type: 'spring', stiffness: 360, damping: 32, mass: 0.6 } as const
