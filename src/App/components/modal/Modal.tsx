import React from 'react';
import styles from './Modal.module.scss';

type TProps = {
  children: React.ReactElement;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
};

function Modal({ children, setActive }: TProps) {
  return (
    <div className={styles.wrapper}>
      <button className={`${styles.modal} ${styles.modal__active}`} type="button" onClick={() => setActive(false)}>
        lul
      </button>
      <div className={styles.modal__content}>{children}</div>
    </div>
  );
}

export default Modal;