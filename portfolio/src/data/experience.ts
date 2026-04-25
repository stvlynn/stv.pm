export type ExperienceItem = {
  company: string;
  period: string;
  role: string;
  description: string;
  icon: 'dify' | 'tencent-cloud';
};

export const WORK_EXPERIENCES: ExperienceItem[] = [
  {
    company: 'Tencent Cloud',
    period: '2025.6 - Present',
    role: 'Product Operations',
    description:
      'Working on product operations for cloud and AI products, connecting user feedback, launch details, and growth experiments.',
    icon: 'tencent-cloud',
  },
  {
    company: 'Dify.ai',
    period: '2024.9 - 2025.5',
    role: 'Operations Intern',
    description:
      'Supported operations for the AI application platform, helping translate community signal and product context into useful workflows.',
    icon: 'dify',
  },
];
