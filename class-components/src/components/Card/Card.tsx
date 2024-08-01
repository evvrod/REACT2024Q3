'use client';

import Link from 'next/link';

import { useState, useEffect } from 'react';

import { useSearchParams } from 'next/navigation';

import { ICharacter } from '../../interfaces/Characters';
import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { itemsSlice } from '../../lib/features/Items';

import styles from './Card.module.css';

interface PropsCard {
  id: number;
  character: ICharacter;
}

export default function Card(props: PropsCard) {
  const searchParams = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page');

  const { id, character } = props;

  const { items } = useAppSelector((state) => state.itemsReducer);
  const { addItem, removeItem } = itemsSlice.actions;
  const dispatch = useAppDispatch();

  const [isChecked, setIsChecked] = useState(
    items.some((item) => item.id === id),
  );

  useEffect(() => {
    setIsChecked(items.some((item) => item.id === id));
  }, [items]);

  function handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.target;
    setIsChecked(checked);
    if (checked) {
      dispatch(addItem({ ...character, id }));
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
            href={{
              pathname: `/details/${id}`,
              query: { query, page },
            }}
          >
            <h2>{character.name}</h2>
          </Link>
        </label>
      </div>
      <ul>
        <li>birth year : {character.birth_year}</li>
        <li>gender : {character.gender}</li>
      </ul>
    </div>
  );
}
