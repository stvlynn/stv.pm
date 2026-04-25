import styles from './ProjectCard.module.css';

export type ProjectCardData = {
  title: string;
  description?: string;
  tag: string;
  image: string;
  imageAlt: string;
  cta: string;
  href: string;
};

type ProjectCardProps = ProjectCardData & {
  variant?: 'default' | 'featured';
};

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
  const cardClassName = [
    'grid-item',
    styles.card,
    isFeatured ? styles.featured : '',
  ]
    .filter(Boolean)
    .join(' ');

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
          {description ? <p>{description}</p> : null}
          <span className={`pill-tag ${styles.pill}`}>{tag}</span>
        </header>
      ) : (
        <div className={styles.metaTop}>
          <div className={styles.title}>{title}</div>
          {description ? <div className={styles.desc}>{description}</div> : null}
          <span className="pill-tag">{tag}</span>
        </div>
      )}

      <div className={styles.imgContainer}>
        <img src={image} alt={imageAlt} className={styles.img} loading="lazy" />
      </div>

      <span className={styles.action}>{cta}</span>
    </a>
  );
}
