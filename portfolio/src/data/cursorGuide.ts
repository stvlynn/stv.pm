export type CursorOrigin = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export type CursorGuideStep = {
  id: string;
  targetId: string;
  origin: CursorOrigin;
  delayMs?: number;
  selectionHoldMs?: number;
};

export const CURSOR_GUIDE_STEPS: CursorGuideStep[] = [
  {
    id: 'work-heading',
    targetId: 'work',
    origin: 'bottom-right',
    delayMs: 250,
    selectionHoldMs: 1200,
  },
  {
    id: 'photography-heading',
    targetId: 'photography',
    origin: 'bottom-left',
    delayMs: 250,
    selectionHoldMs: 1200,
  },
];
