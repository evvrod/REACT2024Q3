import { useState, useRef, useEffect, Dispatch, SetStateAction } from 'react';

export default function useSearchQuery(): [
  string,
  Dispatch<SetStateAction<string>>,
] {
  const [query, setQuery] = useState(() => {
    const savedQuery = localStorage.getItem('searchQuery');
    return savedQuery || '';
  });
  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  useEffect(
    () => () => {
      localStorage.setItem('searchQuery', queryRef.current);
    },
    [],
  );

  return [query, setQuery];
}
