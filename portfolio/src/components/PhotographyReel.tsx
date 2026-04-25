import { PHOTO_WORKS } from '../data/photography';
import styles from './PhotographyReel.module.css';

const REEL_ITEMS = [...PHOTO_WORKS, ...PHOTO_WORKS];

export function PhotographyReel() {
  return (
    <section className={`grid-system ${styles.section}`} aria-labelledby="photography">
      <div className={`grid-item ${styles.intro}`}>
        <div>
          <p className={styles.eyebrow}>Unsplash / @stvlynn</p>
          <p className={styles.copy}>
            Steven is an amateur landscape photographer based in Hong Kong,
            sharing 135 free photos on Unsplash.
          </p>
        </div>
        <a
          className={styles.profileLink}
          href="https://unsplash.com/@stvlynn"
          target="_blank"
          rel="noreferrer"
        >
          View Full Portfolio ↗
        </a>
      </div>

      <div className={`grid-item ${styles.reel}`} aria-label="Scrolling photography portfolio">
        <div className={styles.track}>
          {REEL_ITEMS.map((photo, index) => (
            <a
              key={`${photo.href}-${index}`}
              className={styles.photoCard}
              href={photo.href}
              target="_blank"
              rel="noreferrer"
              aria-hidden={index >= PHOTO_WORKS.length ? 'true' : undefined}
              tabIndex={index >= PHOTO_WORKS.length ? -1 : undefined}
            >
              <img src={photo.image} alt={photo.title} loading="lazy" />
              <span>{photo.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
