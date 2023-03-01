import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../../modal/Modal';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './Header.module.scss';

import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { getCurrentUserData, getIsLogin } from '../../../store/users';
import NavProfile from '../NavProfile/NavProfile';
import DarkMode from '../../DarkMode/DarkMode';
import { getLang, switchLang } from '../../../store/language';
import { locText } from '../../../services/locText';

function Header() {
  const isLogIn = useAppSelector(getIsLogin());
  const dispatch = useAppDispatch();
  const { username } = useAppSelector(getCurrentUserData());
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentModal, setCurrentModal] = useState<'register' | 'login'>('register');
  const currentLang = useAppSelector(getLang());
  const handleButton = (btn: 'register' | 'login') => {
    setCurrentModal(btn);
    setIsModalActive(true);
  };
  const changeLang = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e.currentTarget.textContent) {
      dispatch(switchLang(e.currentTarget.textContent));
    }
  };
  return (
    <header className={styles.header}>
      <div className={styles.topinfo__wrapper}>
        <div className={styles.topinfo}>
          <p>{locText('centerDescription', currentLang)}</p>
          <p>{locText('callCenter', currentLang)}</p>
          <div className={styles.language}>
            <button
              className={`${styles.language__selector} ${currentLang === 'en' ? styles.language__selector_active : ''}`}
              type="button"
              onClick={changeLang}
              disabled={currentLang === 'en'}
            >
              en
            </button>
            /
            <button
              className={`${styles.language__selector} ${currentLang === 'ru' ? styles.language__selector_active : ''}`}
              type="button"
              onClick={changeLang}
              disabled={currentLang === 'ru'}
            >
              ru
            </button>
          </div>
          <DarkMode />
          {isLogIn && (
            <p className={styles.welcome}>
              {locText('welcome', currentLang)}, {username}
            </p>
          )}
        </div>
      </div>
      <nav>
        <ul className={styles.navigation}>
          <li>
            <NavLink className={styles.navigation__logo} to="/" />
          </li>
          <li>
            <NavLink className={styles.navigation__link} to="/">
              {locText('main', currentLang)}
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.navigation__link} to="/doctors">
              {locText('doctors', currentLang)}
            </NavLink>
          </li>
          <li>
            <NavLink className={styles.navigation__link} to="/contacts">
              {locText('contacts', currentLang)}
            </NavLink>
          </li>
          {isLogIn ? (
            <NavProfile />
          ) : (
            <li className={styles.navigation__buttons}>
              <button type="button" className={styles.navigation__btn} onClick={() => handleButton('register')}>
                {locText('register', currentLang)}
              </button>
              <button type="button" className={styles.navigation__btn} onClick={() => handleButton('login')}>
                {locText('login', currentLang)}
              </button>
            </li>
          )}
        </ul>
      </nav>
      {isModalActive && (
        <Modal setActive={setIsModalActive}>
          {currentModal === 'register' ? (
            <RegisterForm setCurrentModal={setCurrentModal} setActive={setIsModalActive} />
          ) : (
            <LoginForm setCurrentModal={setCurrentModal} setActive={setIsModalActive} />
          )}
        </Modal>
      )}
    </header>
  );
}

export default Header;
