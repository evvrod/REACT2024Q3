import { Component } from 'react';
import styles from './Spinner.module.css';

class Spinner extends Component {
  render() {
    return (
      <div className={styles['spinner-overlay']}>
        <div
          role="progressbar"
          aria-label="Loading"
          className={styles['spinner-container']}
        />
      </div>
    );
  }
}

export default Spinner;
