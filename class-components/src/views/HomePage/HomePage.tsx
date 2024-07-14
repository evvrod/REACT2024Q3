import { useState, useEffect } from 'react';
import { Outlet, useSearchParams, useNavigate } from 'react-router-dom';

import fetchStarWarsSearch, {
  Character,
} from '../../services/apiStarWarsSearch';

import SearchBar from '../../components/SearchBar/SearchBar';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import Spinner from '../../components/Spinner/Spinner';

import styles from './HomePage.module.css';

export default function HomePage() {
  const [, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [query] = useState('');

  const [previous, setPrevious] = useState<boolean>(false);
  const [next, setNext] = useState<boolean>(false);

  async function getCharacters(searchQuery: string, searchPage?: number) {
    try {
      setLoading(true);
      const items = await fetchStarWarsSearch(searchQuery, searchPage);
      setLoading(false);

      setCharacters(items.results);
      setPrevious(Boolean(items.previous));
      setNext(Boolean(items.next));
    } catch (err) {
      if (err instanceof Error) {
        navigate(`/error`);
      }
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = async (searchQuery: string) => {
    await getCharacters(searchQuery);
    setSearchParams({ page: '1', query: searchQuery || 'all' });
  };

  const handleChangePage = async (searchPage: number) => {
    await getCharacters(query, searchPage);
    setSearchParams({ page: String(searchPage), query: query || 'all' });
  };

  useEffect(() => {
    handleSearch(query);
  }, []);

  return (
    <>
      <div className={styles.searchBlock}>
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.leftColumn}>
          {loading && <Spinner />}
          {!loading && <CardList items={characters} />}
          {!loading && (
            <Pagination
              onChangePage={handleChangePage}
              hasNext={next}
              hasPrevious={previous}
            />
          )}
        </div>
        <div className={styles.rightColumn}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
