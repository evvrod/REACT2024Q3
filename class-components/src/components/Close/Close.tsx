import styles from './Close.module.css';

interface PropsClose {
  handlerClickClose: () => void;
}

export default function Close(props: PropsClose) {
  const { handlerClickClose } = props;
  return (
    <button
      type="button"
      className={styles['close-btn']}
      onClick={handlerClickClose}
    >
      <div className={styles.wrapper}>
        <div className={styles.leftright} />
        <div className={styles.rightleft} />
        <span className={styles['label-btn']}>Close</span>
      </div>
    </button>
  );
}
