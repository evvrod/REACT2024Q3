import githubLogo from '../../assets/github-logo.png';
import courseImage from '../../assets/RS.svg';

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <a
        href="https://github.com/evvrod"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-url"
      >
        <img src={githubLogo} alt="GitHub" className="footer-icon" />
        evvrod
      </a>

      <span>2024</span>

      <a
        href="https://rs.school/courses/reactjs"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-url"
      >
        <img src={courseImage} alt="Course" className="footer-icon" />
      </a>
    </footer>
  );
}
