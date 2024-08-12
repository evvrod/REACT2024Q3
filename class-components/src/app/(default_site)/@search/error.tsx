'use client';

import Link from 'next/link';
import styles from './error.module.css';

export default function Error() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        <span> Error... Go </span>
        <Link href="/" className={styles.text}>
          Home
        </Link>
      </p>
    </div>
  );
}
