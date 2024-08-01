'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';
import Link from 'next/link';

import styles from './global-error.module.css';

export default function Error() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, [router]);

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <p className={styles.text}>
          <span>Ops... Something went wrong. Go </span>
          <Link href="/" className={styles.text}>
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
