import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useRedux';
import { currentQuerySlice } from '../../store/reducers/CurrentQuery';
import { currentPageSlice } from '../../store/reducers/CurrentPage';

import useLocalStorage from '../../hooks/useLocalStorage';

import Button from '../Button/Button';

import styles from './SearchBar.module.css';

export default function SearchBar() {
  const { setQuery } = currentQuerySlice.actions;
  const { setPage } = currentPageSlice.actions;
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const [storedQuery, setStoredQuery] = useLocalStorage();
  const [textQuery, setTextQuery] = useState(storedQuery);

  useEffect(() => {
    let query = searchParams.get('query');
    const page = Number(searchParams.get('page'));
    if (query && page) {
      if (query === 'all') query = '';
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
    const currentQuery = (
      form.elements.namedItem('search') as HTMLInputElement
    ).value.trim();
    setStoredQuery(currentQuery);
    dispatch(setQuery(currentQuery));
    dispatch(setPage(1));
    setSearchParams({ query: currentQuery || 'all', page: String(1) });
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target as HTMLInputElement;
    const currentQuery = input.value;
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
      <Button type="submit">Search</Button>
    </form>
  );
}
