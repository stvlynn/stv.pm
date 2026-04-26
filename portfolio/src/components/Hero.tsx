import styles from './Hero.module.css';
import { StreamingHeroCopy } from './StreamingHeroCopy';

const HERO_IMAGE = '/images/hero-lynn.jpg';
const HERO_IMAGE_WEBP = '/images/hero-lynn.webp';

const PROFILE_LINKS = [
  { label: 'GitHub', href: 'https://github.com/stvlynn' },
  { label: 'X / @stv_lynn', href: 'https://x.com/stv_lynn' },
  { label: 'Blog', href: 'https://blog.stv.pm' },
  { label: "Steven's Diary", href: 'https://t.me/stv_diary' },
  { label: 'FirstLab', href: 'https://discord.gg/PwZDHH4mv3' },
  { label: 'Telegram', href: 'https://t.me/stvlynn' },
  { label: 'Hugging Face', href: 'https://huggingface.co/stvlynn' },
  { label: 'Email', href: 'mailto:i@stv.pm' },
];

export function Hero() {
  return (
    <div className={`grid-system ${styles.heroGrid}`}>
      <section className={`grid-item ${styles.statement}`}>
        <StreamingHeroCopy />
        <div className={styles.sub}>Current Focus ➞ Build Value Together With AI</div>
        <div className={styles.meta}>
          <span>140 public repos</span>
          <span>Chinese / English / Japanese</span>
          <span>127.0.0.1</span>
          <span>--dangerously-skip-permissions</span>
        </div>
        <div className={styles.links} aria-label="Profile links">
          {PROFILE_LINKS.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer">
              {link.label} ↗
            </a>
          ))}
        </div>
      </section>
      <aside className={`grid-item ${styles.visual}`} aria-label="Hero artwork">
        <picture>
          <source srcSet={HERO_IMAGE_WEBP} type="image/webp" />
          <img
            src={HERO_IMAGE}
            alt="Anime-style landscape illustration with a running character"
            width="1200"
            height="1823"
            decoding="async"
            fetchPriority="high"
          />
        </picture>
      </aside>
    </div>
  );
}
