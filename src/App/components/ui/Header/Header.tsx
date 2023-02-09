import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../../modal/Modal';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './Header.module.scss';

function Header() {
  const isLogIn = true;
  const isAdmin = false;
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentModal, setCurrentModal] = useState<'register' | 'login'>('register');

  function handleButton(btn: 'register' | 'login') {
    setCurrentModal(btn);
    setIsModalActive(true);
  }

  return (
    <header className={styles.header}>
      <div className={styles.topinfo__wrapper}>
        <div className={styles.topinfo}>
          <p>Medical center for extraordinary people</p>
          <p>phone: +1 234 567-89-01 (call-center)</p>
          <p>en / ru</p>
        </div>
      </div>
      <nav>
        <ul className={styles.navigation}>
          <li>
            <NavLink className={styles.navigation__logo} to="/" />
          </li>
          <li>
            <NavLink className={styles.navigation__link} to="/">
              Main
            </NavLink>
          </li>
          <li>Doctors</li>
          <li>Services</li>
          <li>Contacts</li>
          {isLogIn && isAdmin ? (
            <li className={styles.navigation__buttons}>
              <NavLink className={styles.navigation__btn} to="dashboard">
                Admin Dashboard
              </NavLink>
            </li>
          ) : (
            <li className={styles.navigation__buttons}>
              <button type="button" className={styles.navigation__btn} onClick={() => handleButton('register')}>
                Register
              </button>
              <button type="button" className={styles.navigation__btn} onClick={() => handleButton('login')}>
                Login
              </button>
            </li>
          )}
        </ul>
      </nav>
      {isModalActive && (
        <Modal setActive={setIsModalActive}>
          {currentModal === 'register'
            ? <RegisterForm setCurrentModal={setCurrentModal} />
            : <LoginForm setCurrentModal={setCurrentModal} />}
        </Modal>
      )}
    </header>
  );
}

export default Header;
