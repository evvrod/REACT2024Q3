import React from 'react';

import Header from '@components/Header/Header';
import Footer from '@components/Footer/Footer';
import SearchBar from '@components/SearchBar/SearchBar';
import CardList from '@components/CardList/CardList';
import Modal from '@components/Modal/Modal';

import { IApiCharacters } from '@interfaces/Characters';

import styles from './LayoutSearch.module.css';

interface ILayoutSearchProps {
  children: React.ReactNode;
  data: IApiCharacters;
}

export default function LayoutHome({ children, data }: ILayoutSearchProps) {
  return (
    <div className={styles.app}>
      <Header />
      <main className={styles.main}>
        <SearchBar />

        <div className={styles.wrapper}>
          <div className={styles['left-column']}>
            <CardList data={data} />
          </div>
          <div className={styles['right-column']}>{children}</div>
          <Modal />
        </div>
      </main>
      <Footer />
    </div>
  );
}
