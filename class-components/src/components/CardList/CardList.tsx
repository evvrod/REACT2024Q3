import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';
import extractIdFromUrl from '../../utils/extractIdFromUrl';

import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import Pagination from '../Pagination/Pagination';

import CharactersApi from '../../services/CharacterService';

import styles from './CardList.module.css';

export default function CardList() {
  const { query } = useAppSelector((state) => state.currentQueryReducer);
  const { page } = useAppSelector((state) => state.currentPageReducer);

  const navigate = useNavigate();

  const { data, isFetching, isError } = CharactersApi.useFetchCharactersQuery({
    query,
    page,
  });

  const handelCloseDetails = () => {
    navigate(`/?query=${query}&page=${page}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handelCloseDetails();
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
        onClick={handelCloseDetails}
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyPress}
        aria-label="Close details"
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
