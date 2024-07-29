import React from 'react';
import { useAppSelector } from '../../hooks/useRedux';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

import SearchBar from '../SearchBar/SearchBar';
import CardList from '../CardList/CardList';
import Modal from '../Modal/Modal';

import styles from './LayoutHome.module.css';

interface LayoutHomeProps {
  children: React.ReactNode;
}

export default function LayoutHome({ children }: LayoutHomeProps) {
  const { items } = useAppSelector((state) => state.itemsReducer);

  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <SearchBar />
        <div className={styles.wrapper}>
          <div className={styles['left-column']}>
            <CardList />
          </div>
          <div className={styles['right-column']}>{children}</div>
          {items.length !== 0 && <Modal />}
        </div>
      </main>
      <Footer />
    </div>
  );
}
