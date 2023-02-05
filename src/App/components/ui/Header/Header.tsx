import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';

function Header() {
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
            <NavLink className={styles.navigation__link} to="/">Main</NavLink>
          </li>
          <li>
            Doctors
          </li>
          <li>
            Services
          </li>
          <li>
            Contacts
          </li>
          <li className={styles.navigation__buttons}>
            <NavLink className={styles.navigation__btn} to="register">Register</NavLink>
            <NavLink className={styles.navigation__btn} to="login">Login</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
