import { Link, useLocation } from 'react-router-dom';

import { Character } from '../../services/apiStarWarsSearch';

interface PropsCard {
  id: number;
  item: Character;
}

export default function Card(props: PropsCard) {
  const { id, item } = props;
  const location = useLocation();
  const query = location.search.substring(1);

  return (
    <div>
      <Link to={`/details/${id}/?${query}` } onClick={(event) => event.stopPropagation()}>
        <h2>{item.name}</h2>
      </Link>
      <ul>
        <li>birth year : {item.birth_year}</li>
        <li>gender : {item.gender}</li>
      </ul>
    </div>
  );
}
