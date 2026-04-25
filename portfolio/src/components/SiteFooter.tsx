import styles from './SiteFooter.module.css';

type FooterLink = {
  label: string;
  href: string;
};

const FOOTER_LINKS: FooterLink[] = [
  { label: 'Email / i@stv.pm', href: 'mailto:i@stv.pm' },
  { label: 'GitHub / stvlynn', href: 'https://github.com/stvlynn' },
  { label: 'X / Stv_Lynn', href: 'https://twitter.com/Stv_Lynn' },
  { label: 'Blog / blog.stv.pm', href: 'https://blog.stv.pm' },
  { label: 'Telegram / stvlynn', href: 'https://t.me/stvlynn' },
  { label: 'LinkedIn / hongyiling', href: 'https://www.linkedin.com/in/hongyiling' },
];

export function SiteFooter() {
  return (
    <footer id="contact" className={styles.footer}>
      <div className={styles.huge}>
        Thanks for <i>visiting</i>
      </div>
      <nav className={styles.links} aria-label="Footer">
        {FOOTER_LINKS.map((link) => {
          const isExternal = link.href.startsWith('http');

          return (
            <a
              key={link.label}
              href={link.href}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noreferrer' : undefined}
            >
              {link.label}
            </a>
          );
        })}
      </nav>
    </footer>
  );
}
