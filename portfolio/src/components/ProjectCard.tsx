import { useEffect, useMemo, useState } from 'react';
import styles from './ProjectCard.module.css';

export type ProjectCardData = {
  title: string;
  description?: string;
  tag: string;
  image?: string;
  imageAlt?: string;
  cta: string;
  href: string;
};

type ProjectCardProps = ProjectCardData & {
  variant?: 'default' | 'featured';
};

type GitHubRepoResponse = {
  description: string | null;
};

function getGitHubRepoApiUrl(href: string) {
  try {
    const url = new URL(href);

    if (url.hostname !== 'github.com') {
      return null;
    }

    const [owner, repo] = url.pathname.split('/').filter(Boolean);

    if (!owner || !repo) {
      return null;
    }

    return `https://api.github.com/repos/${owner}/${repo}`;
  } catch {
    return null;
  }
}

export function ProjectCard({
  title,
  description,
  tag,
  image,
  imageAlt,
  cta,
  href,
  variant = 'default',
}: ProjectCardProps) {
  const isFeatured = variant === 'featured';
  const isExternal = href.startsWith('http');
  const repoApiUrl = useMemo(() => getGitHubRepoApiUrl(href), [href]);
  const [githubDescription, setGithubDescription] = useState<string | null>(null);
  const displayDescription = githubDescription ?? description;
  const cardClassName = [
    'grid-item',
    styles.card,
    isFeatured ? styles.featured : '',
  ]
    .filter(Boolean)
    .join(' ');

  useEffect(() => {
    if (isFeatured || !repoApiUrl) {
      return;
    }

    const controller = new AbortController();

    fetch(repoApiUrl, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`GitHub API responded with ${response.status}`);
        }

        return response.json() as Promise<GitHubRepoResponse>;
      })
      .then((repo) => {
        if (repo.description) {
          setGithubDescription(repo.description);
        }
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return;
        }
      });

    return () => {
      controller.abort();
    };
  }, [isFeatured, repoApiUrl]);

  return (
    <a
      href={href}
      className={cardClassName}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {isFeatured ? (
        <header className={styles.featuredInfo}>
          <h3>{title}</h3>
          {displayDescription ? <p>{displayDescription}</p> : null}
          <span className={`pill-tag ${styles.pill}`}>{tag}</span>
        </header>
      ) : (
        <div className={styles.metaTop}>
          <div className={styles.title}>{title}</div>
          {displayDescription ? <div className={styles.desc}>{displayDescription}</div> : null}
        </div>
      )}

      {isFeatured && image ? (
        <div className={styles.imgContainer}>
          <img src={image} alt={imageAlt ?? title} className={styles.img} loading="lazy" />
        </div>
      ) : null}

      {isFeatured ? (
        <span className={styles.action}>{cta}</span>
      ) : (
        <span className={styles.pixelArrow} aria-hidden="true">
          ↗
        </span>
      )}
    </a>
  );
}
