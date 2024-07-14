import { useNavigate, useLocation } from 'react-router-dom';

import { Character } from '../../services/apiStarWarsSearch';

import extractIdFromUrl from '../../utils/extractIdFromUrl';
import Card from '../Card/Card';

import styles from './CardList.module.css';

interface PropsCardList {
  items: Character[];
}

export default function CardList(props: PropsCardList) {
  const { items } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const query = location.search.substring(1);

  const handelCloseDetails = () => {
    navigate(`/?${query}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter') {
      handelCloseDetails();
    }
  };

  return (
    <div
      className={styles.cardList}
      onClick={handelCloseDetails}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyPress}
      aria-label="Close details"
    >
      {items.length === 0 && <div>No results found.</div>}
      {items.map((item) => {
        const id = extractIdFromUrl(item.url);
        if (id) return <Card key={id} item={item} id={id} />;
        return null;
      })}
    </div>
  );
}
