import styles from './Close.module.css';

interface PropsClose {
  handlerClickClose: () => void;
}

export default function Close(props: PropsClose) {
  const { handlerClickClose } = props;
  return (
    <button type="button" className={styles.closeBtn} onClick={handlerClickClose}>
      <div className={styles.wrapper}>
        <div className={styles.leftright} />
        <div className={styles.rightleft} />
        <span className={styles.labelBtn}>Close</span>
      </div>
    </button>
  );
}
