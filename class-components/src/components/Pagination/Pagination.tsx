'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

import Button from '../Button/Button';

import styles from './Pagination.module.css';

interface IPaginationProps {
  next: string | null;
  previous: string | null;
}

export default function Pagination({ next, previous }: IPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page');

  const handleClickNext = useCallback(() => {
    if (next && page) {
      router.push(`/?query=${query || 'all'}&page=${Number(page) + 1}`);
    }
  }, [page, query]);

  const handleClickBack = useCallback(() => {
    if (previous && page) {
      router.push(`/?query=${query || 'all'}&page=${Number(page) - 1}`);
    }
  }, [page, query]);

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.navigationButton}
        onClick={handleClickBack}
        disabled={!previous}
      >
        Previous
      </Button>
      <div>{page}</div>
      <Button
        className={styles.navigationButton}
        onClick={handleClickNext}
        disabled={!next}
      >
        Next
      </Button>
    </div>
  );
}
