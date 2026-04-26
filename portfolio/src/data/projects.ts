import type { ProjectCardData } from '../components/ProjectCard';

export const SELECTED_WORKS: ProjectCardData[] = [
  {
    title: 'dingtalk-wukong-skills',
    description: 'Agent skills for DingTalk and professional document processing.',
    tag: 'Python / Agents',
    cta: 'View Repository',
    href: 'https://github.com/stvlynn/dingtalk-wukong-skills',
  },
  {
    title: 'Hello Dify',
    description: 'Comprehensive Online Dify Tutorial',
    tag: 'Next.js / Fumadocs',
    cta: 'View Repository',
    href: 'https://github.com/stvlynn/hello-dify',
  },
  {
    title: 'Flashcard',
    description: 'Open-source language learning app and Duolingo alternative.',
    tag: 'TypeScript / Dify API',
    cta: 'View Repository',
    href: 'https://github.com/stvlynn/flashcard',
  },
  {
    title: 'Twi.am',
    description: 'Twitter MBTI receipt and personality analysis experiment.',
    tag: 'Vue / Twitter API',
    cta: 'View Repository',
    href: 'https://github.com/stvlynn/twi.am',
  },
];

export const RESEARCH_AND_EXPERIMENTS: ProjectCardData[] = [
  {
    title: 'Dify Plugin Suite',
    description: 'RSSHub, SSH, DOC, PPT, ffmpeg, LM Studio, and more workflow plugins.',
    tag: 'Python / Dify',
    image:
      'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'Automation and plugin development',
    cta: 'Explore Plugins',
    href: 'https://github.com/stvlynn?tab=repositories&q=Dify-Plugin',
  },
  {
    title: 'LLM Models on Hugging Face',
    description: 'Reflection-Chinese-32B, Gemma-2 Chinese IT, and Qwen Cantonese variants.',
    tag: 'Chinese LLMs',
    image:
      'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=800',
    imageAlt: 'AI model research workspace',
    cta: 'View Models',
    href: 'https://huggingface.co/stvlynn',
  },
];
