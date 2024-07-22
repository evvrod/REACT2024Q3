import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useRedux';
import { currentQuerySlice } from '../../store/reducers/CurrentQuery';
import { currentPageSlice } from '../../store/reducers/CurrentPage';

import useLocalStorage from '../../hooks/useLocalStorage';

import styles from './SearchBar.module.css';

export default function SearchBar() {
  const { setQuery } = currentQuerySlice.actions;
  const { setPage } = currentPageSlice.actions;
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [storedQuery, setStoredQuery] = useLocalStorage();
  const [textQuery, setTextQuery] = useState(storedQuery);

  useEffect(() => {
    const query = searchParams.get('query');
    const page = Number(searchParams.get('page'));
    if (query && page) {
      dispatch(setQuery(query));
      dispatch(setPage(page));
      setTextQuery(query);
    } else {
      dispatch(setQuery(storedQuery));
      setSearchParams({
        page: '1',
        query: storedQuery || 'all',
      });
    }
  }, [searchParams]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const currentQuery = form.search.value.trim();
    setStoredQuery(currentQuery);
    dispatch(setQuery(currentQuery));
    dispatch(setPage(1));
    setSearchParams({ page: String(1), query: currentQuery || 'all' });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target as HTMLInputElement;
    const currentQuery = input.value.trim();
    setTextQuery(currentQuery);
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        name="search"
        value={textQuery}
        type="text"
        placeholder="Search..."
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
}
