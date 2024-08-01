import fetchGetCharacters from '@services/ApiGetCharacters';
import extractIdFromUrl from '@utils/extractIdFromUrl';

import Card from '@components/Card/Card';
import Pagination from '@components/Pagination/Pagination';

interface CardListProps {
  searchParams: {
    query?: string;
    page?: string;
  };
}

export default async function CardList({ searchParams }: CardListProps) {
  const { query, page } = searchParams;
  let data;
  if (query === 'all') {
    data = await fetchGetCharacters('', Number(page));
  } else {
    data = await fetchGetCharacters(query, Number(page));
  }

  // const data = {
  //   count: 5,
  //   next: 'csdvfds',
  //   previous: null,
  //   results: [
  //     {
  //       name: 'R2-D2',
  //       height: '96',
  //       mass: '32',
  //       hair_color: 'n/a',
  //       skin_color: 'white, blue',
  //       eye_color: 'red',
  //       birth_year: '33BBY',
  //       gender: 'n/a',
  //       homeworld: 'https://swapi.dev/api/planets/8/',
  //       films: [],
  //       species: [],
  //       vehicles: [],
  //       starships: [],
  //       created: '2014-12-10T15:11:50.376000Z',
  //       edited: '2014-12-20T21:17:50.311000Z',
  //       url: 'https://swapi.dev/api/people/3/',
  //     },
  //     {
  //       name: 'R2-D2',
  //       height: '96',
  //       mass: '32',
  //       hair_color: 'n/a',
  //       skin_color: 'white, blue',
  //       eye_color: 'red',
  //       birth_year: '33BBY',
  //       gender: 'n/a',
  //       homeworld: 'https://swapi.dev/api/planets/8/',
  //       films: [],
  //       species: [],
  //       vehicles: [],
  //       starships: [],
  //       created: '2014-12-10T15:11:50.376000Z',
  //       edited: '2014-12-20T21:17:50.311000Z',
  //       url: 'https://swapi.dev/api/people/4/',
  //     },
  //     {
  //       name: 'R2-D2',
  //       height: '96',
  //       mass: '32',
  //       hair_color: 'n/a',
  //       skin_color: 'white, blue',
  //       eye_color: 'red',
  //       birth_year: '33BBY',
  //       gender: 'n/a',
  //       homeworld: 'https://swapi.dev/api/planets/8/',
  //       films: [],
  //       species: [],
  //       vehicles: [],
  //       starships: [],
  //       created: '2014-12-10T15:11:50.376000Z',
  //       edited: '2014-12-20T21:17:50.311000Z',
  //       url: 'https://swapi.dev/api/people/5/',
  //     },
  //     {
  //       name: 'R2-D2',
  //       height: '96',
  //       mass: '32',
  //       hair_color: 'n/a',
  //       skin_color: 'white, blue',
  //       eye_color: 'red',
  //       birth_year: '33BBY',
  //       gender: 'n/a',
  //       homeworld: 'https://swapi.dev/api/planets/8/',
  //       films: [],
  //       species: [],
  //       vehicles: [],
  //       starships: [],
  //       created: '2014-12-10T15:11:50.376000Z',
  //       edited: '2014-12-20T21:17:50.311000Z',
  //       url: 'https://swapi.dev/api/people/6/',
  //     },
  //     {
  //       name: 'R2-D2',
  //       height: '96',
  //       mass: '32',
  //       hair_color: 'n/a',
  //       skin_color: 'white, blue',
  //       eye_color: 'red',
  //       birth_year: '33BBY',
  //       gender: 'n/a',
  //       homeworld: 'https://swapi.dev/api/planets/8/',
  //       films: [],
  //       species: [],
  //       vehicles: [],
  //       starships: [],
  //       created: '2014-12-10T15:11:50.376000Z',
  //       edited: '2014-12-20T21:17:50.311000Z',
  //       url: 'https://swapi.dev/api/people/7/',
  //     },
  //   ],
  // };

  // const handelCloseDetails = (event: React.MouseEvent<HTMLElement>) => {
  //   const target = event.target as HTMLElement;
  //   if (target.tagName !== 'H2') {
  //     // router.push(`/?$query=${query}&page=${page}`);
  //   }
  // };

  // const handelKeyCloseDetails = (event: React.KeyboardEvent<HTMLElement>) => {
  //   if (event.key === 'Enter') {
  //     // router.push(`/?$query=${query}&page=${page}`);
  //   }
  // };

  // if (isError)
  //   return (
  //     <div>
  //       Error: Invalid query parameters. Please check your input and try again.
  //     </div>
  //   );

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
