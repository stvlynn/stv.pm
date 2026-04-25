import { Dify, TencentCloud } from '@lobehub/icons';
import { WORK_EXPERIENCES, type ExperienceItem } from '../data/experience';
import styles from './WorkExperience.module.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/hongyiling/';

function CompanyIcon({ item }: { item: ExperienceItem }) {
  const iconProps = {
    'aria-hidden': true,
    size: 42,
  };

  if (item.icon === 'dify') {
    return <Dify.Color {...iconProps} />;
  }

  return <TencentCloud.Color {...iconProps} />;
}

export function WorkExperience() {
  return (
    <section className={`grid-system ${styles.section}`} aria-labelledby="experience">
      <div className={`grid-item ${styles.intro}`}>
        <div>
          <p className={styles.eyebrow}>Work / Operations</p>
          <p className={styles.copy}>
            Product and community operations across AI application builders,
            cloud platforms, and developer-facing workflows.
          </p>
        </div>
        <a
          className={styles.profileLink}
          href={LINKEDIN_URL}
          target="_blank"
          rel="noreferrer"
        >
          Read full on LinkedIn ↗
        </a>
      </div>

      <div className={`grid-item ${styles.timeline}`}>
        {WORK_EXPERIENCES.map((item) => (
          <article className={styles.card} key={item.company}>
            <div className={styles.iconFrame}>
              <CompanyIcon item={item} />
            </div>
            <div className={styles.body}>
              <div className={styles.meta}>
                <span>{item.period}</span>
                <span>{item.role}</span>
              </div>
              <h3>{item.company}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
