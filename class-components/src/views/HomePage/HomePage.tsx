import { Outlet } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useRedux';

import SearchBar from '../../components/SearchBar/SearchBar';
import CardList from '../../components/CardList/CardList';
import Modal from '../../components/Modal/Modal';

import styles from './HomePage.module.css';

export default function HomePage() {
  const { items } = useAppSelector((state) => state.itemsReducer);

  return (
    <>
      <div className={styles.searchBlock}>
        <SearchBar />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.leftColumn}>
          <CardList />
        </div>
        <div className={styles.rightColumn}>
          <Outlet />
        </div>
        {items.length !== 0 && <Modal />}
      </div>
    </>
  );
}
