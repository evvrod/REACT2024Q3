import React from 'react';

import styles from './Spinner.module.css';

export default function Spinner(): React.ReactNode {
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
