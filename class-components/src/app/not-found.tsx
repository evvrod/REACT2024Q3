import Link from 'next/link';

import styles from './not-found.module.css';

export default function NotFound() {
  // setTimeout(() => {
  //   redirect('/');
  // }, 5000);

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
