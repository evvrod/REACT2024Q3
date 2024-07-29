import { useRouter } from 'next/router';

import Link from 'next/link';
import { useEffect } from 'react';

import styles from './404.module.css';

export default function ErrorPage() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, [router]);

  return (
    <div className={styles.background}>
      <div className={styles.wrapper}>
        <p className={styles.title}>ERROR 404</p>
        <p className={styles.text}>
          <span>Page not found. Go </span>
          <Link href="/" className={styles.text}>
            Home
          </Link>
        </p>
      </div>
    </div>
  );
}
