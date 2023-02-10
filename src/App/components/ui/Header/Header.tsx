import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../../modal/Modal';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './Header.module.scss';
import { changeCurrentLanguage, getLocalizedText } from '../../../services/localizationService';

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
          <p>{getLocalizedText('centerDescription')}</p>
          <p>{getLocalizedText('callCenter')}</p>
          <div className={styles.language}>
            <button className={styles.language__selector} type="button" onClick={changeCurrentLanguage}>en</button>
            <button className={styles.language__selector} type="button" onClick={changeCurrentLanguage}>ru</button>
          </div>
        </div>
      </div>
      <nav>
        <ul className={styles.navigation}>
          <li>
            <NavLink className={styles.navigation__logo} to="/" />
          </li>
          <li>
            <NavLink className={styles.navigation__link} to="/">
              {getLocalizedText('main')}
            </NavLink>
          </li>
          <li>{getLocalizedText('doctors')}</li>
          <li>{getLocalizedText('services')}</li>
          <li>{getLocalizedText('contacts')}</li>
          {isLogIn && isAdmin ? (
            <li className={styles.navigation__buttons}>
              <NavLink className={styles.navigation__btn} to="dashboard">
                Admin Dashboard
              </NavLink>
            </li>
          ) : (
            <li className={styles.navigation__buttons}>
              <button type="button" className={styles.navigation__btn} onClick={() => handleButton('register')}>
                {getLocalizedText('register')}
              </button>
              <button type="button" className={styles.navigation__btn} onClick={() => handleButton('login')}>
                {getLocalizedText('login')}
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
