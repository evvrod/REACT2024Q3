import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import { useAppDispatch } from '../../hooks/useRedux';
import { currentQuerySlice } from '../../store/reducers/CurrentQuery';
import { currentPageSlice } from '../../store/reducers/CurrentPage';

import useLocalStorage from '../../hooks/useLocalStorage';

import Button from '../Button/Button';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const router = useRouter();

  const { setQuery } = currentQuerySlice.actions;
  const { setPage } = currentPageSlice.actions;
  const dispatch = useAppDispatch();

  const [storedQuery, setStoredQuery] = useLocalStorage();
  const [textQuery, setTextQuery] = useState(storedQuery);

  useEffect(() => {
    const { query, page } = router.query;

    if (query && page) {
      const searchQuery = query === 'all' ? '' : (query as string);
      dispatch(setQuery(searchQuery));
      dispatch(setPage(Number(page)));
      setTextQuery(searchQuery);
    } else {
      dispatch(setQuery(storedQuery));
      router.push({
        pathname: '/',
        query: { page: '1', query: storedQuery || 'all' },
      });
    }
  }, [router.query]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const currentQuery = (
      form.elements.namedItem('search') as HTMLInputElement
    ).value.trim();
    setStoredQuery(currentQuery);
    dispatch(setQuery(currentQuery));
    dispatch(setPage(1));
    router.push({
      pathname: router.pathname,
      query: { query: currentQuery || 'all', page: String(1) },
    });
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
