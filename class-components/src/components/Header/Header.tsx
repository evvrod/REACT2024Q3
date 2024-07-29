import starWarsLogo from '../../assets/Star_Wars_Logo.svg';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <img
        src={starWarsLogo.src}
        alt="Star Wars logo"
        className={styles.icon}
      />
      <ThemeToggle />
    </header>
  );
}
