import React from 'react';

import { IApiCharacters } from '@interfaces/Characters';

import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';

import extractIdFromUrl from '../../utils/extractIdFromUrl';

export default function CardList({
  data,
}: {
  data: IApiCharacters;
}): React.ReactNode {
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
