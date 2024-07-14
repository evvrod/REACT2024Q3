import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './Pagination.module.css';

interface PropsPagination {
  onChangePage: (page: number) => void;
  hasNext: boolean;
  hasPrevious: boolean;
}

export default function Pagination(props: PropsPagination) {
  const { onChangePage, hasNext, hasPrevious } = props;
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(
    parseInt(searchParams.get('page') || '1', 10),
  );

  function handleClickNext() {
    if (hasNext) {
      const currentPage = page + 1;
      onChangePage(currentPage);
      setPage(currentPage);
    }
  }

  function handleClickBack() {
    if (hasPrevious) {
      const currentPage = page - 1;
      onChangePage(currentPage);
      setPage(currentPage);
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.navigationButton}
        onClick={handleClickBack}
        disabled={!hasPrevious}
      >
        Previous
      </button>
      <div>{page}</div>

      <button
        type="button"
        className={styles.navigationButton}
        onClick={handleClickNext}
        disabled={!hasNext}
      >
        Next
      </button>
    </div>
  );
}
