import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Modal from '../../modal/Modal';
import LoginForm from '../LoginForm';
import RegisterForm from '../RegisterForm';
import styles from './Header.module.scss';
import { changeCurrentLanguage, getLocalizedText } from '../../../services/localizationService';
import { useAppSelector } from '../../../../hooks';
import { getCurrentUserData, getIsLogin } from '../../../store/users';
import NavProfile from '../NavProfile/NavProfile';
import DarkMode from '../../DarkMode/DarkMode';

function Header() {
  const isLogIn = useAppSelector(getIsLogin());
  const { username } = useAppSelector(getCurrentUserData());
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentModal, setCurrentModal] = useState<'register' | 'login'>('register');
  const handleButton = (btn: 'register' | 'login') => {
    setCurrentModal(btn);
    setIsModalActive(true);
  };

  return (
    <header className={styles.header}>
      <div className={styles.topinfo__wrapper}>
        <div className={styles.topinfo}>
          <p>{getLocalizedText('centerDescription')}</p>
          <p>{getLocalizedText('callCenter')}</p>
          <div className={styles.language}>
            <button className={styles.language__selector} type="button" onClick={changeCurrentLanguage}>
              en
            </button>
            <button className={styles.language__selector} type="button" onClick={changeCurrentLanguage}>
              ru
            </button>
          </div>
          <DarkMode />
          {isLogIn && <p className={styles.welcome}>{getLocalizedText('welcome')}, {username}</p>}
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
          <li>
            <NavLink className={styles.navigation__link} to="/doctors">
              {getLocalizedText('doctors')}
            </NavLink>
          </li>
          {/* <li>{getLocalizedText('services')}</li> */}
          <li>
            <NavLink className={styles.navigation__link} to="/contacts">
              {getLocalizedText('contacts')}
            </NavLink>
          </li>
          {isLogIn ? (
            <NavProfile />
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
