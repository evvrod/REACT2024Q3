import starWarsLogo from '../../assets/Star_Wars_Logo.svg';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <img src={starWarsLogo} alt="Star Wars logo" className={styles.icon} />
    </header>
  );
}
