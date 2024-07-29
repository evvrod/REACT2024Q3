import githubLogo from '../../assets/github-logo.png';
import courseImage from '../../assets/RS.svg';

import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://github.com/evvrod"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-url"
      >
        <img
          src={githubLogo.src}
          alt="GitHub"
          className={styles['footer-icon']}
        />
        evvrod
      </a>

      <span>2024</span>

      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-url"
      >
        <img
          src={courseImage.src}
          alt="Course"
          className={styles['footer-icon']}
        />
      </a>
    </footer>
  );
}
