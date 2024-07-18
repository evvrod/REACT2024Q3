import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { itemsSlice } from '../../store/reducers/Items';
import exportToCSV from '../../utils/exportToCSV';

import styles from './Modal.module.css';

export default function Pagination() {
  const { items } = useAppSelector((state) => state.itemsReducer);
  const { removeAll } = itemsSlice.actions;
  const dispatch = useAppDispatch();
  function handleClickUnselect() {
    dispatch(removeAll());
  }

  function handleClickDownload() {
    exportToCSV(items);
  }

  return (
    <div className={styles.modal}>
      <h3>{items.length} items are selected</h3>
      <button
        type="button"
        className={styles.navigationButton}
        onClick={handleClickUnselect}
      >
        Unselect all
      </button>
      <button
        type="button"
        className={styles.navigationButton}
        onClick={handleClickDownload}
      >
        Download
      </button>
    </div>
  );
}
