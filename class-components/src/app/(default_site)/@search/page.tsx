import { Suspense } from 'react';

import SearchBar from '@components/SearchBar/SearchBar';
import CardList from '@components/CardList/CardList';
import Spinner from '@components/Spinner/Spinner';

interface PageProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default function Page({ searchParams }: PageProps) {
  return (
    <>
      <SearchBar />
      <Suspense fallback={<Spinner />}>
        <CardList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
