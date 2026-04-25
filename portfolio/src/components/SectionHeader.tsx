import type { ReactNode } from 'react';
import styles from './SectionHeader.module.css';

type SectionHeaderProps = {
  children: ReactNode;
  noBorderTop?: boolean;
  id?: string;
};

export function SectionHeader({
  children,
  noBorderTop = false,
  id,
}: SectionHeaderProps) {
  const className = noBorderTop
    ? `${styles.header} ${styles.noBorderTop}`
    : styles.header;

  return (
    <h2 id={id} className={className} data-cursor-target={id}>
      {children}
    </h2>
  );
}
