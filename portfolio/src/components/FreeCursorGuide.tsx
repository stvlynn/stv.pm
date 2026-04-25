import { useEffect, useMemo, useRef, useState } from 'react';
import {
  CURSOR_GUIDE_STEPS,
  type CursorGuideStep,
  type CursorOrigin,
} from '../data/cursorGuide';
import styles from './FreeCursorGuide.module.css';

type Point = {
  x: number;
  y: number;
};

type CursorPose = Point & {
  visible: boolean;
  dragging: boolean;
};

type TextTarget = {
  element: HTMLElement;
  textNode: Text;
  textLength: number;
  startPoint: Point;
};

const INITIAL_POSE: CursorPose = {
  x: -120,
  y: -120,
  visible: false,
  dragging: false,
};

const DEFAULT_CURSOR_TIP_OFFSET: Point = {
  x: 10,
  y: 9,
};

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getTargetElement(step: CursorGuideStep) {
  return document.querySelector<HTMLElement>(
    `[data-cursor-target="${step.targetId}"]`,
  );
}

function getOriginPoint(origin: CursorOrigin): Point {
  const offset = 112;
  const { innerWidth, innerHeight } = window;

  const points: Record<CursorOrigin, Point> = {
    'top-left': { x: -offset, y: -offset },
    'top-right': { x: innerWidth + offset, y: -offset },
    'bottom-left': { x: -offset, y: innerHeight + offset },
    'bottom-right': { x: innerWidth + offset, y: innerHeight + offset },
  };

  return points[origin];
}

function getFirstTextNode(element: HTMLElement) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const node = walker.nextNode();

  return node instanceof Text ? node : null;
}

function getTextRangeRect(textNode: Text, startOffset: number, endOffset: number) {
  const range = document.createRange();

  range.setStart(textNode, startOffset);
  range.setEnd(textNode, endOffset);

  const rects = Array.from(range.getClientRects());
  range.detach();

  return rects;
}

function getTextTarget(element: HTMLElement): TextTarget | null {
  const textNode = getFirstTextNode(element);
  const textLength = textNode?.textContent?.length ?? 0;

  if (!textNode || textLength === 0) {
    return null;
  }

  const firstRect = getTextRangeRect(textNode, 0, Math.min(1, textLength))[0];

  if (!firstRect) {
    return null;
  }

  return {
    element,
    textNode,
    textLength,
    startPoint: {
      x: firstRect.left - 4,
      y: firstRect.top + firstRect.height * 0.5,
    },
  };
}

function setNativeSelection(target: TextTarget, characterCount: number): Point | null {
  const selection = window.getSelection();

  if (!selection) {
    return null;
  }

  const range = document.createRange();
  const safeCount = Math.max(0, Math.min(target.textLength, characterCount));

  range.setStart(target.textNode, 0);
  range.setEnd(target.textNode, safeCount);
  selection.removeAllRanges();

  if (safeCount > 0) {
    selection.addRange(range);
  }

  const lastRect = Array.from(range.getClientRects()).at(-1);

  if (!lastRect) {
    return null;
  }

  return {
    x: lastRect.right + 4,
    y: lastRect.top + lastRect.height * 0.5,
  };
}

function clearNativeSelection() {
  window.getSelection()?.removeAllRanges();
}

function easeOutExpo(progress: number) {
  return progress === 1 ? 1 : 1 - 2 ** (-10 * progress);
}

function easeInOutCubic(progress: number) {
  return progress < 0.5
    ? 4 * progress ** 3
    : 1 - (-2 * progress + 2) ** 3 / 2;
}

function pointOnCubicBezier(start: Point, controlA: Point, controlB: Point, end: Point, t: number) {
  const inverse = 1 - t;

  return {
    x:
      inverse ** 3 * start.x +
      3 * inverse ** 2 * t * controlA.x +
      3 * inverse * t ** 2 * controlB.x +
      t ** 3 * end.x,
    y:
      inverse ** 3 * start.y +
      3 * inverse ** 2 * t * controlA.y +
      3 * inverse * t ** 2 * controlB.y +
      t ** 3 * end.y,
  };
}

function getPathControls(start: Point, end: Point) {
  const horizontalDistance = end.x - start.x;
  const verticalDistance = end.y - start.y;
  const arc = Math.min(220, Math.max(80, Math.hypot(horizontalDistance, verticalDistance) * 0.16));

  return {
    controlA: {
      x: start.x + horizontalDistance * 0.42,
      y: start.y + verticalDistance * 0.1 - arc,
    },
    controlB: {
      x: start.x + horizontalDistance * 0.88,
      y: end.y - arc * 0.18,
    },
  };
}

export function FreeCursorGuide() {
  const steps = useMemo(() => CURSOR_GUIDE_STEPS, []);
  const [activeStep, setActiveStep] = useState<CursorGuideStep | null>(null);
  const [pose, setPose] = useState<CursorPose>(INITIAL_POSE);
  const animationFrameRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const startTimeoutRef = useRef<number | null>(null);
  const selectionTimeoutRef = useRef<number | null>(null);
  const scrollResumeTimeoutRef = useRef<number | null>(null);
  const activeStepRef = useRef<CursorGuideStep | null>(null);

  useEffect(() => {
    activeStepRef.current = activeStep;
  }, [activeStep]);

  useEffect(() => {
    if (prefersReducedMotion()) {
      return undefined;
    }

    const visibleTargets = new Map<string, IntersectionObserverEntry>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const targetId = entry.target.getAttribute('data-cursor-target');

          if (!targetId) {
            return;
          }

          if (entry.isIntersecting) {
            visibleTargets.set(targetId, entry);
          } else {
            visibleTargets.delete(targetId);
          }
        });

        const nextStep = steps
          .filter((step) => visibleTargets.has(step.targetId))
          .sort((a, b) => {
            const entryA = visibleTargets.get(a.targetId);
            const entryB = visibleTargets.get(b.targetId);

            return (entryB?.intersectionRatio ?? 0) - (entryA?.intersectionRatio ?? 0);
          })[0];

        setActiveStep((currentStep) => {
          if (!nextStep) {
            return null;
          }

          return currentStep?.id === nextStep.id ? currentStep : nextStep;
        });
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: '-8% 0px -38% 0px',
      },
    );

    steps.forEach((step) => {
      const target = getTargetElement(step);

      if (target) {
        observer.observe(target);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [steps]);

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (startTimeoutRef.current) {
        window.clearTimeout(startTimeoutRef.current);
      }

      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }

      if (selectionTimeoutRef.current) {
        window.clearTimeout(selectionTimeoutRef.current);
      }

      if (scrollResumeTimeoutRef.current) {
        window.clearTimeout(scrollResumeTimeoutRef.current);
      }

      clearNativeSelection();
      setPose((currentPose) => ({
        ...currentPose,
        visible: false,
        dragging: false,
      }));

      scrollResumeTimeoutRef.current = window.setTimeout(() => {
        const currentStep = activeStepRef.current;

        if (currentStep && getTargetElement(currentStep)) {
          setActiveStep({ ...currentStep });
        }
      }, 180);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);

      if (scrollResumeTimeoutRef.current) {
        window.clearTimeout(scrollResumeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!activeStep || prefersReducedMotion()) {
      return undefined;
    }

    const element = getTargetElement(activeStep);

    if (!element) {
      return undefined;
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (resetTimeoutRef.current) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    if (startTimeoutRef.current) {
      window.clearTimeout(startTimeoutRef.current);
    }

    if (selectionTimeoutRef.current) {
      window.clearTimeout(selectionTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      clearNativeSelection();
      setPose({
        ...getOriginPoint(activeStep.origin),
        visible: false,
        dragging: false,
      });
    }, 0);

    startTimeoutRef.current = window.setTimeout(() => {
      const target = getTextTarget(element);

      if (!target) {
        return;
      }

      const start = getOriginPoint(activeStep.origin);
      const { controlA, controlB } = getPathControls(start, target.startPoint);
      const approachDuration = 900;
      const dragDuration = 760;
      const startedAt = performance.now();

      setPose({
        ...start,
        visible: true,
        dragging: false,
      });

      const tick = (now: number) => {
        const elapsed = now - startedAt;

        if (elapsed <= approachDuration) {
          const progress = easeOutExpo(Math.min(1, elapsed / approachDuration));
          const nextPoint = pointOnCubicBezier(
            start,
            controlA,
            controlB,
            target.startPoint,
            progress,
          );

          setPose({
            ...nextPoint,
            visible: true,
            dragging: false,
          });
          animationFrameRef.current = requestAnimationFrame(tick);
          return;
        }

        const dragProgress = Math.min(1, (elapsed - approachDuration) / dragDuration);
        const easedDragProgress = easeInOutCubic(dragProgress);
        const characterCount = Math.ceil(target.textLength * easedDragProgress);
        const dragPoint = setNativeSelection(target, characterCount) ?? target.startPoint;

        setPose({
          ...dragPoint,
          visible: true,
          dragging: true,
        });

        if (dragProgress < 1) {
          animationFrameRef.current = requestAnimationFrame(tick);
          return;
        }

        setPose((currentPose) => ({
          ...currentPose,
          visible: false,
          dragging: false,
        }));

        selectionTimeoutRef.current = window.setTimeout(() => {
          clearNativeSelection();
        }, activeStep.selectionHoldMs ?? 1300);
      };

      animationFrameRef.current = requestAnimationFrame(tick);
    }, activeStep.delayMs ?? 250);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }

      if (startTimeoutRef.current) {
        window.clearTimeout(startTimeoutRef.current);
      }

      if (selectionTimeoutRef.current) {
        window.clearTimeout(selectionTimeoutRef.current);
      }

      clearNativeSelection();
    };
  }, [activeStep]);

  return (
    <div className={styles.overlay} aria-hidden="true">
      <div
        className={`${styles.cursor} ${pose.visible ? styles.cursorVisible : ''} ${
          pose.dragging ? styles.cursorDragging : ''
        }`}
        style={{
          transform: `translate3d(${pose.x - DEFAULT_CURSOR_TIP_OFFSET.x}px, ${
            pose.y - DEFAULT_CURSOR_TIP_OFFSET.y
          }px, 0)`,
        }}
      >
        <div className={styles.glyph}>
          <div className={styles.fog} />
          <svg
            className={styles.pointer}
            viewBox="0 0 32 32"
            role="presentation"
            focusable="false"
          >
            <path
              d="M5 3 5.2 26.2 11.9 19.8 16.4 29.4 21.2 27.2 16.6 17.7 26 17.5Z"
              fill="#f4ebd8"
              stroke="#050505"
              strokeLinejoin="round"
              strokeWidth="2.4"
            />
            <path
              d="M7.5 7.8 7.65 20.4 12.35 15.95 17.45 26.7 18.65 26.15 13.5 15.3 20.35 15.18Z"
              fill="#050505"
              opacity="0.72"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
