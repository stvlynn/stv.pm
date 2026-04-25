import { XMarkdown, type ComponentProps } from '@ant-design/x-markdown';
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import styles from './StreamingHeroCopy.module.css';

const HERO_SENTENCES = [
  '**Steven Lynn** is an *AI explorer* at FirstLab, host of CrazyStaur.day, and builder of open-source tools for **Dify** workflows, *language learning*, search-first personal navigation, and practical [**agents**](#hero-hook-0).',
  'He works where *product operations* meets **builder culture**: turning community feedback, `plugin` ideas, and messy `LLM` experiments into systems people can [**reuse**](#hero-hook-1).',
  'At **Dify.ai**, he learned how AI application builders ask for examples, templates, trust, and workflows that feel [*inspectable*](#hero-hook-2).',
  'At **Tencent Cloud**, he focuses on *product operations* for cloud and AI tooling, connecting `launches`, user stories, and adoption [**loops**](#hero-hook-3).',
  'This page is a small map of those threads: **open-source projects**, writing, photography, and experiments that make AI more reachable, useful, and fun to use.',
] as const;

const HOOK_PREFIX = '#hero-hook-';

type MarkdownAnchorProps = ComponentProps<{
  children?: ReactNode;
  href?: string;
}>;

function getStepDelay(index: number) {
  if (index % 19 === 0) {
    return 54;
  }

  if (index % 7 === 0) {
    return 34;
  }

  return 18;
}

export function StreamingHeroCopy() {
  const [activeSentenceIndex, setActiveSentenceIndex] = useState(0);
  const [currentLength, setCurrentLength] = useState(0);
  const [isStreaming, setIsStreaming] = useState(true);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isStreaming) {
      return;
    }

    const source = HERO_SENTENCES[activeSentenceIndex];
    let index = 0;
    let timeoutId = 0;

    const tick = () => {
      index += 1;
      setCurrentLength(index);

      if (index >= source.length) {
        timeoutId = window.setTimeout(() => {
          setIsStreaming(false);
        }, 160);
        return;
      }

      timeoutId = window.setTimeout(tick, getStepDelay(index));
    };

    timeoutId = window.setTimeout(tick, 180);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [activeSentenceIndex, isStreaming]);

  const content = useMemo(() => {
    const completedSentences = HERO_SENTENCES.slice(0, activeSentenceIndex).join(' ');
    const currentSentence = HERO_SENTENCES[activeSentenceIndex].slice(0, currentLength);

    return [completedSentences, currentSentence].filter(Boolean).join(' ');
  }, [activeSentenceIndex, currentLength]);

  useEffect(() => {
    const scroller = scrollerRef.current;

    if (!scroller) {
      return;
    }

    const animationFrame = window.requestAnimationFrame(() => {
      scroller.scrollTo({
        behavior: 'smooth',
        top: scroller.scrollHeight,
      });
    });

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [content]);

  const streamNextSentence = useCallback(() => {
    if (isStreaming || activeSentenceIndex >= HERO_SENTENCES.length - 1) {
      return;
    }

    setCurrentLength(0);
    setIsStreaming(true);
    setActiveSentenceIndex((currentIndex) => currentIndex + 1);
  }, [activeSentenceIndex, isStreaming]);

  const MarkdownAnchor = useCallback(
    ({ children, href }: MarkdownAnchorProps) => {
      if (href?.startsWith(HOOK_PREFIX)) {
        const hookIndex = Number(href.replace(HOOK_PREFIX, ''));
        const canContinue = !isStreaming && hookIndex === activeSentenceIndex;

        return (
          <button
            aria-label="Continue hero introduction"
            className={`${styles.hook} ${canContinue ? styles.hookReady : ''}`}
            disabled={!canContinue}
            onClick={streamNextSentence}
            type="button"
          >
            {children}
          </button>
        );
      }

      return <a href={href}>{children}</a>;
    },
    [activeSentenceIndex, isStreaming, streamNextSentence],
  );

  const markdownComponents = useMemo(
    () => ({
      a: MarkdownAnchor,
    }),
    [MarkdownAnchor],
  );

  const hasNextChunk = isStreaming;

  return (
    <div className={styles.scroller} ref={scrollerRef}>
      <XMarkdown
        className={styles.markdown}
        components={markdownComponents}
        content={content}
        streaming={{
          animationConfig: {
            easing: 'cubic-bezier(0.19, 1, 0.22, 1)',
            fadeDuration: 260,
          },
          enableAnimation: true,
          hasNextChunk,
          tail: hasNextChunk ? { content: '▌' } : false,
        }}
      />
    </div>
  );
}
