'use client';

import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../lib/hooks';
import { itemsSlice } from '../../lib/features/Items';
import exportToCSV from '../../utils/exportToCSV';

import Button from '../Button/Button';

import styles from './Modal.module.css';

export default function Modal() {
  const { items } = useAppSelector((state) => state.itemsReducer);
  const { removeAll } = itemsSlice.actions;
  const dispatch = useAppDispatch();

  const handleClickUnselect = useCallback(() => {
    dispatch(removeAll());
  }, []);

  const handleClickDownload = useCallback(() => {
    exportToCSV(items);
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div className={styles.modal}>
      <h3>{items.length} items are selected</h3>
      <Button className={styles.navigationButton} onClick={handleClickUnselect}>
        Unselect all
      </Button>
      <Button className={styles.navigationButton} onClick={handleClickDownload}>
        Download
      </Button>
    </div>
  );
}
