import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';

import { ThemeProvider } from '../../context/ThemeContext';

import styles from './Layout.module.css';

export default function Layout() {
  return (
    <ThemeProvider>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
