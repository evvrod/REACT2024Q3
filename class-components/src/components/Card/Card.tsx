import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/useRedux';

import { itemsSlice } from '../../store/reducers/Items';

import styles from './Card.module.css';

interface PropsCard {
  id: number;
}

export default function Card(props: PropsCard) {
  const { id } = props;
  const location = useLocation();
  const query = location.search.substring(1);

  const { items } = useAppSelector((state) => state.itemsReducer);
  const { addItem, removeItem } = itemsSlice.actions;
  const dispatch = useAppDispatch();

  const [isChecked, setIsChecked] = useState(items.includes(id));

  useEffect(() => {
    setIsChecked(items.includes(id));
  }, [items]);

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    setIsChecked(checked);
    if (checked) {
      dispatch(addItem(id));
    } else {
      dispatch(removeItem(id));
    }
  }

  return (
    <div>
      <div className={styles.title}>
        <input
          id={`checkbox-${id}`}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          onClick={(event) => event.stopPropagation()}
        />
        <label htmlFor={`checkbox-${id}`}>
          <Link
            to={`/details/${id}/?${query}`}
            onClick={(event) => event.stopPropagation()}
          >
            <h2>{item.name}</h2>
          </Link>
        </label>
      </div>
      <ul>
        <li>birth year : {item.birth_year}</li>
        <li>gender : {item.gender}</li>
      </ul>
    </div>
  );
}
