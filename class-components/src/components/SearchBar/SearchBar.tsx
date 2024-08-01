'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import useLocalStorage from '../../hooks/useLocalStorage';

import Button from '../Button/Button';

import styles from './SearchBar.module.css';

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page');

  const [storedQuery, setStoredQuery] = useLocalStorage();
  const [textQuery, setTextQuery] = useState(storedQuery);

  useEffect(() => {
    if (query && page) {
      const searchQuery = query === 'all' ? '' : (query as string);
      setTextQuery(searchQuery);
    } else {
      router.push(`${pathname}?query=${storedQuery || 'all'}&page=1`);
    }
  }, [router]);

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const currentQuery = (
      form.elements.namedItem('search') as HTMLInputElement
    ).value.trim();
    setStoredQuery(currentQuery);
    router.push(`/?query=${currentQuery || 'all'}&page=1`);
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
