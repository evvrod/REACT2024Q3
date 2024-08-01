'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './Close.module.css';

export default function Close(): React.ReactNode {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlerClickClose = () => {
    router.push(`/?${searchParams.toString()}`);
  };

  return (
    <button
      type="button"
      className={styles['close-btn']}
      onClick={handlerClickClose}
    >
      <div className={styles.wrapper}>
        <div className={styles.leftright} />
        <div className={styles.rightleft} />
        <span className={styles['label-btn']}>Close</span>
      </div>
    </button>
  );
}
