import { useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { currentPageSlice } from '../../store/reducers/CurrentPage';

import CharactersApi from '../../services/CharacterService';

import styles from './Pagination.module.css';

export default function Pagination() {
  const { query } = useAppSelector((state) => state.currentQueryReducer);
  const { page } = useAppSelector((state) => state.currentPageReducer);
  const { increment, decrement } = currentPageSlice.actions;
  const dispatch = useAppDispatch();

  const { data } = CharactersApi.useFetchCharactersQuery({ page, query });

  const [, setSearchParams] = useSearchParams();

  function handleClickNext() {
    if (data?.next) {
      dispatch(increment());
      setSearchParams({ page: String(page + 1), query: query || 'all' });
    }
  }

  function handleClickBack() {
    if (data?.previous) {
      dispatch(decrement());
      setSearchParams({ page: String(page - 1), query: query || 'all' });
    }
  }

  return (
    <div className={styles.pagination}>
      <button
        type="button"
        className={styles.navigationButton}
        onClick={handleClickBack}
        disabled={!data?.previous}
      >
        Previous
      </button>
      <div>{page}</div>

      <button
        type="button"
        className={styles.navigationButton}
        onClick={handleClickNext}
        disabled={!data?.next}
      >
        Next
      </button>
    </div>
  );
}
