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
        <ul>
          <li>
            <NavLink to="/">Homepage</NavLink>
          </li>
          <li>
            <NavLink to="test">TestPage</NavLink>
          </li>
        </ul>
      </nav>
      {/* <div className="header_btns">
      </div> */}
      <NavLink to="login">Login</NavLink>
      <NavLink to="register">Register</NavLink>
    </header>
  );
}

export default Header;
