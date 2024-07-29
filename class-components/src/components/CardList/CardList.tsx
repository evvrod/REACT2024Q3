import { useRouter } from 'next/router';
import { useAppSelector } from '../../hooks/useRedux';
import extractIdFromUrl from '../../utils/extractIdFromUrl';

import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import Pagination from '../Pagination/Pagination';

import CharactersApi from '../../services/CharacterService';

import styles from './CardList.module.css';

export default function CardList() {
  const router = useRouter();

  const { query } = useAppSelector((state) => state.currentQueryReducer);
  const { page } = useAppSelector((state) => state.currentPageReducer);

  const { data, isFetching, isError } = CharactersApi.useFetchCharactersQuery({
    query,
    page,
  });

  const handelCloseDetails = (event: React.MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== 'H2') {
      router.push({
        pathname: '/',
        query: { query, page },
      });
    }
  };

  const handelKeyCloseDetails = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter') {
      router.push({
        pathname: '/',
        query: { query, page },
      });
    }
  };

  if (isFetching) return <Spinner />;

  if (isError)
    return (
      <div>
        Error: Invalid query parameters. Please check your input and try again.
      </div>
    );

  return (
    <>
      <div
        className={styles.cardList}
        onClick={(event) => handelCloseDetails(event)}
        role="button"
        tabIndex={0}
        aria-label="Close details"
        onKeyDown={(event) => handelKeyCloseDetails(event)}
      >
        {data?.results.length === 0 && <div>No results found.</div>}
        {data?.results.map((item) => {
          const id = extractIdFromUrl(item.url);
          if (id) return <Card key={id} character={item} id={id} />;
          return null;
        })}
      </div>
      {data?.results.length !== 0 && <Pagination />}
    </>
  );
}
