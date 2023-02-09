import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { changeCurrentLanguage, getLocalizedText } from '../../../services/localizationService';

function Header() {
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
          <li className={styles.navigation__buttons}>
            <NavLink className={styles.navigation__btn} to="auth/register">
              {getLocalizedText('register')}
            </NavLink>
            <NavLink className={styles.navigation__btn} to="auth/login">
              {getLocalizedText('login')}
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
