import styles from './FieldNotes.module.css';

const FIELD_NOTES_IMAGE = '/images/field-notes.jpg';
const FIELD_NOTES_IMAGE_WEBP = '/images/field-notes.webp';

export function FieldNotes() {
  return (
    <section className={`grid-system ${styles.section}`} aria-label="Steven's field notes">
      <div className={`grid-item ${styles.copy}`}>
        <p className={styles.eyebrow}>Field Notes / Steven's Diary</p>
        <p>
          Between products, plugins, and community work, Steven keeps a visual
          notebook for ideas that still feel half-dream, half-system.
        </p>
        <a
          className={styles.link}
          href="https://t.me/stv_diary"
          target="_blank"
          rel="noreferrer"
        >
          Read the diary ↗
        </a>
      </div>
      <figure className={`grid-item ${styles.visual}`}>
        <picture>
          <source srcSet={FIELD_NOTES_IMAGE_WEBP} type="image/webp" />
          <img
            src={FIELD_NOTES_IMAGE}
            alt="Illustrated field notes page with an anime-style character running through a firefly meadow at dusk."
            loading="lazy"
          />
        </picture>
      </figure>
    </section>
  );
}
