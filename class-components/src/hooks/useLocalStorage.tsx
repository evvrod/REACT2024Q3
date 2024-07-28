import { useState, useEffect, Dispatch, SetStateAction } from 'react';

export default function useLocalStorage(): [
  string,
  Dispatch<SetStateAction<string>>,
] {
  const [query, setQuery] = useState(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    return savedQuery || '';
  });

  useEffect(() => {
    localStorage.setItem('searchQuery', query);
  }, [query]);

  return [query, setQuery];
}
