import React from 'react';

import fetchGetCharacters from '../../services/ApiGetCharacters';
import extractIdFromUrl from '../../utils/extractIdFromUrl';

import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';

interface CardListProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function CardList({
  searchParams,
}: CardListProps): Promise<React.ReactNode> {
  const { query, page } = searchParams;
  let data;
  if (query === 'all') {
    data = await fetchGetCharacters('', Number(page));
  } else {
    data = await fetchGetCharacters(query, Number(page));
  }

  return (
    <>
      {data.results && data.results.length === 0 && (
        <div>No results found.</div>
      )}
      {data.results &&
        data.results.map((item) => {
          const id = extractIdFromUrl(item.url);
          if (id) return <Card key={id} character={item} id={id} />;
          return null;
        })}
      {data.results && data.results.length !== 0 && (
        <Pagination next={data.next} previous={data.previous} />
      )}
    </>
  );
}
