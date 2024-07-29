import { useRouter } from 'next/router';
import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { currentPageSlice } from '../../store/reducers/CurrentPage';

import CharactersApi from '../../services/CharacterService';

import Button from '../Button/Button';

import styles from './Pagination.module.css';

export default function Pagination() {
  const { query } = useAppSelector((state) => state.currentQueryReducer);
  const { page } = useAppSelector((state) => state.currentPageReducer);
  const { increment, decrement } = currentPageSlice.actions;
  const dispatch = useAppDispatch();

  const { data } = CharactersApi.useFetchCharactersQuery({ page, query });
  const router = useRouter();

  const handleClickNext = useCallback(() => {
    if (data?.next) {
      dispatch(increment());
      router.push({
        pathname: '/',
        query: { page: String(page + 1), query: query || 'all' },
      });
    }
  }, [data?.next, dispatch, increment, page, query, router]);

  const handleClickBack = useCallback(() => {
    if (data?.previous) {
      dispatch(decrement());
      router.push({
        pathname: '/',
        query: { page: String(page - 1), query: query || 'all' },
      });
    }
  }, [data?.previous, dispatch, increment, page, query, router]);

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.navigationButton}
        onClick={handleClickBack}
        disabled={!data?.previous}
      >
        Previous
      </Button>
      <div>{page}</div>

      <Button
        className={styles.navigationButton}
        onClick={handleClickNext}
        disabled={!data?.next}
      >
        Next
      </Button>
    </div>
  );
}
