import { useState } from 'react';

import styles from './SearchBar.module.css';

interface PropsSearchBar {
  onSearch: (query: string) => void;
}

export default function SearchBar(props: PropsSearchBar) {
  const [storedQuery, setStoredQuery] = useState('');
  const { onSearch } = props;

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const currentQuery = form.search.value.trim();
    onSearch(currentQuery);
    setStoredQuery(currentQuery);
    localStorage.setItem('searchQuery', storedQuery);
  }

  function handleInputChange(event: React.ChangeEvent) {
    const element = event.target as HTMLInputElement;
    setStoredQuery(element.value);
  }

  return (
    <form className={styles.searchBar} onSubmit={handleSearch}>
      <input
        name="search"
        type="text"
        value={storedQuery}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
